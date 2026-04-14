import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth/client";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const search = Route.useSearch() as { redirectTo?: string };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const redirectTo = search.redirectTo || "/transactions";

  const onEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const result =
      mode === "sign-in"
        ? await authClient.signIn.email({
            email,
            password,
          })
        : await authClient.signUp.email({
            email,
            password,
            name,
          });

    setIsPending(false);

    if (result.error) {
      setError(result.error.message || "Unable to continue with email/password");
      return;
    }

    await navigate({ to: redirectTo });
  };

  const onGoogleSignIn = async () => {
    setIsPending(true);
    setError(null);

    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });

    setIsPending(false);

    if (result.error) {
      setError(result.error.message || "Google sign-in failed");
    }
  };

  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell mx-auto max-w-md rounded-2xl p-6">
        <h1 className="mb-2 text-3xl font-bold">Sign in to AckMoney</h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Email/password + Google + optional 2FA are enabled through better-auth.
        </p>

        <div className="mb-4 flex gap-2 text-sm">
          <button className="nav-link" onClick={() => setMode("sign-in")} type="button">
            Sign in
          </button>
          <button className="nav-link" onClick={() => setMode("sign-up")} type="button">
            Create account
          </button>
        </div>

        <form className="space-y-3" onSubmit={onEmailSubmit}>
          {mode === "sign-up" ? (
            <input
              required
              className="w-full rounded-md border border-[var(--line)] bg-transparent px-3 py-2"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          ) : null}
          <input
            required
            type="email"
            className="w-full rounded-md border border-[var(--line)] bg-transparent px-3 py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            required
            type="password"
            className="w-full rounded-md border border-[var(--line)] bg-transparent px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            disabled={isPending}
            className="w-full rounded-md bg-[var(--sea)] px-3 py-2 text-black"
            type="submit"
          >
            {isPending
              ? "Please wait..."
              : mode === "sign-in"
                ? "Sign in with email"
                : "Create account"}
          </button>
        </form>

        <button
          type="button"
          disabled={isPending}
          onClick={onGoogleSignIn}
          className="mt-3 w-full rounded-md border border-[var(--line)] px-3 py-2"
        >
          Continue with Google
        </button>

        <div className="mt-6 text-sm text-[var(--sea-ink-soft)]">
          <p>
            Need 2FA setup? <Link to="/auth/2fa">Open 2FA settings</Link>
          </p>
        </div>

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      </section>
    </main>
  );
}
