import { createFileRoute } from "@tanstack/react-router";
import {
  getFinanceSnapshot,
  incrementFinanceCounter,
} from "#/features/transactions/server/finance";
import { requireAuthBeforeLoad } from "#/lib/server/route-guards";

export const Route = createFileRoute("/reports")({
  beforeLoad: () => requireAuthBeforeLoad("/reports"),
  loader: async () => getFinanceSnapshot(),
  component: ReportsPage,
});

function ReportsPage() {
  const finance = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-[var(--sea-ink-soft)]">
          Server-scoped count for user: {finance.reportsCount}
        </p>
        <button
          onClick={() => incrementFinanceCounter({ data: { resource: "reportsCount" } })}
          className="mt-4 rounded-md border border-[var(--line)] px-3 py-2"
          type="button"
        >
          Run report (server mutation)
        </button>
      </section>
    </main>
  );
}
