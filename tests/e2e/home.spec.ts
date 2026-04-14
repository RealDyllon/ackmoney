import { expect, test } from "@playwright/test";

test("app boots and shows the initial screen", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "AckMoney" })).toBeVisible();
  await expect(page.getByText("Personal Finance Starter")).toBeVisible();
  await expect(
    page.getByText("TanStack Start + Tailwind + shadcn-style primitives with SG-ready defaults."),
  ).toBeVisible();
});
