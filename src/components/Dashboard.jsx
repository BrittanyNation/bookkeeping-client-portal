import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { monthlyData, expenseBreakdown, cashFlow, formatMoney } from '../data/mockData';

const PIE_COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#f97316', '#0ea5e9', '#f43f5e', '#64748b'];

function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
    >
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      <div className="mt-4 h-64">{children}</div>
    </motion.div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-slate-900 dark:text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-slate-600 dark:text-slate-300">
          <span style={{ color: p.color || p.payload.fill }}>●</span> {p.name}: {formatMoney(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const latest = monthlyData[monthlyData.length - 1];
  const net = latest.revenue - latest.expenses;
  const prev = monthlyData[monthlyData.length - 2];
  const revGrowth = ((latest.revenue - prev.revenue) / prev.revenue * 100).toFixed(1);
  const outstanding = 18400 + 12250 + 6500 + 5600 + 4300;

  const kpis = [
    { label: 'Revenue (Sep)', value: formatMoney(latest.revenue), delta: `+${revGrowth}% vs Aug`, up: true, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', tint: 'emerald' },
    { label: 'Expenses (Sep)', value: formatMoney(latest.expenses), delta: 'Within budget', up: true, icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z', tint: 'amber' },
    { label: 'Net Profit (Sep)', value: formatMoney(net), delta: 'Margin 36.9%', up: true, icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z', tint: 'teal' },
    { label: 'Outstanding Invoices', value: formatMoney(outstanding), delta: '2 overdue', up: false, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', tint: 'rose' },
  ];

  const tintMap = {
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300',
    teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-300',
    rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Good afternoon, Marcus</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Here is how {latest.month.replace(' 26', '')} shaped up for Summit Ridge Contracting.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tintMap[kpi.tint]}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={kpi.icon} />
                </svg>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kpi.up ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`}>
                {kpi.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Expenses" subtitle="Last 12 months" delay={0.1}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" interval={2} />
              <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f59e0b" strokeWidth={2.5} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Expense Breakdown" subtitle="Year to date by category" delay={0.15}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2} strokeWidth={0}>
                {expenseBreakdown.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Cash Flow Trend" subtitle="Ending cash balance by month" delay={0.2}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cashFlow} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" interval={2} />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={(v) => `$${v / 1000}k`} domain={['auto', 'auto']} />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="balance" name="Cash balance" stroke="#0d9488" strokeWidth={3} dot={{ r: 3, fill: '#0d9488' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
