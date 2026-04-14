import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const appNavItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Transactions", to: "/transactions", icon: ReceiptText },
  { label: "Budgets", to: "/budgets", icon: PiggyBank },
  { label: "Accounts", to: "/accounts", icon: CreditCard },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];
