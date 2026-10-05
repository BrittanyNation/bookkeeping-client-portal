// Realistic mock data for the demo client: Summit Ridge Contracting LLC,
// a fictional residential remodeling contractor.

export const client = {
  name: 'Summit Ridge Contracting LLC',
  industry: 'Residential Remodeling',
  contact: 'Marcus Webb',
  email: 'marcus@summitridge.example',
  plan: 'Monthly Bookkeeping',
  bookkeeper: 'Brittany With The Books by Deva Gana LLC',
  booksStatus: 'Reconciled through September 2026',
};

// 12 months of revenue / expenses for charts and P&L
export const monthlyData = [
  { month: 'Oct 25', revenue: 48200, expenses: 31400 },
  { month: 'Nov 25', revenue: 51400, expenses: 33900 },
  { month: 'Dec 25', revenue: 44800, expenses: 30200 },
  { month: 'Jan 26', revenue: 39600, expenses: 27800 },
  { month: 'Feb 26', revenue: 42100, expenses: 28500 },
  { month: 'Mar 26', revenue: 53800, expenses: 35100 },
  { month: 'Apr 26', revenue: 58700, expenses: 37200 },
  { month: 'May 26', revenue: 62400, expenses: 39800 },
  { month: 'Jun 26', revenue: 66900, expenses: 42100 },
  { month: 'Jul 26', revenue: 64800, expenses: 41500 },
  { month: 'Aug 26', revenue: 69300, expenses: 43800 },
  { month: 'Sep 26', revenue: 71200, expenses: 44900 },
];

export const expenseBreakdown = [
  { name: 'Subcontractors', value: 184500 },
  { name: 'Materials', value: 132800 },
  { name: 'Payroll', value: 96400 },
  { name: 'Equipment', value: 42100 },
  { name: 'Insurance', value: 23800 },
  { name: 'Vehicle & Fuel', value: 18900 },
  { name: 'Office & Software', value: 9600 },
];

export const cashFlow = [
  { month: 'Oct 25', balance: 28400 },
  { month: 'Nov 25', balance: 31200 },
  { month: 'Dec 25', balance: 29800 },
  { month: 'Jan 26', balance: 26500 },
  { month: 'Feb 26', balance: 28100 },
  { month: 'Mar 26', balance: 33400 },
  { month: 'Apr 26', balance: 38200 },
  { month: 'May 26', balance: 41900 },
  { month: 'Jun 26', balance: 45300 },
  { month: 'Jul 26', balance: 44800 },
  { month: 'Aug 26', balance: 48600 },
  { month: 'Sep 26', balance: 52400 },
];

