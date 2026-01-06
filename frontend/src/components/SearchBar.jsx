import { Loader2, Search, Sparkles } from 'lucide-react';

export function SearchBar({ value, onChange, onSubmit, loading = false, placeholder }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-gray-300 focus-within:shadow-md"
    >
      <div className="flex items-center gap-2 text-gray-400">
        <Search className="h-5 w-5" />
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.18em]">AI search</span>
      </div>
      <input
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-none bg-transparent text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
        aria-label="Search"
      />
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          <Sparkles className="h-4 w-4" />
          AI assist
        </span>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:translate-y-0 disabled:bg-gray-500"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Thinking...
            </>
          ) : (
            <>
              Ask
            </>
          )}
        </button>
      </div>
    </form>
  );
}
