'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', name: 'Alle producten', icon: '🔍' },
  { id: 'elektronica', name: 'Elektronica', icon: '📱' },
  { id: 'tv', name: 'TV & Audio', icon: '📺' },
  { id: 'keuken', name: 'Keuken & Huishouden', icon: '🍳' },
  { id: 'fashion', name: 'Mode & Kleding', icon: '👕' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'beauty', name: 'Beauty & Gezondheid', icon: '💄' },
  { id: 'sports', name: 'Sport & Outdoor', icon: '⚽' },
  { id: 'baby', name: 'Baby & Kind', icon: '🍼' },
];

const sortOptions = [
  { id: 'price-asc', name: 'Prijs: laag → hoog' },
  { id: 'price-desc', name: 'Prijs: hoog → laag' },
  { id: 'popular', name: 'Populair' },
  { id: 'new', name: 'Nieuw' },
];

// Correcte price parser
const parsePrice = (v) => {
  if (!v) return 0;
  return parseFloat(String(v).replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const search = async (cat = selectedCategory) => {
    if (!query.trim() && cat === 'all') return;

    setLoading(true);

    const url = new URL('/api/search', window.location.origin);
    url.searchParams.set('q', query);
    url.searchParams.set('cat', cat);

    const res = await fetch(url.toString());
    const data = await res.json();
    let items = data.results || [];

    if (sortBy === 'price-asc')
      items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

    if (sortBy === 'price-desc')
      items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    setResults(items);
    setLoading(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="vindoe.eu" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-5xl font-black text-purple-700 leading-none">vindoe.eu</h1>
              <p className="text-lg text-gray-600 -mt-1">De slimste prijsvergelijker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Zoekbalk */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex shadow-2xl rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Zoek in miljoenen producten..."
            className="flex-1 px-8 py-6 text-xl focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <button
            onClick={() => search()}
            className="px-20 py-6 bg-purple-600 text-white font-bold text-xl hover:bg-purple-700 transition"
          >
            Vind deal
          </button>
        </div>
      </div>

      {/* Hoofdinhoud */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit">
            <h3 className="font-bold text-xl mb-6 text-gray-800">Categorieën</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    search(cat.id);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-5 rounded-xl transition-all text-left ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white hover:bg-purple-50 text-gray-800 shadow'
                  }`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="font-semibold text-lg">{cat.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Mobiel menu knop */}
          <div className="lg:hidden fixed bottom-6 left-6 z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-purple-600 text-white p-4 rounded-full shadow-2xl"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobiel menu */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="bg-white w-80 h-full p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-bold text-2xl mb-6">Categorieën</h3>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      search(cat.id);
                    }}
                    className={`w-full flex items-center gap-4 px-5 py-5 rounded-xl mb-3 text-left ${
                      selectedCategory === cat.id ? 'bg-purple-600 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <span className="text-4xl">{cat.icon}</span>
                    <span className="font-bold text-xl">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Producten + sorteren */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-8">
              <p className="text-lg text-gray-700">
                {loading ? 'Laden...' : `${results.length} resultaten`}
              </p>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  search();
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Producten grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {results.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition">
                  <div className="h-64 bg-gray-50 overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/300'}
                      alt={item.title}
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3 line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-3xl font-black text-green-600">€{item.price}</span>
                      <span className="text-gray-600 text-sm">{item.shop}</span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700 transition"
                    >
                      Bekijk deal →
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
