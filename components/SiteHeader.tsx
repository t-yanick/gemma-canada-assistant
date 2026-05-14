// components/SiteHeader.tsx
// Sticky top header with the red Canadian accent strip and Gemma 4 badge.
// Purely presentational - no state.

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="h-1 bg-red-600" />
      <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Canada Immigration Assistant
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Express Entry reference letter helper
            </p>
          </div>
          <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
            Built with Gemma 4
          </span>
        </div>
      </div>
    </header>
  );
}
