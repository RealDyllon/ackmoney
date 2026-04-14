import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/budgets')({
  component: BudgetsPage,
})

function BudgetsPage() {
  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <p className="text-[var(--sea-ink-soft)]">Feature scaffold ready in src/features/budgets.</p>
      </section>
    </main>
  )
}
