import { createFileRoute } from '@tanstack/react-router'
import { getFinanceSnapshot, incrementFinanceCounter } from '#/features/transactions/server/finance'
import { requireAuthBeforeLoad } from '#/lib/server/route-guards'

export const Route = createFileRoute('/transactions')({
  beforeLoad: () => requireAuthBeforeLoad('/transactions'),
  loader: async () => getFinanceSnapshot(),
  component: TransactionsPage,
})

function TransactionsPage() {
  const finance = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-[var(--sea-ink-soft)]">Server-scoped count for user: {finance.transactionsCount}</p>
        <button
          onClick={() => incrementFinanceCounter({ data: { resource: 'transactionsCount' } })}
          className="mt-4 rounded-md border border-[var(--line)] px-3 py-2"
          type="button"
        >
          Add transaction (server mutation)
        </button>
      </section>
    </main>
  )
}
