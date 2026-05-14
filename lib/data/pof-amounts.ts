// lib/data/pof-amounts.ts
// IRCC Express Entry proof of funds (POF) table.
// Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/proof-funds.html
// Last verified: 2026-05-14
// IRCC updates this annually based on 50% of LICO (Low Income Cut-Off).
// Current table effective: July 7, 2025.

/**
 * Minimum settlement funds required (in CAD) by family size for FSWP and FSTP.
 * For family sizes greater than 7, add ADDITIONAL_PER_PERSON for each extra member.
 */
export const POF_AMOUNTS_CAD: Record<number, number> = {
  1: 15263,
  2: 19001,
  3: 23360,
  4: 28362,
  5: 32168,
  6: 36280,
  7: 40392,
};

export const ADDITIONAL_PER_PERSON_CAD = 4112;

export const POF_SOURCE_URL =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/proof-funds.html';

export const POF_LAST_UPDATED = 'July 7, 2025';

/**
 * Compute the required POF amount in CAD for any family size (1+).
 * Returns the IRCC minimum the applicant must demonstrate.
 */
export function getRequiredPofCad(familySize: number): number {
  if (familySize < 1 || !Number.isFinite(familySize)) {
    throw new Error('Family size must be a positive integer');
  }
  if (familySize <= 7) {
    return POF_AMOUNTS_CAD[familySize];
  }
  return POF_AMOUNTS_CAD[7] + (familySize - 7) * ADDITIONAL_PER_PERSON_CAD;
}

/**
 * IRCC-published exemption rules: who does NOT need to show POF.
 * Used by the analyzer to surface this to the user up front.
 */
export const POF_EXEMPTION_RULES = [
  'Canadian Experience Class (CEC) applicants are exempt from proof of funds',
  'Applicants with a valid job offer AND authorization to work in Canada are exempt (even under FSWP/FSTP)',
];

/**
 * Core IRCC requirements for the funds themselves. The analyzer references
 * these when flagging issues with the applicant's fund source.
 */
export const POF_CORE_RULES = [
  'Funds must be readily available both at application and when the PR visa is issued',
  'Funds cannot be borrowed (loans, lines of credit, etc.)',
  'Equity on real property does NOT count as proof of funds',
  'Bank letter must show 6-month average balance, not just current balance',
  'Bank letter must list outstanding debts (credit cards, loans)',
  'Funds must be in commercial bank accounts (not microfinance, mobile money, or informal arrangements)',
];
