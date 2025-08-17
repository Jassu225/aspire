import { inrCurrency, sgdCurrency } from 'src/services/mockery/fake-data/cards';
import { COLLECTIONS } from '../types';
import BaseMigration from './types';
import { getAll, getIndexNameFromKeys } from '../helper';
import type { Card } from 'src/types/db/card';
import getCardLimitsFakeData from 'src/services/mockery/fake-data/card-limits';

class MigrationV1 extends BaseMigration {
  override get VERSION() {
    return 1;
  }

  override migration(db: IDBDatabase, transaction: IDBTransaction): void {
    {
      const cardLimitsStore = db.createObjectStore(COLLECTIONS.CARD_LIMITS, { keyPath: 'uid' });
      const keys = ['cardUid', 'type'];
      cardLimitsStore.createIndex(getIndexNameFromKeys(keys), keys);
    }

    {
      const cardActionsStore = transaction.objectStore(COLLECTIONS.CARD_ACTIONS);
      cardActionsStore.deleteIndex('cardUid');
      const keys = ['cardUid', 'isActive'];
      cardActionsStore.createIndex(getIndexNameFromKeys(keys), keys);
    }

    {
      const cardTransactionsStore = transaction.objectStore(COLLECTIONS.TRANSACTIONS);
      cardTransactionsStore.deleteIndex('cardUid');
      const keys = ['cardUid', 'createdAt'];
      cardTransactionsStore.createIndex(getIndexNameFromKeys(keys), keys);
    }
  }

  override dataOps(db: IDBDatabase): Promise<void> {
    console.log(`---- SEEDING for version ${this.VERSION} ------`);

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([COLLECTIONS.CARDS, COLLECTIONS.CARD_LIMITS], 'readwrite');

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error as Error);
      try {
        console.log(`------ ADDING currency to all cards ----- `);
        const cardActionsStore = transaction.objectStore(COLLECTIONS.CARDS);
        void getAll(cardActionsStore).then((_results) => {
          (_results as Card[]).forEach((card) => {
            const newCard: Card = {
              ...card,
              currency: Math.random() < 0.5 ? inrCurrency : sgdCurrency,
            };
            cardActionsStore.put(newCard);
          });
        });
        console.log(`------ ADDED currency to all cards ----- `);

        console.log(`----- ADDING Card limits -------- `);
        const cardLimitsStore = transaction.objectStore(COLLECTIONS.CARD_LIMITS);
        getCardLimitsFakeData().forEach((limit) => {
          cardLimitsStore.add(limit);
        });
        console.log(`----- ADDED Card limits -------- `);
      } catch (error) {
        console.error(`Error in seeding for version ${this.VERSION}:`, error);
        reject(error as Error);
      }
    });
  }
}

const migrationV1 = new MigrationV1();
export default migrationV1;
