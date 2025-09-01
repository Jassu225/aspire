import { test, expect } from '@playwright/test';
import { mainLayout } from 'src/constants/tests/locators/main-layout';

test.describe('Main layout', () => {
  test('should show main layout', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('aspire');
    const drawer = page.getByTestId(mainLayout.drawer.id);
    await expect(drawer).toBeVisible();

    await expect(drawer.getByTestId(mainLayout.drawer.logoId)).toBeVisible();
    await expect(drawer.getByTestId(mainLayout.drawer.trustIndicatorId)).toBeVisible();

    for (const navLinkId of Object.values(mainLayout.drawer.navLinks)) {
      const navLink = drawer.getByTestId(navLinkId);
      await expect(navLink).toBeVisible();
    }
  });

  test('should be able to navigate to other pages using the drawer and highlight the active page link', async ({
    page,
  }) => {
    await page.goto('/');

    const drawer = page.getByTestId(mainLayout.drawer.id);
    const homePageLink = drawer.getByTestId(mainLayout.drawer.navLinks.homeId);
    await expect(homePageLink).toContainClass('router-link-exact-active');

    const cardsPageBtn = page.getByTestId(mainLayout.drawer.navLinks.cardsId);
    await cardsPageBtn.scrollIntoViewIfNeeded();
    await cardsPageBtn.click();
    await page.waitForURL('/cards');

    await expect(drawer.getByTestId(mainLayout.drawer.navLinks.cardsId)).toContainClass(
      'router-link-exact-active',
    );
    await expect(homePageLink).not.toContainClass('router-link-exact-active');
  });
});
