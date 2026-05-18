// components/TiesInventory.tsx
// Renders the home-ties inventory: each tie category with a strength badge,
// what to provide, and why it matters to a visa officer.

import type { TieInventoryItem } from '@/lib/types';

interface Props {
  ties: TieInventoryItem[];
}

function strengthBadge(strength: TieInventoryItem['current_strength']): string {
  if (strength === 'strong') return 'bg-green-100 text-green-800 border-green-200';
  if (strength === 'moderate') return 'bg-amber-100 text-amber-800 border-amber-200';
  if (strength === 'weak') return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

function strengthLabel(strength: TieInventoryItem['current_strength']): string {
  if (strength === 'strong') return 'Strong';
  if (strength === 'moderate') return 'Moderate';
  if (strength === 'weak') return 'Weak';
  return 'Missing';
}

export function TiesInventory({ ties }: Props) {
  if (ties.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-1">Your home ties, category by category</h3>
      <p className="text-xs text-slate-500 mb-4">A visa officer weighs each of these when deciding whether you will return home.</p>
      <ul className="space-y-4">
        {ties.map((tie, i) => (
          <li key={i} className="border-l-2 border-slate-200 pl-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{tie.category}</p>
              <span className={'inline-block text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ' + strengthBadge(tie.current_strength)}>
                {strengthLabel(tie.current_strength)}
              </span>
            </div>
            <p className="text-sm text-slate-800 mt-1"><span className="font-medium">Provide: </span>{tie.what_to_provide}</p>
            <p className="text-xs text-slate-600 mt-1"><span className="font-medium">Why it matters: </span>{tie.rationale}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
