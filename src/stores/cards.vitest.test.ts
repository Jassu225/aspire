import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import 'fake-indexeddb/auto';
import { CardsInfoType } from 'src/types/ui/card';
import db from 'src/services/mock-db/db';
import setupMockery from 'src/services/mockery/mockery';
import useCardsStore from './cards';

describe('Cards Store', () => {
  let cleanupMockery: () => void;
  beforeAll(async () => {
    cleanupMockery = setupMockery();
    await db.ready;
    setActivePinia(createPinia());
  });

  afterAll(() => {
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
