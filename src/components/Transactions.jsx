import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transactions as seedTx, aiRules, categoryColors, formatMoney } from '../data/mockData';

function guessCategory(description) {
  const lower = description.toLowerCase();
  for (const rule of aiRules) {
    if (rule.match.some((kw) => lower.includes(kw))) return rule.category;
  }
  return 'Office & Software';
}

export default function Transactions() {
  const [txs, setTxs] = useState(seedTx);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortDir, setSortDir] = useState('desc');
  const [categorizing, setCategorizing] = useState(false);
  const [justCategorized, setJustCategorized] = useState([]);

  const uncategorized = txs.filter((t) => !t.category).length;

  const filtered = useMemo(() => {
    let list = [...txs];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.description.toLowerCase().includes(q) || (t.category || '').toLowerCase().includes(q));
    }
    if (typeFilter !== 'all') list = list.filter((t) => t.type === typeFilter);
    list.sort((a, b) => (sortDir === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
    return list;
  }, [txs, query, typeFilter, sortDir]);

  const runAiCategorize = () => {
    if (uncategorized === 0 || categorizing) return;
    setCategorizing(true);
    const targets = txs.filter((t) => !t.category).map((t) => t.id);
    // Stagger the categorization for a visible effect
    targets.forEach((id, i) => {
      setTimeout(() => {
        setTxs((prev) => prev.map((t) => (t.id === id ? { ...t, category: guessCategory(t.description) } : t)));
        setJustCategorized((prev) => [...prev, id]);
      }, 350 * (i + 1));
    });
    setTimeout(() => {
      setCategorizing(false);
      setJustCategorized([]);
    }, 350 * (targets.length + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            September 2026 activity. {uncategorized > 0 ? `${uncategorized} still need categories.` : 'All categorized.'}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={runAiCategorize}
          disabled={uncategorized === 0 || categorizing}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {categorizing ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          {categorizing ? 'Categorizing...' : `AI Categorize (${uncategorized})`}
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search description or category"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button
          onClick={() => setSortDir(sortDir === 'desc' ? 'asc' : 'desc')}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Date {sortDir === 'desc' ? '↓' : '↑'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto slim-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-left">
                <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Description</th>
                <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Category</th>
                <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((t) => (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{t.date}</td>
                    <td className="px-5 py-3 text-slate-800 dark:text-slate-100 font-medium">{t.description}</td>
                    <td className="px-5 py-3">
                      {t.category ? (
                        <motion.span
                          key={t.category}
                          initial={justCategorized.includes(t.id) ? { scale: 0.6, opacity: 0 } : false}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[t.category] || categoryColors['Uncategorized']}`}
                        >
                          {justCategorized.includes(t.id) && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                          {t.category}
                        </motion.span>
                      ) : (
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors['Uncategorized']}`}>
                          Needs review
                        </span>
                      )}
                    </td>
                    <td className={`px-5 py-3 text-right font-bold whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {t.type === 'income' ? '+' : ''}{formatMoney(t.amount)}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">No transactions match your search.</p>
        )}
      </motion.div>
    </div>
  );
}
