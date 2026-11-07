import { expect, test } from "@playwright/test";

// A wrong turn still lands on the print: the framework's status, the
// site's masthead and measure, and one way back to the cover.
test.describe("not found", () => {
  test("an unknown address answers 404 on the print's own page", async ({ page }) => {
    const response = await page.goto("/this-pressing-does-not-exist");
    expect(response?.status()).toBe(404);

    const plate = page.getByTestId("not-found");
    await expect(
      plate.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(plate.getByText("Out of print")).toBeVisible();
    await expect(
      plate.getByRole("link", { name: /back to the cover/i }),
    ).toHaveAttribute("href", "/");

    // The masthead and the back cover are part of the screen, not chrome
    // the error route lost on its way here.
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-footer")).toBeVisible();
  });
});
