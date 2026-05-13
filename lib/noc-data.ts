// lib/noc-data.ts
// Official IRCC NOC 2021 duty data, sourced from noc.esdc.gc.ca
// Each entry is the verbatim "main duties" section from the official page.
// Updated: 2026-05-13

export interface NocEntry {
  code: string;          // 5-digit NOC 2021 code
  title: string;         // Official NOC title
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  description: string;   // 1-2 sentence official description
  mainDuties: string[];  // Verbatim duty bullets from IRCC
  sourceUrl: string;     // Canonical IRCC source for verification
  expressEntryEligible: boolean; // TEER 0/1/2/3 = true
}

export const NOC_CATALOG: Record<string, NocEntry> = {
  "41220": {
    code: "41220",
    title: "Secondary school teachers",
    teer: 1,
    description:
      "Secondary school teachers prepare and teach academic, technical, vocational or specialized subjects at public and private secondary schools. Secondary school teachers who are heads of departments are included in this unit group.",
    mainDuties: [
      "Teach students using a systematic plan of lectures, discussions, audio-visual presentations, and laboratory, shop and field studies",
      "Prepare subject material for presentation to students according to an approved curriculum",
      "Assign and correct homework",
      "Prepare, administer and correct tests",
      "Evaluate progress, determine individual needs of students and discuss results with parents and school officials",
      "Prepare and implement remedial programs for students requiring extra help",
      "Participate in staff meetings, educational conferences and teacher training workshops",
      "May teach and evaluate students through distance or online courses",
      "May advise students on course selection and on vocational and personal matters",
      "May supervise student teachers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=41220&version=2021.0",
    expressEntryEligible: true,
  },
  // TODO: Add the other 11 codes here as we pull each from noc.esdc.gc.ca
  // 41221 (elementary teachers), 31301 (RNs), 31102 (family physicians),
  // 32101 (LPNs), 21231 (software engineers), 21232 (software developers),
  // 21234 (web developers), 21300 (civil engineers), 21310 (electrical engineers),
  // 11100 (accountants), 12101 (HR officers)
};

// Helper: get a NOC entry by code, returns null if not found
export function getNocByCode(code: string): NocEntry | null {
  return NOC_CATALOG[code] ?? null;
}

// Helper: list all available NOC codes (for UI dropdowns)
export function listAvailableNocCodes(): Array<{
  code: string;
  title: string;
  teer: number;
}> {
  return Object.values(NOC_CATALOG).map(({ code, title, teer }) => ({
    code,
    title,
    teer,
  }));
}