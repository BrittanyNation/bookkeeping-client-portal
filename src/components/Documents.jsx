import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { documentGroups } from '../data/mockData';

const STORAGE_KEY = 'bwtb-docs-v1';

function defaultState() {
  const state = {};
  documentGroups.forEach((g) => g.items.forEach((i) => { state[i.id] = i.done; }));
  return state;
}

export default function Documents() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === 'object') return { ...defaultState(), ...saved };
    } catch { /* fall through */ }
    return defaultState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const { total, done } = useMemo(() => {
    const ids = Object.keys(defaultState());
    const doneCount = ids.filter((id) => checked[id]).length;
    return { total: ids.length, done: doneCount };
  }, [checked]);

  const pct = Math.round((done / total) * 100);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Documents</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload checklist for September close. Your progress saves automatically.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">September close progress</p>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{done} of {total} ({pct}%)</p>
        </div>
        <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        {pct === 100 ? (
          <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            All documents received. Your books are ready for final review.
          </p>
        ) : (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {total - done} items still needed to finish the September close.
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">{group.title}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const isDone = !!checked[item.id];
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                        isDone
                          ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                      }`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        isDone ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isDone && (
                          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className={isDone ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200 font-medium'}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