// category: null means "needs categorization" (AI button target)
export const transactions = [
  { id: 1, date: '2026-09-30', description: 'Harborview Kitchen Remodel - final payment', amount: 18400, type: 'income', category: 'Client Payments' },
  { id: 2, date: '2026-09-29', description: 'ABC Lumber - framing materials', amount: -3210, type: 'expense', category: 'Materials' },
  { id: 3, date: '2026-09-28', description: 'Elite Electrical Subcontractors', amount: -4850, type: 'expense', category: 'Subcontractors' },
  { id: 4, date: '2026-09-27', description: 'Deposit - Maple St bathroom project', amount: 6500, type: 'income', category: 'Client Payments' },
  { id: 5, date: '2026-09-26', description: 'Sunbelt Equipment Rental - excavator', amount: -890, type: 'expense', category: 'Equipment' },
  { id: 6, date: '2026-09-25', description: 'Payroll - field crew week 39', amount: -7420, type: 'expense', category: 'Payroll' },
  { id: 7, date: '2026-09-24', description: 'Tile Warehouse - porcelain tile', amount: -2140, type: 'expense', category: null },
  { id: 8, date: '2026-09-23', description: 'Progress billing - Oakdale addition', amount: 12250, type: 'income', category: 'Client Payments' },
  { id: 9, date: '2026-09-22', description: 'Shell - fleet fuel', amount: -412, type: 'expense', category: 'Vehicle & Fuel' },
  { id: 10, date: '2026-09-21', description: 'Pro Plumbing Co - rough-in labor', amount: -3680, type: 'expense', category: 'Subcontractors' },
  { id: 11, date: '2026-09-20', description: 'QuickBooks Online subscription', amount: -95, type: 'expense', category: 'Office & Software' },
  { id: 12, date: '2026-09-19', description: 'Deposit - Cedar deck build', amount: 4800, type: 'income', category: 'Client Payments' },
  { id: 13, date: '2026-09-18', description: 'General liability insurance - monthly', amount: -1985, type: 'expense', category: 'Insurance' },
  { id: 14, date: '2026-09-17', description: 'Home Depot - fasteners and hardware', amount: -386, type: 'expense', category: null },
  { id: 15, date: '2026-09-16', description: 'Payroll - field crew week 38', amount: -7420, type: 'expense', category: 'Payroll' },
  { id: 16, date: '2026-09-15', description: 'Countertop fabricator - quartz install', amount: -2950, type: 'expense', category: 'Subcontractors' },
  { id: 17, date: '2026-09-14', description: 'Harborview Kitchen Remodel - milestone 2', amount: 12000, type: 'income', category: 'Client Payments' },
  { id: 18, date: '2026-09-13', description: 'Dumpster rental - Oakdale site', amount: -520, type: 'expense', category: 'Equipment' },
  { id: 19, date: '2026-09-12', description: 'Sherwin-Williams - interior paint', amount: -764, type: 'expense', category: 'Materials' },
  { id: 20, date: '2026-09-11', description: 'Drywall Pros - hang and finish', amount: -4120, type: 'expense', category: null },
  { id: 21, date: '2026-09-10', description: 'Deposit - Elm St basement finish', amount: 7200, type: 'income', category: 'Client Payments' },
  { id: 22, date: '2026-09-09', description: 'Payroll - field crew week 37', amount: -7180, type: 'expense', category: 'Payroll' },
  { id: 23, date: '2026-09-08', description: 'Ferguson - plumbing fixtures', amount: -1875, type: 'expense', category: 'Materials' },
  { id: 24, date: '2026-09-07', description: 'Permit fees - City of Franklin', amount: -340, type: 'expense', category: null },
  { id: 25, date: '2026-09-06', description: 'Progress billing - Cedar deck build', amount: 5600, type: 'income', category: 'Client Payments' },
  { id: 26, date: '2026-09-05', description: 'Tool replacement - circular saws', amount: -649, type: 'expense', category: 'Equipment' },
  { id: 27, date: '2026-09-04', description: 'HVAC subcontractor - Oakdale rough-in', amount: -5340, type: 'expense', category: 'Subcontractors' },
  { id: 28, date: '2026-09-03', description: 'Office rent - October', amount: -1200, type: 'expense', category: 'Office & Software' },
  { id: 29, date: '2026-09-02', description: 'Payroll - field crew week 36', amount: -7180, type: 'expense', category: 'Payroll' },
  { id: 30, date: '2026-09-01', description: 'Workers comp insurance - monthly', amount: -1640, type: 'expense', category: 'Insurance' },
];

// Simple keyword rules the mock "AI" uses to categorize
export const aiRules = [
  { match: ['tile', 'lumber', 'paint', 'fixture', 'hardware', 'fastener'], category: 'Materials' },
  { match: ['drywall', 'plumb', 'electric', 'hvac', 'countertop', 'fabricat'], category: 'Subcontractors' },
  { match: ['permit', 'fee', 'dumpster'], category: 'Equipment' },
];

export const invoices = [
  { id: 'INV-2041', client: 'Harborview Kitchen Remodel', amount: 18400, issued: '2026-09-30', due: '2026-10-15', status: 'pending' },
  { id: 'INV-2040', client: 'Oakdale Addition - Phase 2', amount: 12250, issued: '2026-09-23', due: '2026-10-08', status: 'pending' },
  { id: 'INV-2039', client: 'Cedar Deck Build', amount: 5600, issued: '2026-09-06', due: '2026-09-21', status: 'overdue' },
  { id: 'INV-2038', client: 'Elm St Basement - Deposit', amount: 7200, issued: '2026-09-10', due: '2026-09-25', status: 'paid' },
  { id: 'INV-2037', client: 'Maple St Bathroom - Deposit', amount: 6500, issued: '2026-09-27', due: '2026-10-12', status: 'pending' },
  { id: 'INV-2036', client: 'Riverside Office TI', amount: 24100, issued: '2026-08-28', due: '2026-09-12', status: 'paid' },
  { id: 'INV-2035', client: 'Brookfield Garage Conversion', amount: 9800, issued: '2026-08-15', due: '2026-08-30', status: 'paid' },
  { id: 'INV-2034', client: 'Hillcrest Roof Repair', amount: 4300, issued: '2026-08-02', due: '2026-08-17', status: 'overdue' },
];

