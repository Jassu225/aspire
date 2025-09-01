import { test, expect } from '@playwright/test';
import { homePage } from 'src/constants/tests/locators/home-page';

test.describe('Home page', () => {
  test('should navigate to cards page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('aspire');

    const cardsPageBtn = page.getByTestId(homePage.cardsPageBtnId);
    await expect(cardsPageBtn).toBeVisible();
    await expect(cardsPageBtn).toHaveText('Go to Cards');

    await cardsPageBtn.click();
    await expect(page).toHaveURL('/cards');
  });
});
