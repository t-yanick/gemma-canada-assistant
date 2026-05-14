'use client';

import { useState } from 'react';

interface RewriteResult {
  success: boolean;
  noc: { code: string; title: string; teer: number; sourceUrl: string };
  rewrite: {
    rewritten_duties: string[];
    preserved_meaning_check: string[];
    swapped_phrases: Array<{ original: string; rewritten_as: string }>;
    alignment_warning: string;
    region_specific_note: string;
  };
}

export default function HomePage() {
  const [nocCode, setNocCode] = useState('41220');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('Cameroon');
  const [duties, setDuties] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [error, setError] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/noc-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nocCode,
          applicantJobTitle: jobTitle,
          applicantCountry: country,
          applicantRealDuties: duties,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || 'Something went wrong.');
        return;
      }
      setResult(data);
    } catch (err: unknown) {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyAllBullets() {
    if (!result) return;
    const text = result.rewrite.rewritten_duties.map((d) => '- ' + d).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  const aligned = result?.rewrite.alignment_warning.toLowerCase().includes('align');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="h-1 bg-red-600" />
        <div className="max-w-3xl mx-auto px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Canada Immigration Assistant
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 sm:text-sm">
                NOC Duty Rewriter for Express Entry
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Built with Gemma 4
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Rewrite your job duties for IRCC
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            IRCC officers flag verbatim copies from the official NOC description as a credibility issue. This tool rewrites your duties in your own voice while preserving the meaning, with guidance tailored to your country.
          </p>
        </section>

        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 space-y-5">
          <div>
            <label htmlFor="noc" className="block text-sm font-medium text-slate-800">
              NOC 2021 code
            </label>
            <p className="text-xs text-slate-500 mt-1">Five-digit code under NOC 2021. Currently supported: 41220.</p>
            <input
              id="noc"
              type="text"
              value={nocCode}
              onChange={(e) => setNocCode(e.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="41220"
            />
          </div>

          <div>
            <label htmlFor="job-title" className="block text-sm font-medium text-slate-800">
              Your actual job title
            </label>
            <p className="text-xs text-slate-500 mt-1">As it appears on your employer reference letter.</p>
            <input
              id="job-title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g. Mathematics Teacher"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-800">
              Country of origin
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="duties" className="block text-sm font-medium text-slate-800">
              Describe your real day-to-day duties
            </label>
            <p className="text-xs text-slate-500 mt-1">Three to five sentences in your own words. Do not copy from the IRCC website.</p>
            <textarea
              id="duties"
              value={duties}
              onChange={(e) => setDuties(e.target.value)}
              rows={5}
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
              placeholder="Example: I teach mathematics and physics to students in lower sixth and upper sixth at a government high school in Yaounde. I prepare weekly lesson plans, mark homework, and run end-of-term exams."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Rewriting your duties... (10-30 seconds)
              </>
            ) : (
              'Rewrite my duties'
            )}
          </button>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
        </form>

        {result && (
          <section className="mt-8 space-y-5">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    NOC {result.noc.code} - {result.noc.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    TEER {result.noc.teer} - <a href={result.noc.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Official IRCC source</a>
                  </p>
                </div>
              </div>
            </div>

            <div className={'rounded-md border p-4 text-sm ' + (aligned ? 'border-green-200 bg-green-50 text-green-900' : 'border-amber-200 bg-amber-50 text-amber-900')}>
              <p className="font-medium">Alignment check</p>
              <p className="mt-1">{result.rewrite.alignment_warning}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Use these in your employer reference letter
                </h3>
                <button
                  onClick={copyAllBullets}
                  className="text-xs font-medium px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  {copiedAll ? 'Copied!' : 'Copy all bullets'}
                </button>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {result.rewrite.rewritten_duties.map((duty: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-slate-400 flex-shrink-0">-</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900">Note for {country}</p>
              <p className="mt-1 text-blue-900">{result.rewrite.region_specific_note}</p>
            </div>

            <details className="bg-white border border-slate-200 rounded-lg shadow-sm group">
              <summary className="px-5 py-3 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none flex items-center justify-between sm:px-6">
                <span>How each bullet maps to an official IRCC duty</span>
                <span className="text-slate-400 group-open:rotate-90 transition-transform">&rsaquo;</span>
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {result.rewrite.preserved_meaning_check.map((line: string, i: number) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="bg-white border border-slate-200 rounded-lg shadow-sm group">
              <summary className="px-5 py-3 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none flex items-center justify-between sm:px-6">
                <span>Phrases we rewrote to avoid verbatim copying</span>
                <span className="text-slate-400 group-open:rotate-90 transition-transform">&rsaquo;</span>
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="pb-2 pr-4">Original IRCC phrase</th>
                        <th className="pb-2">Rewritten as</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.rewrite.swapped_phrases.map((pair, i: number) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="py-2 pr-4 text-slate-600 align-top">{pair.original}</td>
                          <td className="py-2 text-slate-900 align-top">{pair.rewritten_as}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          </section>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <p className="text-xs text-slate-500 text-center">
          Built for the Gemma 4 Challenge. This tool provides guidance only and is not a substitute for licensed immigration advice.
        </p>
      </footer>
    </div>
  );
}
