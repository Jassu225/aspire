import { test, expect, type Page } from '@playwright/test';
import { cardsPage } from 'src/constants/tests/locators/cards-page';
import { CardsInfoType } from 'src/types/ui/card';
import { waitForResponse } from './utils';
// import type { FetchCardsInfoRequest, FetchCardsInfoResponse } from 'src/types/api/cards';
import { homePage } from 'src/constants/tests/locators/home-page';

const goToCardsPage = async (page: Page, urlsToWaitFor: string[]) => {
  await page.goto('/');
  const apiResponsesPromise = Promise.all(
    urlsToWaitFor.map((url) => waitForResponse<unknown, unknown>(page, url)),
  );
  const cardsPageBtn = page.getByTestId(homePage.cardsPageBtnId);
  await cardsPageBtn.click();
  await page.waitForURL('/cards');
  await apiResponsesPromise;
};

const expectCardDetails = async (
  page: Page,
  {
    cardType,
    cardHolderName,
    cardNumber,
    expiry,
    cvv,
  }: {
    cardType: string;
    cardHolderName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  },
) => {
  const cardTypeEl = page.getByTestId(cardsPage.cardsCarousel.card.cardType);
  await expect(cardTypeEl).toHaveText(cardType);
  const bankLogoEl = page.getByTestId(cardsPage.cardsCarousel.card.bankLogo);
  await expect(bankLogoEl).toBeVisible();
  const cardHolderNameEl = page.getByTestId(cardsPage.cardsCarousel.card.cardHolderName);
  await expect(cardHolderNameEl).toHaveText(cardHolderName);
  const cardNumberEl = page.getByTestId(cardsPage.cardsCarousel.card.cardNumberContainer);
  await expect(cardNumberEl).toHaveText(cardNumber);
  const expiryEl = page.getByTestId(cardsPage.cardsCarousel.card.expiryContainer);
  await expect(expiryEl).toHaveText(`Thru: ${expiry}`);
  const cvvEl = page.getByTestId(cardsPage.cardsCarousel.card.cvvContainer);
  await expect(cvvEl).toHaveText(`CVV: ${cvv}`);
  const networkLogoEl = page.getByTestId(cardsPage.cardsCarousel.card.networkLogoContainer);
  await expect(networkLogoEl).toBeVisible();
};

test.describe('Cards page', () => {
  test('should show cards page and be able to switch between tabs', async ({ page }) => {
    await page.goto('/cards');
    const allCardsTab = page.getByTestId(cardsPage.tabs[CardsInfoType.ALL]);
    await expect(allCardsTab).toBeVisible();

    const ownCardsTab = page.getByTestId(cardsPage.tabs[CardsInfoType.OWN]);
    await expect(ownCardsTab).toBeVisible();

    await expect(allCardsTab).toHaveAttribute('aria-selected', 'false');
    await expect(ownCardsTab).toHaveAttribute('aria-selected', 'true');

    await allCardsTab.click();
    await expect(allCardsTab).toHaveAttribute('aria-selected', 'true');
    await expect(ownCardsTab).toHaveAttribute('aria-selected', 'false');

    await ownCardsTab.click();
    await expect(allCardsTab).toHaveAttribute('aria-selected', 'false');
    await expect(ownCardsTab).toHaveAttribute('aria-selected', 'true');
  });

  test('available balance should be visible and should update on card selection', async ({
    page,
  }) => {
    await goToCardsPage(page, ['/api/cards']);
    const availableBalanceContainer = page.getByTestId(cardsPage.availableBalanceContainer.id);
    await expect(availableBalanceContainer).toBeVisible();

    const cardsCarouselNavigationButtonEls = page.getByTestId(
      cardsPage.cardsCarousel.cardNavigationButton,
    );
    await expect(cardsCarouselNavigationButtonEls).toHaveCount(2);

    const availableBalanceAmountSignEl = page.getByTestId(
      cardsPage.availableBalanceContainer.amount.sign,
    );
    const availableBalanceAmountValueEl = page.getByTestId(
      cardsPage.availableBalanceContainer.amount.value,
    );

    await expect(cardsCarouselNavigationButtonEls.nth(0).locator('.control-icon')).toContainClass(
      'active',
    );
    await expect(
      cardsCarouselNavigationButtonEls.nth(1).locator('.control-icon'),
    ).not.toContainClass('active');
    await expect(availableBalanceAmountSignEl).toHaveText('₹');
    await expect(availableBalanceAmountValueEl).toHaveText('15,000');

    await cardsCarouselNavigationButtonEls.nth(1).click();

    await expect(cardsCarouselNavigationButtonEls.nth(1).locator('.control-icon')).toContainClass(
      'active',
    );
    await expect(
      cardsCarouselNavigationButtonEls.nth(0).locator('.control-icon'),
    ).not.toContainClass('active');
    await expect(availableBalanceAmountSignEl).toHaveText('S$');
    await expect(availableBalanceAmountValueEl).toHaveText('15,000');
  });

  test('Should show card details when card is selected & visibility button is clicked', async ({
    page,
  }) => {
    await goToCardsPage(page, ['/api/cards']);

    const mask = '\u{2022}\u{2022}\u{2022}\u{2022}';
    {
      await expectCardDetails(page, {
        cardType: 'Debit',
        cardHolderName: 'Mark Henry',
        cardNumber: `${mask}${mask}${mask}3456`,
        expiry: '12/25',
        cvv: '\u{2732} \u{2732} \u{2732}',
      });

      const visibilityButtonEl = page.getByTestId(cardsPage.cardsCarousel.card.visibilityButton);
      await expect(visibilityButtonEl.locator('.q-btn__content span')).toHaveText('Show details');
      await visibilityButtonEl.click();
      await expectCardDetails(page, {
        cardType: 'Debit',
        cardHolderName: 'Mark Henry',
        cardNumber: '1234567890123456',
        expiry: '12/25',
        cvv: '789',
      });
      await expect(visibilityButtonEl.locator('.q-btn__content span')).toHaveText('Hide details');
    }

    const cardsCarouselNavigationButtonEls = page.getByTestId(
      cardsPage.cardsCarousel.cardNavigationButton,
    );
    await cardsCarouselNavigationButtonEls.nth(1).click();
    // wait for transiton to complete
    await page.waitForTimeout(2000);

    {
      await expectCardDetails(page, {
        cardType: 'Credit',
        cardHolderName: 'Jane Doe',
        cardNumber: `${mask}${mask}${mask}3456`,
        expiry: '12/26',
        cvv: '\u{2732} \u{2732} \u{2732}',
      });

      const visibilityButtonEl = page.getByTestId(cardsPage.cardsCarousel.card.visibilityButton);
      await visibilityButtonEl.click();
      await expectCardDetails(page, {
        cardType: 'Credit',
        cardHolderName: 'Jane Doe',
        cardNumber: '1111567890123456',
        expiry: '12/26',
        cvv: '012',
      });
    }
  });
});
