import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accounts')({
  component: AccountsPage,
})

function AccountsPage() {
  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <p className="text-[var(--sea-ink-soft)]">Feature scaffold ready in src/features/accounts.</p>
      </section>
    </main>
  )
}
