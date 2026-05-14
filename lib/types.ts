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

/**
 * Request body posted to /api/pof-check.
 * Most fields are optional - the analyzer adapts to whatever is provided.
 */
export interface PofCheckRequest {
  familySize: number;
  applicantFundsCad?: string;
  fundSource?: string;
  fundInstitution?: string;
  sixMonthAverageKnown?: 'Yes' | 'No' | 'Unknown';
  employmentType?: string;
  socialSecurityRegistered?:
    | 'Yes'
    | 'No'
    | 'Unknown'
    | 'Public sector - acte d integration instead';
  applicantCountry?: string;
  applyingUnder?: 'FSWP' | 'FSTP' | 'CEC' | 'Unsure';
  hasValidJobOffer?: 'Yes' | 'No' | 'Unknown';
}

/**
 * The structured JSON we instruct the POF analyzer model to return.
 */
export interface GemmaPofResponse {
  exemption_status: 'exempt' | 'not_exempt' | 'unclear';
  exemption_explanation: string;
  pof_status: 'sufficient' | 'insufficient' | 'borderline' | 'cannot_determine';
  pof_amount_check: string;
  fund_source_flags: string[];
  employment_legitimacy_flags: string[];
  required_documents: string[];
  recommended_next_steps: string[];
  regional_context_note: string;
}

/**
 * Full response from POST /api/pof-check.
 */
export interface PofApiResponse {
  success: boolean;
  pof: {
    familySize: number;
    requiredPofCad: number;
    sourceUrl: string;
    lastUpdated: string;
  };
  analysis: GemmaPofResponse;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
