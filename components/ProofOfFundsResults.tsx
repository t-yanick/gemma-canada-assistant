// components/ProofOfFundsResults.tsx
// Composes all the POF result sub-components into one rendered output.

import type { PofApiResponse } from '@/lib/types';
import { ExemptionBanner } from './ExemptionBanner';
import { PofStatusCard } from './PofStatusCard';
import { FlagsList } from './FlagsList';
import { DocumentsList } from './DocumentsList';
import { NextStepsList } from './NextStepsList';

interface Props {
  result: PofApiResponse;
  country: string;
}

export function ProofOfFundsResults({ result, country }: Props) {
  const { analysis, pof } = result;
  const isExempt = analysis.exemption_status === 'exempt';

  return (
    <section id="pof-results" className="mt-8 space-y-5">
      <ExemptionBanner status={analysis.exemption_status} explanation={analysis.exemption_explanation} />

      {!isExempt && (
        <PofStatusCard
          status={analysis.pof_status}
          amountCheckMessage={analysis.pof_amount_check}
          requiredCad={pof.requiredPofCad}
          familySize={pof.familySize}
          lastUpdated={pof.lastUpdated}
          sourceUrl={pof.sourceUrl}
        />
      )}

      <FlagsList title="Fund source flags" flags={analysis.fund_source_flags} />

      <FlagsList title="Employment legitimacy flags" flags={analysis.employment_legitimacy_flags} />

      <DocumentsList documents={analysis.required_documents} />

      <NextStepsList steps={analysis.recommended_next_steps} />

      <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm">
        <p className="font-medium text-blue-900">Note for {country}</p>
        <p className="mt-1 text-blue-900">{analysis.regional_context_note}</p>
      </div>
    </section>
  );
}
