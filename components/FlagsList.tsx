// components/FlagsList.tsx
// Reusable list for flag arrays (fund_source_flags, employment_legitimacy_flags).
// Renders nothing if empty, which is the desired behavior - no flags means no flags.

interface Props {
  title: string;
  flags: string[];
  tone?: 'warning' | 'neutral';
}

export function FlagsList({ title, flags, tone = 'warning' }: Props) {
  if (flags.length === 0) return null;

  const containerClass = tone === 'warning'
    ? 'bg-amber-50 border-amber-200'
    : 'bg-slate-50 border-slate-200';
  const titleClass = tone === 'warning' ? 'text-amber-900' : 'text-slate-900';
  const textClass = tone === 'warning' ? 'text-amber-900' : 'text-slate-700';

  return (
    <div className={'rounded-md border p-4 ' + containerClass}>
      <p className={'text-sm font-semibold ' + titleClass}>{title}</p>
      <ul className="mt-2 space-y-2 text-sm">
        {flags.map((flag, i) => (
          <li key={i} className={'flex gap-2 ' + textClass}>
            <span className="flex-shrink-0">-</span>
            <span>{flag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
