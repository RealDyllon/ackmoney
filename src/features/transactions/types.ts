export type EntityId = string;

export type CategoryKind = "expense" | "income" | "transfer" | "saving" | "tax";

export interface Account {
  id: EntityId;
  name: string;
  institution?: string;
  type: "cash" | "bank" | "credit" | "investment" | "cpf" | "srs" | "other";
  currency: "SGD";
  openingBalanceCents: number;
  currentBalanceCents: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: EntityId;
  name: string;
  kind: CategoryKind;
  isDefault: boolean;
  color?: string;
  icon?: string;
}

export interface Transaction {
  id: EntityId;
  accountId: EntityId;
  categoryId: EntityId;
  amountCents: number;
  note?: string;
  merchant?: string;
  occurredOn: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Budget {
  id: EntityId;
  categoryId: EntityId;
  month: string;
  amountCents: number;
  rollover: boolean;
  spentCents: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Bill {
  id: EntityId;
  name: string;
  categoryId: EntityId;
  accountId?: EntityId;
  amountCents: number;
  dueDay: number;
  startsOn: string;
  endsOn?: string;
  autoPay: boolean;
  recurrence: "weekly" | "monthly" | "quarterly" | "yearly";
  notes?: string;
}

export interface Goal {
  id: EntityId;
  name: string;
  targetCents: number;
  savedCents: number;
  targetDate?: string;
  accountId?: EntityId;
  notes?: string;
}

const sgdFormatter = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
});

export function toCents(amountString: string): number {
  const normalized = amountString.replace(/\s|,/g, "").replace(/^S?\$/i, "");

  if (!/^-?\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("Invalid monetary amount. Use up to 2 decimal places.");
  }

  const sign = normalized.startsWith("-") ? -1 : 1;
  const [wholePart, decimalPart = ""] = normalized.replace("-", "").split(".");
  const wholeCents = Number.parseInt(wholePart, 10) * 100;
  const decimalCents = Number.parseInt(decimalPart.padEnd(2, "0"), 10);

  return sign * (wholeCents + decimalCents);
}

export function formatSGD(cents: number): string {
  return sgdFormatter.format(cents / 100);
}

export const DEFAULT_SG_CATEGORIES: Category[] = [
  { id: "food", name: "Food", kind: "expense", isDefault: true, icon: "utensils" },
  { id: "transport", name: "Transport", kind: "expense", isDefault: true, icon: "bus" },
  { id: "utilities", name: "Utilities", kind: "expense", isDefault: true, icon: "bolt" },
  { id: "insurance", name: "Insurance", kind: "expense", isDefault: true, icon: "shield" },
  { id: "cpf-srs", name: "CPF/SRS", kind: "saving", isDefault: true, icon: "piggy-bank" },
  { id: "housing", name: "Housing", kind: "expense", isDefault: true, icon: "house" },
  { id: "healthcare", name: "Healthcare", kind: "expense", isDefault: true, icon: "heart-pulse" },
  { id: "education", name: "Education", kind: "expense", isDefault: true, icon: "graduation-cap" },
  { id: "family", name: "Family", kind: "expense", isDefault: true, icon: "users" },
  {
    id: "entertainment",
    name: "Entertainment",
    kind: "expense",
    isDefault: true,
    icon: "clapperboard",
  },
  { id: "salary", name: "Salary", kind: "income", isDefault: true, icon: "briefcase" },
  { id: "bonus", name: "Bonus", kind: "income", isDefault: true, icon: "coins" },
];
