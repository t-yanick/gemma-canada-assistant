// components/ProofOfFundsForm.tsx
// Form for the Proof of Funds analyzer. Three fieldsets to keep scanning manageable:
// Your situation, Your funds, Your employment.
//
// All select fields use union literal values that match the API's expected
// shape - the TypeScript type system enforces the contract from form to API.

'use client';

import { useState } from 'react';
import type { PofCheckRequest } from '@/lib/types';

interface Props {
  loading: boolean;
  onSubmit: (data: PofCheckRequest) => void;
}

const INPUT_CLASS =
  'mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent';

const SELECT_CLASS = INPUT_CLASS + ' bg-white';

export function ProofOfFundsForm({ loading, onSubmit }: Props) {
  const [familySize, setFamilySize] = useState('4');
  const [applyingUnder, setApplyingUnder] = useState<PofCheckRequest['applyingUnder']>('FSWP');
  const [hasValidJobOffer, setHasValidJobOffer] = useState<PofCheckRequest['hasValidJobOffer']>('No');
  const [applicantFundsCad, setApplicantFundsCad] = useState('');
  const [fundSource, setFundSource] = useState('');
  const [fundInstitution, setFundInstitution] = useState('');
  const [sixMonthAverageKnown, setSixMonthAverageKnown] = useState<PofCheckRequest['sixMonthAverageKnown']>('Unknown');
  const [employmentType, setEmploymentType] = useState('');
  const [socialSecurityRegistered, setSocialSecurityRegistered] = useState<PofCheckRequest['socialSecurityRegistered']>('Unknown');
  const [applicantCountry, setApplicantCountry] = useState('Cameroon');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedSize = parseInt(familySize, 10);
    if (!Number.isFinite(parsedSize) || parsedSize < 1) {
      return;
    }
    onSubmit({
      familySize: parsedSize,
      applyingUnder,
      hasValidJobOffer,
      applicantFundsCad,
      fundSource,
      fundInstitution,
      sixMonthAverageKnown,
      employmentType,
      socialSecurityRegistered,
      applicantCountry,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 space-y-6">
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Your situation
        </legend>
        <p className="text-xs text-slate-500">
          IRCC exempts CEC applicants and those with a valid Canadian job offer from showing proof of funds. We surface that up front if you qualify.
        </p>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-800">
            Country of origin
          </label>
          <input id="country" type="text" value={applicantCountry} onChange={(e) => setApplicantCountry(e.target.value)} className={INPUT_CLASS} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="family-size" className="block text-sm font-medium text-slate-800">
              Family size
            </label>
            <p className="text-xs text-slate-500 mt-1">
              Include yourself, spouse, and dependent children even if not coming with you.
            </p>
            <input id="family-size" type="number" min={1} value={familySize} onChange={(e) => setFamilySize(e.target.value)} className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="applying-under" className="block text-sm font-medium text-slate-800">
              Applying under
            </label>
            <p className="text-xs text-slate-500 mt-1">CEC applicants are exempt from POF.</p>
            <select id="applying-under" value={applyingUnder} onChange={(e) => setApplyingUnder(e.target.value as PofCheckRequest['applyingUnder'])} className={SELECT_CLASS}>
              <option value="FSWP">FSWP - Federal Skilled Worker</option>
              <option value="FSTP">FSTP - Federal Skilled Trades</option>
              <option value="CEC">CEC - Canadian Experience Class</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="job-offer" className="block text-sm font-medium text-slate-800">
            Do you have a valid Canadian job offer with work authorization?
          </label>
          <p className="text-xs text-slate-500 mt-1">If yes, you may also be exempt from POF.</p>
          <select id="job-offer" value={hasValidJobOffer} onChange={(e) => setHasValidJobOffer(e.target.value as PofCheckRequest['hasValidJobOffer'])} className={SELECT_CLASS}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Unknown">Not sure</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-5 pt-4 border-t border-slate-200">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Your funds
        </legend>

        <div>
          <label htmlFor="funds-cad" className="block text-sm font-medium text-slate-800">
            Available funds (in CAD)
          </label>
          <p className="text-xs text-slate-500 mt-1">Convert from local currency. Approximate is fine.</p>
          <input id="funds-cad" type="text" value={applicantFundsCad} onChange={(e) => setApplicantFundsCad(e.target.value)} className={INPUT_CLASS} placeholder="e.g. 30000" />
        </div>

        <div>
          <label htmlFor="fund-source" className="block text-sm font-medium text-slate-800">
            Where did the funds come from?
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Examples: salary savings, business income, gift from family member, property sale, inheritance.
          </p>
          <input id="fund-source" type="text" value={fundSource} onChange={(e) => setFundSource(e.target.value)} className={INPUT_CLASS} placeholder="e.g. Salary savings over 5 years" />
        </div>

        <div>
          <label htmlFor="fund-institution" className="block text-sm font-medium text-slate-800">
            Where are the funds held?
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Name the institution and its type (commercial bank, microfinance, mobile money).
          </p>
          <input id="fund-institution" type="text" value={fundInstitution} onChange={(e) => setFundInstitution(e.target.value)} className={INPUT_CLASS} placeholder="e.g. Afriland First Bank - commercial bank" />
        </div>

        <div>
          <label htmlFor="six-month-avg" className="block text-sm font-medium text-slate-800">
            Do you know your 6-month average balance?
          </label>
          <p className="text-xs text-slate-500 mt-1">IRCC requires the bank letter to state this, not just current balance.</p>
          <select id="six-month-avg" value={sixMonthAverageKnown} onChange={(e) => setSixMonthAverageKnown(e.target.value as PofCheckRequest['sixMonthAverageKnown'])} className={SELECT_CLASS}>
            <option value="Yes">Yes, the average meets the requirement</option>
            <option value="No">No, or recent deposit makes it lower</option>
            <option value="Unknown">Not sure</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-5 pt-4 border-t border-slate-200">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Your employment
        </legend>

        <div>
          <label htmlFor="employment-type" className="block text-sm font-medium text-slate-800">
            How are you paid?
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Examples: salaried with payslips, cash payment, self-employed, mixed.
          </p>
          <input id="employment-type" type="text" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={INPUT_CLASS} placeholder="e.g. Salaried with bulletin de solde" />
        </div>

        <div>
          <label htmlFor="social-security" className="block text-sm font-medium text-slate-800">
            Social security / public sector registration
          </label>
          <p className="text-xs text-slate-500 mt-1">
            CNPS for Cameroon private sector. Public sector workers are not in CNPS - use the third option.
          </p>
          <select id="social-security" value={socialSecurityRegistered} onChange={(e) => setSocialSecurityRegistered(e.target.value as PofCheckRequest['socialSecurityRegistered'])} className={SELECT_CLASS}>
            <option value="Yes">Yes, registered (CNPS for private/mission sector)</option>
            <option value="No">No, not registered</option>
            <option value="Public sector - acte d integration instead">Public sector - acte d integration instead</option>
            <option value="Unknown">Not sure</option>
          </select>
        </div>
      </fieldset>

      <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing your funds... (15-40 seconds)
          </>
        ) : (
          'Check my proof of funds'
        )}
      </button>
    </form>
  );
}
