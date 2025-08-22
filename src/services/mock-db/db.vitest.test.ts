import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, it } from 'vitest';
import 'fake-indexeddb/auto';
import { type UiCardTransaction } from 'src/types/ui/card';
import db, { COLLECTIONS } from './db';
import { getCardsFakeData, getFakeCardActions } from '../mockery/fake-data/cards';
import getFakeCardTransactions from '../mockery/fake-data/card-transactions';
import getFakeCardLimits from '../mockery/fake-data/card-limits';

installQuasarPlugin();

const nonEmptyArray = (arr: unknown) => Array.isArray(arr) && arr.length > 0;

const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(db.DB_NAME, db.VERSION);
    request.onerror = () => reject(request.error as Error);
    request.onsuccess = () => resolve(request.result);
  });
};

describe('mock-db/db', () => {
  const cardUids: string[] = [],
    transactions: UiCardTransaction[] = [];

  it('should be able to get the db', ({ expect }) => {
    expect(db).toBeDefined();
    expect(db.DB_NAME).toBe('aspire-play-test');
    expect(db.ready).toBeDefined();
    expect(db.ready).toBeInstanceOf(Promise);
  });

  it('should have all the methods', ({ expect }) => {
    expect(db.addToCollection.bind(db)).toBeInstanceOf(Function);
    expect(db.getAllFromCollection.bind(db)).toBeInstanceOf(Function);
    expect(db.getAllFromCollectionWithFilter.bind(db)).toBeInstanceOf(Function);
    expect(db.getAllFromCollectionWithSort.bind(db)).toBeInstanceOf(Function);
    expect(db.getAllFromCollectionWithFilterAndSort.bind(db)).toBeInstanceOf(Function);
  });

  it('should be ready', async ({ expect }) => {
    await expect(db.ready).resolves.toBe(true);
  });

  it('should be able to add one or more items to the db', async ({ expect }) => {
    const cards = getCardsFakeData();
    cardUids.push(...cards.map((card) => card.uid));
    await expect(db.addToCollection(COLLECTIONS.CARDS, cards[0])).resolves.toBeUndefined();
    await expect(db.addToCollection(COLLECTIONS.CARDS, cards.slice(1))).resolves.toBeUndefined();
    transactions.push(...cards.map((card) => getFakeCardTransactions(card.uid)).flat(2));
    const limits = cards.map((card) => getFakeCardLimits(card.uid)).flat(2);
    const actions = cards.map((card) => getFakeCardActions(card.uid)).flat(2);
    await expect(
      db.addToCollection(COLLECTIONS.TRANSACTIONS, transactions),
    ).resolves.toBeUndefined();
    await expect(db.addToCollection(COLLECTIONS.CARD_ACTIONS, actions)).resolves.toBeUndefined();
    await expect(db.addToCollection(COLLECTIONS.CARD_LIMITS, limits)).resolves.toBeUndefined();
  });

  it.concurrent('should have stores and indexes', async ({ expect }) => {
    let rawDB: IDBDatabase | undefined;
    try {
      rawDB = await openDB();
      expect(rawDB.name).toBe(db.DB_NAME);
      expect(rawDB.version).toBe(db.VERSION);
      const storeNames = rawDB.objectStoreNames;
      expect(new Array(...storeNames).sort()).toEqual(Object.values(COLLECTIONS).sort());
      await expect(
        new Promise<void>((resolve, reject) => {
          // Start transaction
          const transaction = rawDB!.transaction(
            [COLLECTIONS.CARDS, COLLECTIONS.CARD_LIMITS, COLLECTIONS.TRANSACTIONS],
            'readwrite',
          );
          expect(transaction.objectStore(COLLECTIONS.CARDS).indexNames.contains('createdAt')).toBe(
            true,
          );
          expect(
            transaction.objectStore(COLLECTIONS.CARD_LIMITS).indexNames.contains('cardUid-type'),
          ).toBe(true);
          expect(
            transaction
              .objectStore(COLLECTIONS.TRANSACTIONS)
              .indexNames.contains('cardUid-createdAt'),
          ).toBe(true);

          transaction.oncomplete = () => resolve();

          transaction.onerror = () => reject(transaction.error as Error);
        }),
      ).resolves.toBeUndefined();
    } finally {
      rawDB?.close();
    }
  });

  it.concurrent('should be able to get from the db', async ({ expect }) => {
    await Promise.all([
      expect(db.getAllFromCollection(COLLECTIONS.CARDS)).resolves.toSatisfy(nonEmptyArray),
      expect(db.getAllFromCollection(COLLECTIONS.TRANSACTIONS)).resolves.toSatisfy(nonEmptyArray),
      expect(db.getAllFromCollection(COLLECTIONS.CARD_ACTIONS)).resolves.toSatisfy(nonEmptyArray),
      expect(db.getAllFromCollection(COLLECTIONS.CARD_LIMITS)).resolves.toSatisfy(nonEmptyArray),
    ]);
  });

  it.concurrent('should be able to get from the db with filter', async ({ expect }) => {
    await expect(
      db.getAllFromCollectionWithFilter(COLLECTIONS.TRANSACTIONS, {
        cardUid: transactions[0]!.cardUid,
        createdAt: transactions[0]!.createdAt,
      }),
    ).resolves.toSatisfy(nonEmptyArray);
  });

  it.concurrent('should be able to get from the db with sort', async ({ expect }) => {
    await Promise.all([
      expect(db.getAllFromCollectionWithSort(COLLECTIONS.CARDS, 'createdAt')).resolves.toSatisfy(
        nonEmptyArray,
      ),
      expect(
        db.getAllFromCollectionWithSort(COLLECTIONS.CARDS, 'createdAt', 'DESC'),
      ).resolves.toSatisfy(nonEmptyArray),
    ]);
  });

  it.concurrent('should be able to get from the db with filter and sort', async ({ expect }) => {
    await expect(
      db.getAllFromCollectionWithFilterAndSort(
        COLLECTIONS.TRANSACTIONS,
        {
          cardUid: transactions[0]!.cardUid,
        },
        'createdAt',
        'DESC',
      ),
    ).resolves.toSatisfy(nonEmptyArray);
  });
});
