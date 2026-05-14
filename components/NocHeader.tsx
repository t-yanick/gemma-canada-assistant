// components/NocHeader.tsx

interface Props {
  code: string;
  title: string;
  teer: number;
  sourceUrl: string;
}

export function NocHeader({ code, title, teer, sourceUrl }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        NOC {code} - {title}
      </h2>
      <p className="text-xs text-slate-500 mt-1">
        <span>TEER {teer} - </span>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Official IRCC source</a>
      </p>
    </div>
  );
}
