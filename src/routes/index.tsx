import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { appEnv } from '#/lib/config/env'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell rounded-3xl p-6 sm:p-10">
        <p className="island-kicker mb-2">Personal Finance Starter</p>
        <h1 className="display-title mb-4 text-4xl font-bold sm:text-5xl">AckMoney</h1>
        <p className="mb-6 max-w-2xl text-[var(--sea-ink-soft)]">
          TanStack Start + Tailwind + shadcn-style primitives with SG-ready defaults.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/transactions" className="no-underline">
            <Button>View transactions</Button>
          </Link>
          <Link to="/budgets" className="no-underline">
            <Button variant="secondary">Open budgets</Button>
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>Default reporting currency</CardDescription>
          </CardHeader>
          <CardContent>{appEnv.currency}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Locale</CardTitle>
            <CardDescription>Formatting preference</CardDescription>
          </CardHeader>
          <CardContent>{appEnv.locale}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timezone</CardTitle>
            <CardDescription>Scheduling + cut-off reference</CardDescription>
          </CardHeader>
          <CardContent>{appEnv.timezone}</CardContent>
        </Card>
      </section>
    </main>
  )
}
