// lib/types.ts
// Shared types between client and server.
// Keeping these centralized prevents drift between the API contract
// and the UI's expectations.

/**
 * Shape of a single requirement in the IRCC reference letter checklist.
 */
export interface ChecklistItem {
  requirement: string;
  status: 'have' | 'missing' | 'verify';
  detail: string;
}

/**
 * What Gemma returns inside the "rewrite" field of our API response.
 * This is the JSON shape we instruct the model to produce.
 */
export interface GemmaRewriteResponse {
  rewritten_duties: string[];
  preserved_meaning_check: string[];
  swapped_phrases: Array<{ original: string; rewritten_as: string }>;
  alignment_warning: string;
  region_specific_note: string;
  letter_requirements_checklist: ChecklistItem[];
  letter_outline: string;
}

/**
 * The complete response from POST /api/noc-rewrite.
 */
export interface RewriteApiResponse {
  success: boolean;
  noc: {
    code: string;
    title: string;
    teer: number;
    sourceUrl: string;
  };
  rewrite: GemmaRewriteResponse;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Request body posted to /api/noc-rewrite.
 * Most fields are optional because partial input still produces useful output -
 * the model fills missing values with [BRACKET_PLACEHOLDERS] in the letter outline.
 */
export interface RewriteApiRequest {
  nocCode: string;
  applicantJobTitle?: string;
  applicantRealDuties: string;
  applicantCountry?: string;
  employerName?: string;
  employerLocation?: string;
  startDate?: string;
  endDate?: string;
  hoursPerWeek?: string;
  annualSalary?: string;
  signerNameAndTitle?: string;
}