export const documentGroups = [
  {
    title: 'Bank Statements',
    items: [
      { id: 'doc-bank-sep', label: 'September business checking statement', done: true },
      { id: 'doc-bank-aug', label: 'August business checking statement', done: true },
      { id: 'doc-bank-cc', label: 'September business credit card statement', done: false },
    ],
  },
  {
    title: 'Receipts',
    items: [
      { id: 'doc-rcpt-mat', label: 'Materials receipts (Sep 1-15)', done: true },
      { id: 'doc-rcpt-mat2', label: 'Materials receipts (Sep 16-30)', done: false },
      { id: 'doc-rcpt-fuel', label: 'Fuel receipts - fleet cards', done: false },
    ],
  },
  {
    title: 'Payroll Reports',
    items: [
      { id: 'doc-pay-w39', label: 'Payroll register - week 39', done: true },
      { id: 'doc-pay-w38', label: 'Payroll register - week 38', done: true },
      { id: 'doc-pay-w37', label: 'Payroll register - week 37', done: true },
      { id: 'doc-pay-w36', label: 'Payroll register - week 36', done: false },
    ],
  },
  {
    title: 'Tax Documents',
    items: [
      { id: 'doc-tax-1099', label: 'Subcontractor W-9s collected', done: false },
      { id: 'doc-tax-q3', label: 'Q3 estimated tax payment confirmation', done: true },
    ],
  },
];

// Detailed P&L lines per month for the Reports view
export const plDetail = {
  'Sep 26': [
    { label: 'Client payments', amount: 60250 },
    { label: 'Deposits applied', amount: 10950 },
    { label: 'Total Revenue', amount: 71200, bold: true },
    { label: 'Subcontractors', amount: -22840 },
    { label: 'Materials', amount: -8999 },
    { label: 'Payroll', amount: -29000 },
    { label: 'Equipment', amount: -2060 },
    { label: 'Insurance', amount: -3625 },
    { label: 'Vehicle & Fuel', amount: -412 },
    { label: 'Office & Software', amount: -1295 },
    { label: 'Total Expenses', amount: -44900, bold: true },
    { label: 'Net Profit', amount: 26300, bold: true, highlight: true },
  ],
  'Aug 26': [
    { label: 'Client payments', amount: 58900 },
    { label: 'Deposits applied', amount: 10400 },
    { label: 'Total Revenue', amount: 69300, bold: true },
    { label: 'Subcontractors', amount: -21400 },
    { label: 'Materials', amount: -8620 },
    { label: 'Payroll', amount: -28100 },
    { label: 'Equipment', amount: -1980 },
    { label: 'Insurance', amount: -3625 },
    { label: 'Vehicle & Fuel', amount: -390 },
    { label: 'Office & Software', amount: -1295 },
    { label: 'Total Expenses', amount: -43800, bold: true },
    { label: 'Net Profit', amount: 25500, bold: true, highlight: true },
  ],
  'Jul 26': [
    { label: 'Client payments', amount: 55200 },
    { label: 'Deposits applied', amount: 9600 },
    { label: 'Total Revenue', amount: 64800, bold: true },
    { label: 'Subcontractors', amount: -20100 },
    { label: 'Materials', amount: -8100 },
    { label: 'Payroll', amount: -26900 },
    { label: 'Equipment', amount: -1900 },
    { label: 'Insurance', amount: -3625 },
    { label: 'Vehicle & Fuel', amount: -380 },
    { label: 'Office & Software', amount: -1295 },
    { label: 'Total Expenses', amount: -41500, bold: true },
    { label: 'Net Profit', amount: 23300, bold: true, highlight: true },
  ],
};

export const monthOptions = Object.keys(plDetail);

export const categoryColors = {
  'Client Payments': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'Materials': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'Subcontractors': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Payroll': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  'Equipment': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Insurance': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  'Vehicle & Fuel': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'Office & Software': 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  'Uncategorized': 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

export function formatMoney(n) {
  const abs = Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
  return (n < 0 ? '-$' : '$') + abs;
}
