import { Link } from "@tanstack/react-router";
import { appNavItems } from "./navigation";

export default function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--header-bg)]/95 px-2 py-2 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {appNavItems.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeProps={{ className: "bg-[var(--chip-bg)] text-[var(--sea-ink)]" }}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-[var(--sea-ink-soft)] no-underline"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
