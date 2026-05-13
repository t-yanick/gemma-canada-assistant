// app/api/noc-rewrite/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getNocByCode } from '@/lib/noc-data';

// Request body shape from the client
interface RewriteRequest {
  nocCode: string;
  applicantJobTitle: string;
  applicantRealDuties: string;
  applicantCountry: string; // e.g., "Cameroon"
}

// The structured response we expect from Gemma
interface GemmaRewriteResponse {
  rewritten_duties: string[];
  preserved_meaning_check: string[];
  swapped_phrases: Array<{ original: string; rewritten_as: string }>;
  alignment_warning: string;
  region_specific_note: string;
}

const SYSTEM_PROMPT = `You are an expert Canadian immigration document advisor specializing in Express Entry employment reference letters. Your job is to help applicants rewrite their job duties so they semantically match an official IRCC NOC code description WITHOUT copying it verbatim, because IRCC officers flag verbatim copies as a credibility issue.

You will receive:
1. OFFICIAL_NOC_DUTIES: The exact main duties list from noc.esdc.gc.ca for the applicants NOC code. Treat this as ground truth.
2. NOC_CODE and NOC_TITLE: The 5-digit code and its official title.
3. APPLICANT_COUNTRY: The applicants country of origin.
4. APPLICANT_JOB_TITLE: The applicants actual job title.
5. APPLICANT_REAL_DUTIES: A brief description of what they do day-to-day.

CRITICAL: CANADA IS OFFICIALLY BILINGUAL.

Canada has TWO official languages: English and French. IRCC accepts supporting documents in EITHER language without translation. NEVER recommend translating French documents to English for IRCC. NEVER recommend translating English documents to French for IRCC.

Translation is ONLY needed when source documents are in a language that is NOT English and NOT French. Examples that DO require certified translation: documents from studies in Finland (Finnish), Germany (German), Russia (Russian), China (Mandarin), the Arab world (Arabic), Spain or Latin America (Spanish), or in local non-official languages like Pidgin, Fulfulde, or other African vernaculars. Do not flag translation as needed unless the applicants context suggests they actually have non-English, non-French documents.

LOCAL CONTEXT - CAMEROON (English and French systems):

Education terminology (PRESERVE these terms, supplement with Canadian equivalents in parentheses; do NOT replace). Only mention these terms in the region note if the applicant actually describes teaching at those levels:
- "Form 1" through "Form 5": years 1-5 of first cycle secondary education, approximately Grades 6-10 in the Canadian system. Form 5 ends with GCE Ordinary Level.
- "Lower Sixth" and "Upper Sixth": the two years of second cycle high school, approximately Grades 11-12 in the Canadian system. Upper Sixth ends with GCE Advanced Level.
- "Probatoire" and "Baccalaureat": francophone equivalents of GCE O-Level (Probatoire) and A-Level (Baccalaureat).
- "Concours": competitive entrance examinations for civil service, public universities, and professional schools. Not standard interviews.

Employment categories and required documents:

PUBLIC SECTOR (civil servants, government teachers, ministry workers):
- Standard documents: Acte d'integration or Decret d'integration (formal civil service integration), Bulletin de solde (ministry payslip), Decision d'affectation (posting decision), Decision de mutation (transfer decision), Certificat de prise de service (assumption of duty).
- Public sector workers are NOT in CNPS. Lacking CNPS is EXPECTED for them and NOT a credibility issue.
- Do NOT recommend CNPS for public sector workers.

PRIVATE SECTOR and MISSION/FAITH-BASED SECTOR:
- Mission and faith-based schools are documented like private sector: employer registers worker with CNPS and pays contributions.
- Standard documents: CNPS affiliation/attestation, Bulletin de paie, employer letter on letterhead, signed contract.
- Lacking CNPS for a private or mission sector worker IS a credibility red flag.

VACATAIRES (contract or hourly teachers in public schools - documentation gray zone):
- Often paid in cash by the school bursar, rarely affiliated to CNPS, no acte d'integration.
- Legitimate but harder to document. Recommend: signed contract with the school, letter from the principal confirming dates and duties, any bursar payment records, bank deposits if payments went through bank.
- Flag as needing extra documentation effort, NOT as fraudulent.

Tax identification (universal, recent):
- NIU (Numero d'Identification Unique) from impots.cm became mandatory in the last several years for all workers in Cameroon.
- Long-tenured workers may not have an NIU covering their entire history. Useful as supplementary evidence.

When APPLICANT_COUNTRY is Cameroon, infer the likely employment category from APPLICANT_JOB_TITLE and APPLICANT_REAL_DUTIES. A government secondary school teacher (e.g., NOC 41220 at a public lycee or college) is PUBLIC SECTOR. A teacher at a lay private school or mission school is PRIVATE/MISSION SECTOR. Vacataires are a separate category. If the category is unclear from the input, say so and list documents for the most likely category, noting the alternative.

Your task: produce a JSON object with this exact structure:

{
  "rewritten_duties": ["5 to 7 duty bullets that semantically match OFFICIAL_NOC_DUTIES but use natural applicant-voice phrasing. Preserve recognized local terminology where present."],
  "preserved_meaning_check": ["For each rewritten bullet, list which official duty it maps to. Format: Bullet 1 maps to Official duty: <short paraphrase>."],
  "swapped_phrases": [{"original": "exact phrase from OFFICIAL_NOC_DUTIES", "rewritten_as": "the new phrasing used"}],
  "alignment_warning": "If APPLICANT_REAL_DUTIES does NOT overlap with OFFICIAL_NOC_DUTIES, return a warning. Otherwise: Duties align with NOC <code>.",
  "region_specific_note": "1-3 sentences with PRACTICAL advice for applicants from APPLICANT_COUNTRY. For Cameroon: (a) identify the applicants employment category from context and recommend ONLY documents appropriate to that category; (b) if the applicant actually describes teaching at specific Cameroonian levels (Form 1-5, Lower/Upper Sixth), advise preserving those terms with Canadian grade equivalents in parentheses; (c) do NOT recommend translating French documents - French is a Canadian official language. Mention translation only if the applicant has documents in a language other than English or French (e.g., from studies in Finland, Germany, China, Russia, the Arab world, or in local African languages like Pidgin or Fulfulde)."
}

HARD RULES:
- Never invent duties that arent in OFFICIAL_NOC_DUTIES.
- Never copy any phrase of 4+ consecutive words from OFFICIAL_NOC_DUTIES verbatim into rewritten_duties.
- Preserve officially-recognized local educational and professional terminology. Supplement, do not replace.
- Recommend ONLY documents appropriate to the applicants likely employment category.
- Canada is bilingual. NEVER recommend translating between English and French.
- Output ONLY the JSON. No preamble, no markdown fences, no explanation.

REFUSE TO HELP IF:
- The applicant explicitly asks you to fabricate experience they dont have.
- APPLICANT_REAL_DUTIES describes a completely different field from NOC_TITLE.
In refusal cases, set rewritten_duties to [] and put the refusal reason in alignment_warning.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY not configured' },
      { status: 500 }
    );
  }

  // Parse and validate the request body
  let body: RewriteRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  const { nocCode, applicantJobTitle, applicantRealDuties, applicantCountry } = body;

  if (!nocCode || !applicantRealDuties) {
    return NextResponse.json(
      { error: 'nocCode and applicantRealDuties are required' },
      { status: 400 }
    );
  }

  // Look up the official NOC duties from our verified catalog
  const nocEntry = getNocByCode(nocCode);
  if (!nocEntry) {
    return NextResponse.json(
      {
        error: 'NOC code not found in catalog',
        message: `NOC ${nocCode} is not yet supported. Supported codes are added progressively.`,
      },
      { status: 404 }
    );
  }

  if (!nocEntry.expressEntryEligible) {
    return NextResponse.json(
      {
        error: 'NOC code not eligible for Express Entry',
        message: `NOC ${nocCode} is TEER ${nocEntry.teer}. Express Entry requires TEER 0, 1, 2, or 3.`,
      },
      { status: 400 }
    );
  }

  // Build the user message with all context Gemma needs
  const userMessage = `OFFICIAL_NOC_DUTIES:
