// components/NextStepsList.tsx
// Prioritized actions the applicant should take, in order.

interface Props {
  steps: string[];
}

export function NextStepsList({ steps }: Props) {
  if (steps.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-3">Recommended next steps</h3>
      <ol className="space-y-3 text-sm text-slate-800">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">{i + 1}</span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
