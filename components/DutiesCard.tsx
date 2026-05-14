// components/DutiesCard.tsx
// Shows the rewritten bullets with a copy-to-clipboard button.
// Owns its own "copied" feedback state - that detail does not need to
// bubble up to the parent.

'use client';

import { useState } from 'react';

interface Props {
  duties: string[];
}

export function DutiesCard({ duties }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = duties.map((d) => '- ' + d).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h3 className="text-base font-semibold text-slate-900">
          Rewritten duties for your letter
        </h3>
        <button
          onClick={copy}
          className="text-xs font-medium px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50">
          {copied ? 'Copied!' : 'Copy bullets'}
        </button>
      </div>
      <ul className="space-y-2 text-sm text-slate-800">
        {duties.map((duty, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-slate-400 flex-shrink-0">-</span>
            <span>{duty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
