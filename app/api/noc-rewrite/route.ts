// app/api/noc-rewrite/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getNocByCode } from '@/lib/noc-data';
import { NOC_REWRITER_SYSTEM_PROMPT } from '@/lib/prompts/noc-rewriter';
import { callGemma, parseGemmaJson } from '@/lib/gemma-client';
import type {
  GemmaRewriteResponse,
  RewriteApiRequest,
  RewriteApiResponse,
} from '@/lib/types';

/**
 * Builds the user message that contains all the per-applicant context
 * Gemma needs to produce a personalized rewrite + reference letter checklist.
 *
 * Kept separate from the API handler so the prompt-building logic is
 * easy to test and inspect independently of HTTP plumbing.
 */
function buildUserMessage(
  req: RewriteApiRequest,
  officialDuties: string[],
  nocCode: string,
  nocTitle: string
): string {
  const dutiesBlock = officialDuties
    .map((d, i) => `${i + 1}. ${d}`)
    .join('\n');

  return [
    `OFFICIAL_NOC_DUTIES:\n${dutiesBlock}`,
    '',
    `NOC_CODE: ${nocCode}`,
    `NOC_TITLE: ${nocTitle}`,
    `APPLICANT_COUNTRY: ${req.applicantCountry || 'Cameroon'}`,
    `APPLICANT_JOB_TITLE: ${req.applicantJobTitle || 'Not provided'}`,
    `APPLICANT_REAL_DUTIES: ${req.applicantRealDuties}`,
    `EMPLOYER_NAME: ${req.employerName || 'Not provided'}`,
    `EMPLOYER_LOCATION: ${req.employerLocation || 'Not provided'}`,
    `START_DATE: ${req.startDate || 'Not provided'}`,
    `END_DATE: ${req.endDate || 'Not provided (assume present)'}`,
    `HOURS_PER_WEEK: ${req.hoursPerWeek || 'Not provided'}`,
    `ANNUAL_SALARY: ${req.annualSalary || 'Not provided'}`,
    `SIGNER_NAME_AND_TITLE: ${req.signerNameAndTitle || 'Not provided'}`,
    '',
    'Produce the JSON object now.',
  ].join('\n');
}

export async function POST(req: NextRequest) {
  // Parse and validate the request body.
  let body: RewriteApiRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  if (!body.nocCode || !body.applicantRealDuties) {
    return NextResponse.json(
      { error: 'nocCode and applicantRealDuties are required' },
      { status: 400 }
    );
  }

  // Look up the official NOC duties from our verified catalog.
  const nocEntry = getNocByCode(body.nocCode);
  if (!nocEntry) {
    return NextResponse.json(
      {
        error: 'NOC code not found in catalog',
        message: `NOC ${body.nocCode} is not yet supported.`,
      },
      { status: 404 }
    );
  }

  if (!nocEntry.expressEntryEligible) {
    return NextResponse.json(
      {
        error: 'NOC code not eligible for Express Entry',
        message: `NOC ${nocEntry.code} is TEER ${nocEntry.teer}. Express Entry requires TEER 0-3.`,
      },
      { status: 400 }
    );
  }

  // Call Gemma with the system prompt and assembled user message.
  const userMessage = buildUserMessage(
    body,
    nocEntry.mainDuties,
    nocEntry.code,
    nocEntry.title
  );

  const llmResult = await callGemma({
    systemPrompt: NOC_REWRITER_SYSTEM_PROMPT,
    userMessage,
  });

  if (!llmResult.ok) {
    return NextResponse.json(
      { error: llmResult.error, details: llmResult.details },
      { status: llmResult.status }
    );
  }

  // Parse Gemma's JSON output. Defensive: fall back if the model misbehaves.
  const parsed = parseGemmaJson<GemmaRewriteResponse>(llmResult.content);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: 'Gemma returned non-JSON output', raw_content: parsed.raw },
      { status: 502 }
    );
  }

  const responseBody: RewriteApiResponse = {
    success: true,
    noc: {
      code: nocEntry.code,
      title: nocEntry.title,
      teer: nocEntry.teer,
      sourceUrl: nocEntry.sourceUrl,
    },
    rewrite: parsed.value,
    usage: llmResult.usage,
  };

  return NextResponse.json(responseBody);
}
