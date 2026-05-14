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
  const [jobTitle, setJobTitle] = useState('Secondary school teacher');
  const [country, setCountry] = useState('Cameroon');
  const [duties, setDuties] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/noc-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nocCode, applicantJobTitle: jobTitle, applicantCountry: country, applicantRealDuties: duties })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || data.error || 'Error'); return; }
      setResult(data);
    } catch (err: unknown) { setError(String(err)); }
    finally { setLoading(false); }
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1>Canada Immigration Assistant</h1>
      <p>NOC Duty Rewriter, powered by Gemma 4.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, marginTop: 20 }}>
        <label>NOC Code <input value={nocCode} onChange={(e) => setNocCode(e.target.value)} /></label>
        <label>Job Title <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} /></label>
        <label>Country <input value={country} onChange={(e) => setCountry(e.target.value)} /></label>
        <label>Your real duties<br/><textarea value={duties} onChange={(e) => setDuties(e.target.value)} rows={6} style={{ width: '100%' }} /></label>
        <button type='submit' disabled={loading} style={{ padding: 12, background: '#d00', color: 'white', border: 'none', borderRadius: 6 }}>{loading ? 'Working (10-30 sec)...' : 'Rewrite my duties'}</button>
      </form>
      {error && <div style={{ marginTop: 20, color: 'red' }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>Rewritten duties for NOC {result.noc.code}</h2>
          <p>{result.noc.title} TEER {result.noc.teer}</p>
          <div style={{ padding: 10, background: '#efe', border: '1px solid #ada', borderRadius: 6 }}>{result.rewrite.alignment_warning}</div>
          <h3>Use these bullets in your reference letter:</h3>
          <ul>{result.rewrite.rewritten_duties.map((d: string, i: number) => <li key={i}>{d}</li>)}</ul>
          <h3>Mapping to official duties:</h3>
          <ul>{result.rewrite.preserved_meaning_check.map((d: string, i: number) => <li key={i}>{d}</li>)}</ul>
          <h3>Region note for {country}:</h3>
          <p style={{ padding: 10, background: '#eef', border: '1px solid #aaf', borderRadius: 6 }}>{result.rewrite.region_specific_note}</p>
        </div>
      )}
    </main>
  );
}
