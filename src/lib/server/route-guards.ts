import { redirect } from '@tanstack/react-router'
import { getServerSession } from '#/lib/server/session'

export async function requireAuthBeforeLoad(redirectTo: string) {
  const session = await getServerSession()

  if (!session?.user) {
    throw redirect({
      to: '/auth/sign-in',
      search: {
        redirectTo,
      },
    })
  }

  return session
}
