// components/PofStatusCard.tsx
// Shows the IRCC-required amount, the applicant's amount, and a status verdict.

interface Props {
  status: 'sufficient' | 'insufficient' | 'borderline' | 'cannot_determine';
  amountCheckMessage: string;
  requiredCad: number;
  familySize: number;
  lastUpdated: string;
  sourceUrl: string;
}

function statusStyles(status: Props['status']): { label: string; classes: string } {
  if (status === 'sufficient') {
    return { label: 'Sufficient', classes: 'bg-green-100 text-green-800 border-green-200' };
  }
  if (status === 'borderline') {
    return { label: 'Borderline', classes: 'bg-amber-100 text-amber-800 border-amber-200' };
  }
  if (status === 'insufficient') {
    return { label: 'Insufficient', classes: 'bg-red-100 text-red-800 border-red-200' };
  }
  return { label: 'Cannot determine', classes: 'bg-slate-100 text-slate-700 border-slate-200' };
}

export function PofStatusCard({ status, amountCheckMessage, requiredCad, familySize, lastUpdated, sourceUrl }: Props) {
  const { label, classes } = statusStyles(status);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Proof of funds check</h3>
          <p className="text-xs text-slate-500 mt-1">
            IRCC requires <strong>CAD {requiredCad.toLocaleString()}</strong> for a family of {familySize}.
          </p>
        </div>
        <span className={'inline-block text-xs font-medium px-2.5 py-1 rounded-full border ' + classes}>
          {label}
        </span>
      </div>
      <p className="text-sm text-slate-800">{amountCheckMessage}</p>
      <p className="text-xs text-slate-500 mt-3">
        Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">IRCC official table</a>, last updated {lastUpdated}.
      </p>
    </div>
  );
}
