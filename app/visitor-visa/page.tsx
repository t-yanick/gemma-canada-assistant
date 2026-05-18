// app/visitor-visa/page.tsx
// Visitor visa home ties analyzer page.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { VisitorVisaForm } from '@/components/VisitorVisaForm';
import { VisitorVisaResults } from '@/components/VisitorVisaResults';
import type { VisitorVisaApiResponse, VisitorVisaRequest } from '@/lib/types';

export default function VisitorVisaPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisitorVisaApiResponse | null>(null);
  const [error, setError] = useState('');
  const [submittedCountry, setSubmittedCountry] = useState('');

  async function handleSubmit(data: VisitorVisaRequest) {
    setLoading(true);
    setError('');
    setResult(null);
    setSubmittedCountry(data.applicantCountry || 'your country');
    try {
      const res = await fetch('/api/visitor-visa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseBody = await res.json();
      if (!res.ok) {
        setError(responseBody.message || responseBody.error || 'Something went wrong. Please try again.');
        return;
      }
      setResult(responseBody as VisitorVisaApiResponse);
      setTimeout(() => {
        document.getElementById('vv-results')?.scrollIntoView({ behavior: 'smooth' });
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
          <Link href="/pof" className="text-sm font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">Proof of funds</Link>
          <Link href="/visitor-visa" className="text-sm font-medium px-3 py-1.5 rounded-md border border-red-600 bg-red-600 text-white">Visitor visa</Link>
        </nav>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Check your visitor visa home ties</h2>
          <p className="text-sm text-slate-600 mt-1">Most visitor visa refusals for African applicants come down to one question: will the officer believe you will return home? This tool assesses your home ties, flags dual-intent risks, and tells you which documents strengthen your case.</p>
        </section>
        <VisitorVisaForm loading={loading} onSubmit={handleSubmit} />
        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>
        )}
        {result && <VisitorVisaResults result={result} country={submittedCountry} />}
      </main>
      <SiteFooter />
    </div>
  );
}
