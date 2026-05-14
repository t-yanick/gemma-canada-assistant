// components/DetailsSection.tsx
// Generic collapsible "show your work" section used for the meaning-check
// list and the swapped-phrases table. Saves duplicating the chrome.

interface Props {
  title: string;
  children: React.ReactNode;
}

export function DetailsSection({ title, children }: Props) {
  return (
    <details className="bg-white border border-slate-200 rounded-lg shadow-sm group">
      <summary className="px-5 py-3 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none flex items-center justify-between sm:px-6">
        <span>{title}</span>
        <span className="text-slate-400 group-open:rotate-90 transition-transform">&rsaquo;</span>
      </summary>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">{children}</div>
    </details>
  );
}
