// components/VisitorVisaForm.tsx
// Form for the visitor visa home ties analyzer.

'use client';

import { useState } from 'react';
import type { VisitorVisaRequest } from '@/lib/types';

interface Props {
  loading: boolean;
  onSubmit: (data: VisitorVisaRequest) => void;
}

const INPUT = 'mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent';
const SELECT = INPUT + ' bg-white';

export function VisitorVisaForm({ loading, onSubmit }: Props) {
  const [purposeOfVisit, setPurposeOfVisit] = useState<VisitorVisaRequest['purposeOfVisit']>('family');
  const [purposeDetails, setPurposeDetails] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState<VisitorVisaRequest['employmentStatus']>('employed');
  const [employmentDetails, setEmploymentDetails] = useState('');
  const [familyInHomeCountry, setFamilyInHomeCountry] = useState('');
  const [familyInCanada, setFamilyInCanada] = useState('');
  const [propertyOwnership, setPropertyOwnership] = useState<VisitorVisaRequest['propertyOwnership']>('rents');
  const [previousTravel, setPreviousTravel] = useState('');
  const [tripDurationDays, setTripDurationDays] = useState('');
  const [applicantCountry, setApplicantCountry] = useState('Cameroon');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      purposeOfVisit,
      purposeDetails,
      employmentStatus,
      employmentDetails,
      familyInHomeCountry,
      familyInCanada,
      propertyOwnership,
      previousTravel,
      tripDurationDays,
      applicantCountry,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 space-y-6">
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">The trip</legend>
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-slate-800">Purpose of visit</label>
          <select id="purpose" value={purposeOfVisit} onChange={(e) => setPurposeOfVisit(e.target.value as VisitorVisaRequest['purposeOfVisit'])} className={SELECT}>
            <option value="family">Family visit</option>
            <option value="business">Business / conference</option>
            <option value="tourism">Tourism</option>
            <option value="artist tour">Artist / music tour</option>
            <option value="religious">Religious / pilgrimage</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="purpose-details" className="block text-sm font-medium text-slate-800">Details of the visit</label>
          <p className="text-xs text-slate-500 mt-1">Briefly: what you will do, who you will see.</p>
          <textarea id="purpose-details" value={purposeDetails} onChange={(e) => setPurposeDetails(e.target.value)} rows={3} className={INPUT + ' resize-y'} placeholder="e.g. Attending my sister's graduation ceremony in Toronto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-800">Trip duration (days)</label>
            <input id="duration" type="number" min={1} value={tripDurationDays} onChange={(e) => setTripDurationDays(e.target.value)} className={INPUT} placeholder="e.g. 21" />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-800">Country of origin</label>
            <input id="country" type="text" value={applicantCountry} onChange={(e) => setApplicantCountry(e.target.value)} className={INPUT} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5 pt-4 border-t border-slate-200">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Your ties at home</legend>
        <div>
          <label htmlFor="emp-status" className="block text-sm font-medium text-slate-800">Employment status</label>
          <select id="emp-status" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value as VisitorVisaRequest['employmentStatus'])} className={SELECT}>
            <option value="employed">Employed</option>
            <option value="business owner">Business owner</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
            <option value="unemployed">Unemployed</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
        <div>
          <label htmlFor="emp-details" className="block text-sm font-medium text-slate-800">Employment details</label>
          <input id="emp-details" type="text" value={employmentDetails} onChange={(e) => setEmploymentDetails(e.target.value)} className={INPUT} placeholder="e.g. Government teacher, 8 years" />
        </div>
        <div>
          <label htmlFor="prop" className="block text-sm font-medium text-slate-800">Property ownership</label>
          <select id="prop" value={propertyOwnership} onChange={(e) => setPropertyOwnership(e.target.value as VisitorVisaRequest['propertyOwnership'])} className={SELECT}>
            <option value="owns home">Owns a home</option>
            <option value="owns land">Owns land</option>
            <option value="rents">Rents</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label htmlFor="fam-home" className="block text-sm font-medium text-slate-800">Family staying in your home country</label>
          <p className="text-xs text-slate-500 mt-1">Spouse, children, dependent parents who remain while you travel.</p>
          <input id="fam-home" type="text" value={familyInHomeCountry} onChange={(e) => setFamilyInHomeCountry(e.target.value)} className={INPUT} placeholder="e.g. Spouse and three children remain in Yaounde" />
        </div>
        <div>
          <label htmlFor="fam-canada" className="block text-sm font-medium text-slate-800">Family or host in Canada</label>
          <p className="text-xs text-slate-500 mt-1">Who you are visiting and their immigration status.</p>
          <input id="fam-canada" type="text" value={familyInCanada} onChange={(e) => setFamilyInCanada(e.target.value)} className={INPUT} placeholder="e.g. My sister, a permanent resident" />
        </div>
        <div>
          <label htmlFor="travel" className="block text-sm font-medium text-slate-800">Previous international travel</label>
          <p className="text-xs text-slate-500 mt-1">Prior visas and whether you returned on time. Strong positive signal.</p>
          <input id="travel" type="text" value={previousTravel} onChange={(e) => setPreviousTravel(e.target.value)} className={INPUT} placeholder="e.g. Schengen visa 2023, returned on time" />
        </div>
      </fieldset>

      <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing your home ties... (15-40 seconds)
          </>
        ) : (
          'Analyze my home ties'
        )}
      </button>
    </form>
  );
}
