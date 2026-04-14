import { createServerFn } from "@tanstack/react-start";
import { auth } from "#/lib/auth/server";

export const getServerSession = createServerFn({ method: "GET" }).handler(async ({ request }) => {
  return auth.api.getSession({
    headers: request.headers,
  });
});

export const requireServerSession = createServerFn({ method: "GET" }).handler(
  async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new Error("UNAUTHORIZED");
    }

    return session;
  },
);
