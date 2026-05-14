// components/SiteHeader.tsx
// Sticky top header with the red Canadian accent strip.
// Subtitle names the audience (African applicants) and the engine (Gemma 4)
// so the product positioning is clear regardless of which tool the user lands on.

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="h-1 bg-red-600" />
      <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6">
        <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Canada Immigration Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 sm:text-sm">
          Built for African applicants, powered by Gemma 4
        </p>
      </div>
    </header>
  );
}
