// app/page.tsx
// Composition root for the home page.
//
// Responsibilities:
// - Own the top-level loading / error / result state
// - Call the API
// - Pass the response down to ResultsPanel for rendering
//
// Everything else (form fields, individual result sections, layout chrome)
// lives in components/. This file should stay under 100 lines.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ReferenceLetterForm } from '@/components/ReferenceLetterForm';
import { ResultsPanel } from '@/components/ResultsPanel';
import type { RewriteApiRequest, RewriteApiResponse } from '@/lib/types';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriteApiResponse | null>(null);
  const [error, setError] = useState('');
  const [submittedCountry, setSubmittedCountry] = useState('');

  async function handleSubmit(data: RewriteApiRequest) {
    setLoading(true);
    setError('');
    setResult(null);
    setSubmittedCountry(data.applicantCountry || 'your country');

    try {
      const res = await fetch('/api/noc-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseBody = await res.json();

      if (!res.ok) {
        setError(
          responseBody.message ||
            responseBody.error ||
            'Something went wrong. Please try again.'
        );
        return;
      }

      setResult(responseBody as RewriteApiResponse);

      // Scroll to results after a brief delay so the DOM has rendered.
      setTimeout(() => {
        document
          .getElementById('results')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <nav className="mb-6 flex flex-wrap gap-2">
          <Link href="/" className="text-sm font-medium px-3 py-1.5 rounded-md border border-red-600 bg-red-600 text-white">Reference letter</Link>
          <Link href="/pof" className="text-sm font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">Proof of funds</Link>
          <Link href="/visitor-visa" className="text-sm font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">Visitor visa</Link>
        </nav>
        
                <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Generate your employer reference letter
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            IRCC rejects Express Entry applications when the reference letter (a)
            copies the NOC duties verbatim, or (b) is missing required elements.
            This tool fixes both: it rewrites your duties in your own voice and
            produces a complete letter checklist tailored to your situation.
          </p>
        </section>

        <ReferenceLetterForm loading={loading} onSubmit={handleSubmit} />

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {result && (
          <ResultsPanel result={result} country={submittedCountry} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
