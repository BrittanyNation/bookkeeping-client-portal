import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { plDetail, monthOptions, formatMoney } from '../data/mockData';

export default function Reports() {
  const [month, setMonth] = useState(monthOptions[0]);
  const lines = plDetail[month];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profit and Loss</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monthly summary prepared by your bookkeeper.
          </p>
        </div>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {monthOptions.map((m) => (
            <option key={m} value={m}>{m} 2026</option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={month}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Summit Ridge Contracting LLC</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Profit and Loss · {month} 2026</p>
          </div>
          <ul>
            {lines.map((line) => (
              <li
                key={line.label}
                className={`flex items-center justify-between px-6 py-3 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                  line.highlight ? 'bg-emerald-50 dark:bg-emerald-950/50' : ''
                }`}
              >
                <span className={line.bold ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}>
                  {line.label}
                </span>
                <span className={`font-mono ${
                  line.highlight
                    ? 'font-bold text-emerald-600 dark:text-emerald-400'
                    : line.bold
                      ? 'font-bold text-slate-900 dark:text-white'
                      : line.amount < 0
                        ? 'text-slate-600 dark:text-slate-300'
                        : 'text-slate-600 dark:text-slate-300'
                }`}>
                  {line.amount < 0 ? `(${formatMoney(Math.abs(line.amount))})` : formatMoney(line.amount)}
                </span>
              </li>
            ))}
          </ul>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prepared by Brittany With The Books by Deva Gana LLC. Questions about any line item? Just reply to your monthly email.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
