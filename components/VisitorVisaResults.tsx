// components/VisitorVisaResults.tsx
// Composes the visitor visa analysis result. Reuses FlagsList and
// DocumentsList from the POF feature.

import type { VisitorVisaApiResponse } from '@/lib/types';
import { TiesInventory } from './TiesInventory';
import { FlagsList } from './FlagsList';
import { DocumentsList } from './DocumentsList';

interface Props {
  result: VisitorVisaApiResponse;
  country: string;
}

function strengthStyles(strength: string): { label: string; classes: string } {
  if (strength === 'strong') {
    return { label: 'Strong', classes: 'bg-green-100 text-green-800 border-green-200' };
  }
  if (strength === 'moderate') {
    return { label: 'Moderate', classes: 'bg-amber-100 text-amber-800 border-amber-200' };
  }
  return { label: 'Weak', classes: 'bg-orange-100 text-orange-800 border-orange-200' };
}

export function VisitorVisaResults({ result, country }: Props) {
  const { analysis } = result;
  const { label, classes } = strengthStyles(analysis.home_ties_strength);

  return (
    <section id="vv-results" className="mt-8 space-y-5">
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
          <h3 className="text-base font-semibold text-slate-900">Home ties assessment</h3>
          <span className={'inline-block text-xs font-medium px-2.5 py-1 rounded-full border ' + classes}>
            {label}
          </span>
        </div>
        <p className="text-sm text-slate-800">{analysis.strength_explanation}</p>
      </div>

      <TiesInventory ties={analysis.ties_inventory} />

      <FlagsList title="Purpose and credibility concerns" flags={analysis.purpose_credibility_flags} />

      <DocumentsList documents={analysis.recommended_documents} />

      <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm">
        <p className="font-medium text-blue-900">Note for {country}</p>
        <p className="mt-1 text-blue-900">{analysis.regional_context_note}</p>
      </div>
    </section>
  );
}
