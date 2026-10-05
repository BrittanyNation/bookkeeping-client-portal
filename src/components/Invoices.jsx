import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invoices as seedInvoices, formatMoney } from '../data/mockData';

const STORAGE_KEY = 'bwtb-invoices-v1';

const statusStyle = {
  paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
};

const statusLabel = { paid: 'Paid', pending: 'Pending', overdue: 'Overdue' };

export default function Invoices() {
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length) return saved;
    } catch { /* fall through */ }
    return seedInvoices;
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  const filtered = useMemo(
    () => (filter === 'all' ? invoices : invoices.filter((i) => i.status === filter)),
    [invoices, filter]
  );

  const totals = useMemo(() => ({
    pending: invoices.filter((i) => i.status === 'pending').reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
  }), [invoices]);

  const markPaid = (id) =>
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'paid' } : i)));

  const summary = [
    { label: 'Pending', value: totals.pending, cls: 'text-amber-600 dark:text-amber-400' },
    { label: 'Overdue', value: totals.overdue, cls: 'text-rose-600 dark:text-rose-400' },
    { label: 'Collected', value: totals.paid, cls: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track what clients owe you. Marking invoices paid saves automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.cls}`}>{formatMoney(s.value)}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'overdue', 'paid'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence initial={false}>
          {filtered.map((inv) => (
            <motion.div
              key={inv.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.id}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{inv.client}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[inv.status]}`}>
                  {statusLabel[inv.status]}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{formatMoney(inv.amount)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Issued {inv.issued} · Due {inv.due}
              </p>
              {inv.status !== 'paid' && (
                <button
                  onClick={() => markPaid(inv.id)}
                  className="mt-4 w-full rounded-xl border border-emerald-500 text-emerald-600 dark:text-emerald-400 px-3 py-2 text-sm font-semibold hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  Mark as paid
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">No invoices with this status.</p>
      )}
    </div>
  );
}
