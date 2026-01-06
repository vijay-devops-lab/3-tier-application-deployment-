import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, MousePointerClick, ShoppingBag, Bell, User } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';

const categories = ['Laptops', 'Phones', 'Gaming', 'Home Office', 'Fitness', 'Audio', 'Wearables'];

const featured = [
  {
    title: 'Work Essentials',
    copy: 'Curated picks for focus and flow—verified merchants only.',
    tag: 'Trusted bundles',
  },
  {
    title: 'Smart Fitness',
    copy: 'Sensors, recovery, and coaching in one AI-ready stack.',
    tag: 'Health-first',
  },
  {
    title: 'Creator Studio',
    copy: '4K-ready cameras, color-true monitors, and silent peripherals.',
    tag: 'Calibrated',
  },
];

const mockResults = [
  {
    id: 'lap-1',
    title: 'Lightweight laptop for design',
    snippet: '14-inch, color-accurate display, all-day battery, under 3 lbs.',
    category: 'Laptops',
    score: 0.92,
  },
  {
    id: 'lap-2',
    title: 'Battery-first ultrabook',
    snippet: 'Premium build, silent fans, great for commuting and travel.',
    category: 'Laptops',
    score: 0.87,
  },
  {
    id: 'phone-1',
    title: 'Camera-forward phone',
    snippet: 'Great low light, stable video, all-day power with fast charging.',
    category: 'Phones',
    score: 0.9,
  },
  {
    id: 'audio-1',
    title: 'ANC earbuds for focus',
    snippet: 'Adaptive noise canceling, multi-device pairing, clear calls.',
    category: 'Audio',
    score: 0.85,
  },
  {
    id: 'office-1',
    title: 'Ergo home office bundle',
    snippet: 'Mechanical keyboard, vertical mouse, posture-friendly chair.',
    category: 'Home Office',
    score: 0.83,
  },
];

export function LandingPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (q, category) => {
    const searchQuery = (q ?? query).trim();
    if (!searchQuery) {
      setResults(null);
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const normalized = searchQuery.toLowerCase();

      const filtered = mockResults.filter((item) => {
        const matchesCategory = category ? item.category === category : true;
        const matchesQuery =
          item.title.toLowerCase().includes(normalized) ||
          item.snippet.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized);
        return matchesCategory && matchesQuery;
      });

      setResults(filtered);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="relative isolate overflow-hidden">
        <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Cannydeals" className="h-10 w-10 rounded-full bg-white shadow" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Cannydeals</p>
              <p className="text-sm font-semibold text-gray-900">AI Shopping</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-2 rounded-full bg-gray-900 px-2 py-1 text-white">
            {['Landing', 'Shop', 'Track Order', 'Profile'].map((item, idx) => (
              <button
                key={item}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  idx === 0 ? 'bg-white text-gray-900 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <ShoppingBag className="h-5 w-5 text-gray-900" />
            </button>
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Bell className="h-5 w-5 text-gray-900" />
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
                1
              </span>
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <User className="h-5 w-5 text-gray-900" />
            </button>
          </div>
        </header>

        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full bg-amber-100 blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-rose-100 blur-3xl" />
        </div>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-14 px-4 sm:px-6 pb-12 lg:flex-row lg:items-center lg:pb-20">
          <section className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <img src="/logo.svg" alt="Cannydeals" className="h-4 w-4 object-contain" />
              <Sparkles className="h-4 w-4" />
              AI-powered shopping
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Shop with clarity, confidence, and an AI guide that knows what matters.
            </h1>
            <p className="text-base sm:text-lg text-gray-700">
              Search by describing your ideal product. Compare trusted merchants. Decide faster with transparent pros and cons.
            </p>

            <div className="rounded-2xl border border-gray-200 bg-white/75 p-3 sm:p-4 shadow-sm backdrop-blur-lg">
              <SearchBar
                value={query}
                onChange={(v) => {
                  setQuery(v);
                }}
                onSubmit={() => handleSearch()}
                loading={loading}
                placeholder="Ask anything: ‘minimal laptop for design under $1,500’"
              />
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  Private by design. No resold data.
                </div>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
                >
                  Start shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Search results / states */}
              <div className="mt-4">
                {loading && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-gray-500 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
                      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    AI is generating recommendations...
                  </div>
                )}
                {results && results.length === 0 && !loading && (
                  <div className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-700">
                    No recommendations found for that prompt. Try a broader query or
                    <button
                      onClick={() => window.location.assign('/shop')}
                      className="ml-2 inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-white text-sm font-semibold shadow-sm"
                    >
                      Browse all
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {results && results.length > 0 && (
                  <ul className="mt-2 grid gap-3">
                    {results.map((r) => (
                      <li
                        key={r.id}
                        className="group flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-900">{r.title}</h4>
                          <span className="text-xs text-gray-500">{Math.round((r.score ?? 0) * 100)}%</span>
                        </div>
                        <p className="text-sm text-gray-700">{r.snippet}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Link to="/shop" className="text-sm font-semibold text-indigo-600 hover:underline">
                            View options
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Popular categories">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const prompt = `Best ${item.toLowerCase()} for everyday use under $1000, prioritize battery and portability`;
                    setSelected(item);
                    setQuery(prompt);
                    handleSearch(prompt, item);
                  }}
                  aria-pressed={selected === item}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-transform focus:outline-none focus:ring-2 focus:ring-amber-300 " ${
                    selected === item
                      ? 'bg-amber-100 text-amber-900 border border-amber-200 shadow'
                      : 'bg-white text-gray-800 hover:scale-105 border border-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Explore products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Try the AI search
                <MousePointerClick className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="relative z-10 flex-1">
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{item.tag}</p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-700">{item.copy}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                    See picks
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
