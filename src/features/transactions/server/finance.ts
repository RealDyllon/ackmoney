import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireServerSession } from "#/lib/server/session";

type FinanceSnapshot = {
  userId: string;
  transactionsCount: number;
  budgetsCount: number;
  accountsCount: number;
  reportsCount: number;
};

const financeByUser = new Map<string, FinanceSnapshot>();

function getScopedFinance(userId: string): FinanceSnapshot {
  const existing = financeByUser.get(userId);
  if (existing) {
    return existing;
  }

  const seeded: FinanceSnapshot = {
    userId,
    transactionsCount: 0,
    budgetsCount: 0,
    accountsCount: 0,
    reportsCount: 0,
  };

  financeByUser.set(userId, seeded);
  return seeded;
}

export const getFinanceSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireServerSession();
  return getScopedFinance(session.user.id);
});

const incrementSchema = z.object({
  resource: z.enum(["transactionsCount", "budgetsCount", "accountsCount", "reportsCount"]),
});

export const incrementFinanceCounter = createServerFn({ method: "POST" })
  .validator(incrementSchema)
  .handler(async ({ data }) => {
    const session = await requireServerSession();
    const scoped = getScopedFinance(session.user.id);
    scoped[data.resource] += 1;
    financeByUser.set(session.user.id, scoped);
    return scoped;
  });
