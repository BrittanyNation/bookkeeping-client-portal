# Brittany With The Books — Client Portal

A polished demo client portal for **Brittany With The Books by Deva Gana LLC**, a remote bookkeeping practice serving small businesses nationwide. It shows what a modern bookkeeper can give clients: a live dashboard, searchable transactions, invoice tracking, a document checklist, and monthly P&L reports.

**Live demo:** https://brittanynation.github.io/bookkeeping-client-portal/

## Features

- **Dashboard** — KPI cards (revenue, expenses, net profit, outstanding invoices), revenue vs expenses area chart, expense breakdown donut, and cash flow trend line
- **Transactions** — searchable, filterable, sortable table with category badges and a mock AI Categorize button that auto-assigns categories with animation
- **Invoices** — paid / pending / overdue cards with status filters and mark-as-paid, persisted to localStorage
- **Documents** — month-end upload checklist with an animated progress bar, persisted to localStorage
- **Reports** — profit and loss summary with a month selector
- **Dark mode** toggle, fully responsive layout, Framer Motion page transitions
- Realistic sample data for a fictional client (Summit Ridge Contracting LLC)

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Recharts (charts)
- Framer Motion (animations)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is deployed to GitHub Pages from the `gh-pages` branch.

## Notes

This is a portfolio demo. All client data is fictional and stored only in the browser (localStorage). No backend, no tracking.
