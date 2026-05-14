// components/LetterOutline.tsx
// Renders the full reference letter outline with a copy-to-clipboard button.

'use client';

import { useState } from 'react';

interface Props {
  outline: string;
}

export function LetterOutline({ outline }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(outline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h3 className="text-base font-semibold text-slate-900">
          Full letter outline (copy-paste ready)
        </h3>
        <button
          onClick={copy}
          className="text-xs font-medium px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50">
          {copied ? 'Copied!' : 'Copy full letter'}
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-3">
        Hand this to your employer (or HR) as a starting point. Items in [BRACKETS]
        are placeholders for them to complete or verify.
      </p>
      <pre className="text-xs bg-slate-50 border border-slate-200 rounded p-4 overflow-x-auto whitespace-pre-wrap font-mono text-slate-800">
        {outline}
      </pre>
    </div>
  );
}
