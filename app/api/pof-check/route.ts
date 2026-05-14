// app/api/pof-check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getRequiredPofCad,
  POF_SOURCE_URL,
  POF_LAST_UPDATED,
} from '@/lib/data/pof-amounts';
import { POF_ANALYZER_SYSTEM_PROMPT } from '@/lib/prompts/pof-analyzer';
import { callGemma, parseGemmaJson } from '@/lib/gemma-client';
import type {
  GemmaPofResponse,
  PofApiResponse,
  PofCheckRequest,
} from '@/lib/types';

/**
 * Builds the user message that gives Gemma all the context it needs for a
 * POF + employment legitimacy assessment.
 *
 * Kept separate from the HTTP handler so the prompt-construction logic can
 * be inspected and reasoned about independently.
 */
function buildUserMessage(req: PofCheckRequest, requiredPofCad: number): string {
  return [
    `FAMILY_SIZE: ${req.familySize}`,
    `REQUIRED_POF_CAD: ${requiredPofCad}`,
    `APPLICANT_FUNDS_CAD: ${req.applicantFundsCad || 'Not provided'}`,
    `FUND_SOURCE: ${req.fundSource || 'Not provided'}`,
    `FUND_INSTITUTION: ${req.fundInstitution || 'Not provided'}`,
    `SIX_MONTH_AVERAGE_KNOWN: ${req.sixMonthAverageKnown || 'Unknown'}`,
    `EMPLOYMENT_TYPE: ${req.employmentType || 'Not provided'}`,
    `SOCIAL_SECURITY_REGISTERED: ${req.socialSecurityRegistered || 'Unknown'}`,
    `APPLICANT_COUNTRY: ${req.applicantCountry || 'Cameroon'}`,
    `APPLYING_UNDER: ${req.applyingUnder || 'Unsure'}`,
    `HAS_VALID_JOB_OFFER: ${req.hasValidJobOffer || 'Unknown'}`,
    '',
    'Produce the JSON object now.',
  ].join('\n');
}

export async function POST(req: NextRequest) {
  // Parse and validate the request body.
  let body: PofCheckRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  if (!body.familySize || !Number.isInteger(body.familySize) || body.familySize < 1) {
    return NextResponse.json(
      { error: 'familySize is required and must be a positive integer' },
      { status: 400 }
    );
  }

  // Compute the IRCC POF requirement for this family size from the verified table.
  let requiredPofCad: number;
  try {
    requiredPofCad = getRequiredPofCad(body.familySize);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: 'Invalid family size', details: String(err) },
      { status: 400 }
    );
  }

  // Call Gemma with the system prompt and assembled context.
  const userMessage = buildUserMessage(body, requiredPofCad);

  const llmResult = await callGemma({
    systemPrompt: POF_ANALYZER_SYSTEM_PROMPT,
    userMessage,
  });

  if (!llmResult.ok) {
    return NextResponse.json(
      { error: llmResult.error, details: llmResult.details },
      { status: llmResult.status }
    );
  }

  // Parse Gemma's JSON output. Defensive in case the model misbehaves.
  const parsed = parseGemmaJson<GemmaPofResponse>(llmResult.content);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: 'Gemma returned non-JSON output', raw_content: parsed.raw },
      { status: 502 }
    );
  }

  const responseBody: PofApiResponse = {
    success: true,
    pof: {
      familySize: body.familySize,
      requiredPofCad,
      sourceUrl: POF_SOURCE_URL,
      lastUpdated: POF_LAST_UPDATED,
    },
    analysis: parsed.value,
    usage: llmResult.usage,
  };

  return NextResponse.json(responseBody);
}