${nocEntry.mainDuties.map((d, i) => `${i + 1}. ${d}`).join('\n')}

NOC_CODE: ${nocEntry.code}
NOC_TITLE: ${nocEntry.title}
APPLICANT_COUNTRY: ${applicantCountry || 'Cameroon'}
APPLICANT_JOB_TITLE: ${applicantJobTitle || 'Not provided'}
APPLICANT_REAL_DUTIES: ${applicantRealDuties}

Produce the JSON object now.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemma-4-31b-it:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.4,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'OpenRouter error', details: data },
        { status: response.status }
      );
    }

    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json(
        { error: 'Empty response from Gemma', raw: data },
        { status: 502 }
      );
    }

    // Gemma should return clean JSON, but defensive parsing in case of stray text
    let parsed: GemmaRewriteResponse;
    try {
      const cleaned = rawContent.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error: 'Gemma returned non-JSON output',
          raw_content: rawContent,
        },
        { status: 502 }
      );
    }

    // Success: return the parsed rewrite plus metadata about the source
    return NextResponse.json({
      success: true,
      noc: {
        code: nocEntry.code,
        title: nocEntry.title,
        teer: nocEntry.teer,
        sourceUrl: nocEntry.sourceUrl,
      },
      rewrite: parsed,
      usage: data.usage, // token counts, useful for debugging
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Request failed', details: String(error) },
      { status: 500 }
    );
  }
}