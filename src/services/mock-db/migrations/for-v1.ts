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
      const cardsStore = transaction.objectStore(COLLECTIONS.CARDS);
      const keys = ['createdAt'];
      cardsStore.createIndex(getIndexNameFromKeys(keys), keys);
    }

    {
      const cardLimitsStore = db.createObjectStore(COLLECTIONS.CARD_LIMITS, { keyPath: 'uid' });
      const keys = ['cardUid', 'type'];
      cardLimitsStore.createIndex(getIndexNameFromKeys(keys), keys);
    }

    {
      const cardActionsStore = transaction.objectStore(COLLECTIONS.CARD_ACTIONS);
      cardActionsStore.deleteIndex('cardUid');
      // const keys = ['isActive'];
      // cardActionsStore.createIndex(getIndexNameFromKeys(keys), keys);
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
      const transaction = db.transaction(
        [
          COLLECTIONS.CARDS,
          COLLECTIONS.CARD_LIMITS,
          COLLECTIONS.CARD_ACTIONS,
          COLLECTIONS.TRANSACTIONS,
        ],
        'readwrite',
      );

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error as Error);
      try {
        console.log(`------ ADDING currency to all cards ----- `);
        const cardsStore = transaction.objectStore(COLLECTIONS.CARDS);
        void getAll(cardsStore).then((_results) => {
          (_results as Card[]).forEach((card) => {
            const newCard: Card = {
              ...card,
              currency: card.currency
                ? card.currency
                : Math.random() < 0.5
                  ? inrCurrency
                  : sgdCurrency,
            };
            cardActionsStore.put(newCard);
          });
        });
        console.log(`------ ADDED currency to all cards ----- `);

        console.log(`----- Remove isVisible from card actions -----`);
        const cardActionsStore = transaction.objectStore(COLLECTIONS.CARD_ACTIONS);
        void getAll(cardActionsStore).then((results) => {
          results.forEach((action) => {
            if (!Object.hasOwnProperty.call(action, 'isVisible')) return;
            const newAction = JSON.parse(JSON.stringify({ ...action, isVisible: undefined }));
            cardActionsStore.put(newAction);
          });
        });
        console.log(`----- Removed isVisible from card actions -----`);

        console.log(`----- ADDING Card limits -------- `);
        const cardLimitsStore = transaction.objectStore(COLLECTIONS.CARD_LIMITS);
        getCardLimitsFakeData().forEach((limit) => {
          cardLimitsStore.add(limit);
        });
        console.log(`----- ADDED Card limits -------- `);

        console.log(`---- Updating amount, currency in transactions ----`);
        const transactionsStore = transaction.objectStore(COLLECTIONS.TRANSACTIONS);
        type OldTransactionType = object & {
          amount: {
            value: number;
            currency: string;
            currencySign?: string;
            fractionFactor: number;
          };
        };
        void getAll(transactionsStore).then((results) => {
          results.forEach((_transaction) => {
            const transaction = _transaction as OldTransactionType;
            if (typeof transaction.amount !== 'object') return;
            // @ts-expect-error Type conversion from old type to new type
            transaction.amount = transaction.amount.value;
            transactionsStore.put(transaction);
          });
        });
        console.log(`---- Updated amount, currency in transactions ----`);
      } catch (error) {
        console.error(`Error in seeding for version ${this.VERSION}:`, error);
        reject(error as Error);
      }
    });
  }
}

const migrationV1 = new MigrationV1();
export default migrationV1;
