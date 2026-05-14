// components/ResultsPanel.tsx
// Composes all the result sub-components. The parent page only needs to
// pass in the API response - this component handles the layout.

import type { RewriteApiResponse } from '@/lib/types';
import { NocHeader } from './NocHeader';
import { AlignmentBanner } from './AlignmentBanner';
import { DutiesCard } from './DutiesCard';
import { RegionNote } from './RegionNote';
import { LetterChecklist } from './LetterChecklist';
import { LetterOutline } from './LetterOutline';
import { DetailsSection } from './DetailsSection';

interface Props {
  result: RewriteApiResponse;
  country: string;
}

export function ResultsPanel({ result, country }: Props) {
  return (
    <section id="results" className="mt-8 space-y-5">
      <NocHeader
        code={result.noc.code}
        title={result.noc.title}
        teer={result.noc.teer}
        sourceUrl={result.noc.sourceUrl}
      />

      <AlignmentBanner message={result.rewrite.alignment_warning} />

      <DutiesCard duties={result.rewrite.rewritten_duties} />

      <RegionNote country={country} note={result.rewrite.region_specific_note} />

      <LetterChecklist items={result.rewrite.letter_requirements_checklist} />

      <LetterOutline outline={result.rewrite.letter_outline} />

      <DetailsSection title="How each bullet maps to an official IRCC duty">
        <ul className="space-y-1.5 text-sm text-slate-700">
          {result.rewrite.preserved_meaning_check.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </DetailsSection>

      <DetailsSection title="Phrases we rewrote to avoid verbatim copying">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="pb-2 pr-4">Original IRCC phrase</th>
                <th className="pb-2">Rewritten as</th>
              </tr>
            </thead>
            <tbody>
              {result.rewrite.swapped_phrases.map((pair, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-2 pr-4 text-slate-600 align-top">{pair.original}</td>
                  <td className="py-2 text-slate-900 align-top">{pair.rewritten_as}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DetailsSection>
    </section>
  );
}
