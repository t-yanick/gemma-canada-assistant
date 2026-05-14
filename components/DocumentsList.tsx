// components/DocumentsList.tsx
// Renders the required documents the applicant must obtain.

interface Props {
  documents: string[];
}

export function DocumentsList({ documents }: Props) {
  if (documents.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-3">Documents you will need</h3>
      <p className="text-xs text-slate-500 mb-4">
        Gather these before submitting your application. Missing any of these is a common refusal reason.
      </p>
      <ul className="space-y-2 text-sm text-slate-800">
        {documents.map((doc, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-slate-400 flex-shrink-0">-</span>
            <span>{doc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
