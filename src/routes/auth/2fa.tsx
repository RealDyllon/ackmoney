import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth/client'

export const Route = createFileRoute('/auth/2fa')({
  component: TwoFactorPage,
})

function TwoFactorPage() {
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [totpUri, setTotpUri] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const enable2fa = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)

    const setup = await authClient.twoFactor.enable({ password })

    if (setup.error) {
      setStatus(setup.error.message || 'Could not initialize 2FA')
      return
    }

    setTotpUri(setup.data?.totpURI ?? null)
    setStatus('Scan the URI in your authenticator app, then verify below.')
  }

  const verify2fa = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await authClient.twoFactor.verifyTotp({ code })

    setStatus(result.error ? (result.error.message ?? '2FA verification failed') : '2FA enabled successfully.')
  }

  return (
    <main className="page-wrap px-4 pb-24 pt-10 md:pb-8">
      <section className="island-shell mx-auto max-w-xl rounded-2xl p-6">
        <h1 className="mb-2 text-3xl font-bold">Two-factor authentication</h1>
        <p className="mb-5 text-sm text-[var(--sea-ink-soft)]">
          This page wires better-auth TOTP setup and verification for the signed-in user.
        </p>

        <form onSubmit={enable2fa} className="space-y-3">
          <input
            required
            type="password"
            className="w-full rounded-md border border-[var(--line)] bg-transparent px-3 py-2"
            placeholder="Current password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="rounded-md bg-[var(--sea)] px-3 py-2 text-black" type="submit">
            Generate 2FA secret
          </button>
        </form>

        {totpUri ? (
          <pre className="mt-4 overflow-auto rounded-md border border-[var(--line)] p-3 text-xs">{totpUri}</pre>
        ) : null}

        <form onSubmit={verify2fa} className="mt-4 space-y-3">
          <input
            required
            inputMode="numeric"
            className="w-full rounded-md border border-[var(--line)] bg-transparent px-3 py-2"
            placeholder="Authenticator code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="rounded-md border border-[var(--line)] px-3 py-2" type="submit">
            Verify and enable
          </button>
        </form>

        {status ? <p className="mt-3 text-sm">{status}</p> : null}
      </section>
    </main>
  )
}
