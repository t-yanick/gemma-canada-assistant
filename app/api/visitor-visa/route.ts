// app/api/visitor-visa/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { VISITOR_VISA_SYSTEM_PROMPT } from '@/lib/prompts/visitor-visa';
import { callGemma, parseGemmaJson } from '@/lib/gemma-client';
import type {
  GemmaVisitorVisaResponse,
  VisitorVisaApiResponse,
  VisitorVisaRequest,
} from '@/lib/types';

/**
 * Builds the user message with all the per-applicant context the visitor
 * visa analyzer needs. Kept separate from the HTTP handler for clarity.
 */
function buildUserMessage(req: VisitorVisaRequest): string {
  return [
    `PURPOSE_OF_VISIT: ${req.purposeOfVisit}`,
    `PURPOSE_DETAILS: ${req.purposeDetails || 'Not provided'}`,
    `EMPLOYMENT_STATUS: ${req.employmentStatus || 'Not provided'}`,
    `EMPLOYMENT_DETAILS: ${req.employmentDetails || 'Not provided'}`,
    `FAMILY_IN_HOME_COUNTRY: ${req.familyInHomeCountry || 'Not provided'}`,
    `FAMILY_IN_CANADA: ${req.familyInCanada || 'Not provided'}`,
    `PROPERTY_OWNERSHIP: ${req.propertyOwnership || 'Not provided'}`,
    `PREVIOUS_TRAVEL: ${req.previousTravel || 'Not provided'}`,
    `TRIP_DURATION_DAYS: ${req.tripDurationDays || 'Not provided'}`,
    `APPLICANT_COUNTRY: ${req.applicantCountry || 'Cameroon'}`,
    '',
    'Produce the JSON object now.',
  ].join('\n');
}

export async function POST(req: NextRequest) {
  let body: VisitorVisaRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  if (!body.purposeOfVisit) {
    return NextResponse.json(
      { error: 'purposeOfVisit is required' },
      { status: 400 }
    );
  }

  const userMessage = buildUserMessage(body);

  const llmResult = await callGemma({
    systemPrompt: VISITOR_VISA_SYSTEM_PROMPT,
    userMessage,
  });

  if (!llmResult.ok) {
    return NextResponse.json(
      { error: llmResult.error, details: llmResult.details },
      { status: llmResult.status }
    );
  }

  const parsed = parseGemmaJson<GemmaVisitorVisaResponse>(llmResult.content);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: 'Gemma returned non-JSON output', raw_content: parsed.raw },
      { status: 502 }
    );
  }

  const responseBody: VisitorVisaApiResponse = {
    success: true,
    analysis: parsed.value,
    usage: llmResult.usage,
  };

  return NextResponse.json(responseBody);
}
