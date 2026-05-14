// components/ReferenceLetterForm.tsx
// All form fields, grouped into two fieldsets: Your Role and Employer Details.
// The form owns its own field state; submission is delegated to the parent
// via the onSubmit callback. This keeps the form reusable and the parent
// focused on orchestration.

'use client';

import { useState } from 'react';
import type { RewriteApiRequest } from '@/lib/types';

interface Props {
  loading: boolean;
  onSubmit: (data: RewriteApiRequest) => void;
}

export function ReferenceLetterForm({ loading, onSubmit }: Props) {
  const [nocCode, setNocCode] = useState('41220');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('Cameroon');
  const [duties, setDuties] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerLocation, setEmployerLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [annualSalary, setAnnualSalary] = useState('');
  const [signerNameAndTitle, setSignerNameAndTitle] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      nocCode,
      applicantJobTitle: jobTitle,
      applicantCountry: country,
      applicantRealDuties: duties,
      employerName,
      employerLocation,
      startDate,
      endDate,
      hoursPerWeek,
      annualSalary,
      signerNameAndTitle,
    });
  }

  const inputClass =
    'mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 space-y-6"
    >
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Your role
        </legend>

        <div>
          <label htmlFor="noc" className="block text-sm font-medium text-slate-800">
            NOC 2021 code
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Currently supported: 41220 (Secondary school teachers), 31301
            (Registered nurses), 21232 (Software developers).
          </p>
          <select
            id="noc"
            value={nocCode}
            onChange={(e) => setNocCode(e.target.value)}
            className={inputClass + ' bg-white'}
          >
            <option value="41220">41220 - Secondary school teachers</option>
            <option value="31301">31301 - Registered nurses and psychiatric nurses</option>
            <option value="21232">21232 - Software developers and programmers</option>
          </select>
        </div>

        <div>
          <label htmlFor="job-title" className="block text-sm font-medium text-slate-800">
            Your actual job title
          </label>
          <input
            id="job-title"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. Mathematics Teacher"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-800">
            Country of origin
          </label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="duties" className="block text-sm font-medium text-slate-800">
            Describe your real day-to-day duties
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Three to five sentences in your own words.
          </p>
          <textarea
            id="duties"
            value={duties}
            onChange={(e) => setDuties(e.target.value)}
            rows={5}
            className={inputClass + ' resize-y'}
            placeholder="Example: I teach mathematics and physics to students in lower sixth and upper sixth at a government high school..."
          />
        </div>
      </fieldset>

      <fieldset className="space-y-5 pt-4 border-t border-slate-200">
        <legend className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Employer details
        </legend>
        <p className="text-xs text-slate-500">
          These personalize your reference letter checklist and outline.
        </p>

        <div>
          <label htmlFor="employer" className="block text-sm font-medium text-slate-800">
            Employer name
          </label>
          <input
            id="employer"
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            className={inputClass}
            placeholder="e.g. Government Bilingual High School Yaounde"
          />
        </div>

        <div>
          <label htmlFor="employer-loc" className="block text-sm font-medium text-slate-800">
            Employer city and country
          </label>
          <input
            id="employer-loc"
            type="text"
            value={employerLocation}
            onChange={(e) => setEmployerLocation(e.target.value)}
            className={inputClass}
            placeholder="e.g. Yaounde, Cameroon"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start" className="block text-sm font-medium text-slate-800">
              Start date
            </label>
            <input
              id="start"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
              placeholder="e.g. September 2018"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-sm font-medium text-slate-800">
              End date
            </label>
            <input
              id="end"
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClass}
              placeholder="e.g. Present"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-slate-800">
              Hours per week
            </label>
            <p className="text-xs text-slate-500 mt-1">IRCC counts 30+ as full-time.</p>
            <input
              id="hours"
              type="text"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className={inputClass}
              placeholder="e.g. 40"
            />
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-slate-800">
              Annual salary
            </label>
            <p className="text-xs text-slate-500 mt-1">Include currency.</p>
            <input
              id="salary"
              type="text"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              className={inputClass}
              placeholder="e.g. 3,600,000 XAF"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signer" className="block text-sm font-medium text-slate-800">
            Authorized signer (name and title)
          </label>
          <p className="text-xs text-slate-500 mt-1">
            Who will sign the letter on behalf of the employer.
          </p>
          <input
            id="signer"
            type="text"
            value={signerNameAndTitle}
            onChange={(e) => setSignerNameAndTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. Mr. Tabi Mukete, Principal"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating reference letter... (15-40 seconds)
          </>
        ) : (
          'Generate my reference letter'
        )}
      </button>
    </form>
  );
}
