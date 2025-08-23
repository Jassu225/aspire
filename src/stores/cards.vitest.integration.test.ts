import { type App, createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import { CardsInfoType } from 'src/types/ui/card';
import db from 'src/services/mock-db/db';
import setupMockery from 'src/services/mockery/mockery';
import useCardsStore from './cards';
import { Notify, Quasar } from 'quasar';

describe('Cards Store', () => {
  let cleanupMockery: () => void;
  let appInstance: App<Element>;
  beforeAll(async () => {
    cleanupMockery = setupMockery();
    await db.ready;
    const app = createApp({});
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
    appInstance = app.use(Quasar, {
      plugins: {
        Notify,
      },
    });
  });

  afterAll(() => {
    appInstance.unmount();
    setActivePinia(undefined);
    cleanupMockery();
  });

  it('Own cards should be selected by default', () => {
    const store = useCardsStore();
    expect(store.selectedTab).toBe(CardsInfoType.OWN);
  });

  it('should be able to fetch cards info and select the first card', async () => {
    const store = useCardsStore();
    expect(store.isFetchingCardsInfo).toBe(false);
    const promise = store.fetchCardsInfo({ cardsInfoType: CardsInfoType.OWN });
    expect(store.isFetchingCardsInfo).toBe(true);
    await expect(promise).resolves.toBeUndefined();
    expect(store.isFetchingCardsInfo).toBe(false);
    expect(store.selectedCardUid).toBe(store.cardsInfoResponse?.cards[0]!.uid);
    expect(store.selectedCard).toBe(store.cardsInfoResponse?.cards[0]);
  });

  it('should be able to fetch selected card transactions', async () => {
    const store = useCardsStore();
    expect(store.isFetchingSelectedCardTransactions).toBe(false);
    const promise = store.fetchSelectedCardTransactions();
    expect(store.isFetchingSelectedCardTransactions).toBe(true);
    await expect(promise).resolves.toBeUndefined();
    expect(store.isFetchingSelectedCardTransactions).toBe(false);
    expect(store.selectedCardTransactions[0]?.cardUid).toBe(store.selectedCardUid);
  });
});
