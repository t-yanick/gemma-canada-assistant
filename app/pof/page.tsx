// app/pof/page.tsx
// Proof of Funds analyzer page. Mirrors the structure of app/page.tsx:
// state at the top, form submission, error/result rendering below.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProofOfFundsForm } from '@/components/ProofOfFundsForm';
import { ProofOfFundsResults } from '@/components/ProofOfFundsResults';
import type { PofApiResponse, PofCheckRequest } from '@/lib/types';

export default function PofPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PofApiResponse | null>(null);
  const [error, setError] = useState('');
  const [submittedCountry, setSubmittedCountry] = useState('');

  async function handleSubmit(data: PofCheckRequest) {
    setLoading(true);
    setError('');
    setResult(null);
    setSubmittedCountry(data.applicantCountry || 'your country');

    try {
      const res = await fetch('/api/pof-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseBody = await res.json();

      if (!res.ok) {
        setError(responseBody.message || responseBody.error || 'Something went wrong. Please try again.');
        return;
      }

      setResult(responseBody as PofApiResponse);

      setTimeout(() => {
        document.getElementById('pof-results')?.scrollIntoView({ behavior: 'smooth' });
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
          <Link href="/" className="text-sm font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">Reference letter</Link>
          <Link href="/pof" className="text-sm font-medium px-3 py-1.5 rounded-md border border-red-600 bg-red-600 text-white">Proof of funds</Link>
          <Link href="/visitor-visa" className="text-sm font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">Visitor visa</Link>
        </nav>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Check your proof of funds and employment legitimacy</h2>
          <p className="text-sm text-slate-600 mt-1">IRCC refuses Express Entry applications when the funds are in the wrong type of account, when the 6-month average balance does not meet the threshold, or when the employment evidence does not support the work history claim. This tool checks all three, with guardrails for African banking and employment contexts.</p>
        </section>
        <ProofOfFundsForm loading={loading} onSubmit={handleSubmit} />
        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>
        )}
        {result && <ProofOfFundsResults result={result} country={submittedCountry} />}
      </main>
      <SiteFooter />
    </div>
  );
}
