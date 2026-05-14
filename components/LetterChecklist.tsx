// components/LetterChecklist.tsx
// Renders the 10-item IRCC reference letter checklist with status badges.

import type { ChecklistItem } from '@/lib/types';

interface Props {
  items: ChecklistItem[];
}

function statusBadgeClass(status: ChecklistItem['status']): string {
  if (status === 'have') return 'bg-green-100 text-green-800 border-green-200';
  if (status === 'missing') return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-amber-100 text-amber-800 border-amber-200';
}

function statusLabel(status: ChecklistItem['status']): string {
  if (status === 'have') return 'Provided';
  if (status === 'missing') return 'Missing';
  return 'Verify';
}

export function LetterChecklist({ items }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-3">
        Reference letter checklist
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        All ten elements IRCC expects in an Express Entry employer reference
        letter, personalized to your inputs.
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="border-l-2 border-slate-200 pl-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-slate-900 flex-1">
                {item.requirement}
              </p>
              <span
                className={
                  'inline-block text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ' +
                  statusBadgeClass(item.status)
                }>
                {statusLabel(item.status)}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
