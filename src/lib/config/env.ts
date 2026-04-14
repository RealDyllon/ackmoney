const env = import.meta.env;

export const appEnv = {
  currency: env.VITE_DEFAULT_CURRENCY || "SGD",
  locale: env.VITE_DEFAULT_LOCALE || "en-SG",
  timezone: env.VITE_DEFAULT_TIMEZONE || "Asia/Singapore",
} as const;
