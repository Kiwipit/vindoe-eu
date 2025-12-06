'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-7xl font-black text-purple-700 mb-4">vindoe.eu</h1>
        <p className="text-3xl text-gray-700 mb-12">de goedkoopste producten vind je hier</p>

        <div className="flex max-w-3xl mx-auto shadow-2xl rounded-full overflow-hidden mb-16">
          <input
            type="text"
            placeholder="Zoek in miljoenen producten..."
            className="flex-1 px-8 py-6 text-xl focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <button
            onClick={search}
            disabled={loading}
            className="px-16 py-6 bg-purple-600 text-white font-bold text-xl hover:bg-purple-700 disabled:opacity-70"
          >
            {loading ? 'Zoeken...' : 'Vind deal'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {results.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img src={item.image || 'https://via.placeholder.com/300'} alt={item.title} className="w-full h-full object-contain p-6" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3 line-clamp-2">{item.title}</h3>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-3xl font-black text-green-600">€{item.price}</span>
                  <span className="text-gray-600 text-sm">{item.shop}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700">
                  Bekijk deal →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}