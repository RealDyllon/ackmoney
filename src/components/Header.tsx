import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { appNavItems } from "./navigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] no-underline"
        >
          AckMoney
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {appNavItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/auth/sign-in" className="nav-link">
            Sign in
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
