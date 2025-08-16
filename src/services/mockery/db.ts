// type ErrorResult = {
//   error: Error;
// } | null;

import { toDbCard, toDbCardTransaction } from 'src/utils/card';
import { fakeCardActions, getCardsFakeData } from './fake-data/cards';
import fakeCardTransactions from './fake-data/card-transactions';
import { nanoid } from 'nanoid';

export enum COLLECTIONS {
  CARDS = 'CARDS',
  TRANSACTIONS = 'TRANSACTIONS',
  CARD_ACTIONS = 'CARD_ACTIONS',
}

export const ERRORS = {
  notReady: new Error('Db not ready or disposed!!'),
};

class DB {
  ready: Promise<boolean> | null = null;
  private dbName = 'aspire-play';
  private needsSeeding = false;

  constructor() {
    void this.initDB();
  }

  private getDbRequest() {
    return indexedDB.open(this.dbName, 1);
  }

  private openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = this.getDbRequest();
      request.onerror = () => reject(request.error as Error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  initDB() {
    this.ready = new Promise<void>((resolve, reject) => {
      const request = this.getDbRequest();
      request.onupgradeneeded = (evt) => {
        console.log('----db init ----');
        try {
          const db = (evt.target as unknown as { result: IDBDatabase }).result;
          // Create object store for users
          if (!db.objectStoreNames.contains(COLLECTIONS.CARDS)) {
            db.createObjectStore(COLLECTIONS.CARDS, { keyPath: 'uid' });
            this.needsSeeding = true;
          }

          if (!db.objectStoreNames.contains(COLLECTIONS.CARD_ACTIONS)) {
            this.needsSeeding = true;
            const cardActionsStore = db.createObjectStore(COLLECTIONS.CARD_ACTIONS, {
              keyPath: 'uid',
            });
            cardActionsStore.createIndex('cardUid', 'cardUid');
          }

          if (!db.objectStoreNames.contains(COLLECTIONS.TRANSACTIONS)) {
            this.needsSeeding = true;
            const transactionsStore = db.createObjectStore(COLLECTIONS.TRANSACTIONS, {
              keyPath: 'uid',
            });
            transactionsStore.createIndex('cardUid', 'cardUid');
          }
        } catch (e) {
          console.error('Error in onupgradeneeded:', e);
        }
      };

      request.onerror = () => {
        indexedDB.deleteDatabase(this.dbName).onsuccess = () => {
          console.log('Database deleted, try again');
          // Reinitialize your database
        };
        reject(request.error as Error);
      };
      request.onsuccess = () => resolve();
    }).then(async () => {
      if (!this.needsSeeding) return true;
      await this.seedInitialData();
      console.log(`----- SEEDING COMPLETE ----- `);
      return true;
    });
    return this.ready;
  }

  private async seedInitialData() {
    console.log(`---- SEEDING ------`);
    const db = await this.openDB();

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(
        [COLLECTIONS.CARDS, COLLECTIONS.CARD_ACTIONS, COLLECTIONS.TRANSACTIONS],
        'readwrite',
      );

      transaction.oncomplete = () => {
        console.log(`------ TRANSACTION COMPLETE ----- `);
        db.close();
        resolve();
      };

      transaction.onerror = () => {
        console.log(`------ TRANSACTION ERROR ----- `, transaction.error);
        db.close();
        reject(transaction.error as Error);
      };

      try {
        const cardsFakeData = getCardsFakeData();
        // Add cards
        const cardsStore = transaction.objectStore(COLLECTIONS.CARDS);
        cardsFakeData.forEach((uiCard) => {
          cardsStore.add(toDbCard(uiCard));
        });
        console.log(`----- CARDS ADDED ---- `);

        // Add card actions
        const cardActionsStore = transaction.objectStore(COLLECTIONS.CARD_ACTIONS);
        cardsFakeData.forEach((uiCard) => {
          fakeCardActions.forEach((action) => {
            cardActionsStore.add({ ...action, uid: nanoid(12), cardUid: uiCard.uid });
          });
        });
        console.log(`----- CARDS' ACTIONS ADDED ---- `);

        // Add transactions
        const transactionsStore = transaction.objectStore(COLLECTIONS.TRANSACTIONS);
        cardsFakeData.forEach((uiCard) => {
          fakeCardTransactions.forEach((transaction) => {
            transactionsStore.add(
              toDbCardTransaction({ ...transaction, uid: nanoid(12), cardUid: uiCard.uid }),
            );
          });
        });
        console.log(`----- CARDS' TRANSACTIONS ADDED ---- `);
      } catch (error) {
        console.error('Error adding seed data:', error);
        reject(error as Error);
      }
    });
  }

  dispose() {
    this.ready = null;
  }

  async addToCollection(name: COLLECTIONS, data: unknown): Promise<void> {
    if (!(await this.ready)) throw ERRORS.notReady;
    return this.openDB().then((db) => {
      return new Promise((resolve, reject) => {
        // Start transaction
        const transaction = db.transaction([name], 'readwrite');
        const collection = transaction.objectStore(name);

        // Add data
        const addRequest = collection.put(data);

        addRequest.onsuccess = () => {
          db.close();
          resolve();
        };

        addRequest.onerror = () => {
          db.close();
          reject(addRequest.error as Error);
        };
      });
    });
  }

  async getAllFromCollection(name: COLLECTIONS): Promise<unknown[]> {
    if (!(await this.ready)) throw ERRORS.notReady;
    return this.openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([name], 'readonly');
        const store = transaction.objectStore(name);
        const request = store.getAll();

        request.onsuccess = () => {
          db.close();
          resolve(request.result);
        };
        request.onerror = () => {
          db.close();
          reject(request.error as Error);
        };
      });
    });
  }

  async getAllFromCollectionBy(
    name: COLLECTIONS,
    key: string,
    value?: IDBValidKey | null,
  ): Promise<unknown[]> {
    if (!(await this.ready)) throw ERRORS.notReady;
    return this.openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([name], 'readonly');
        const store = transaction.objectStore(name);
        const index = store.index(key);
        const request = index.getAll(value);

        request.onsuccess = () => {
          db.close();
          resolve(request.result);
        };
        request.onerror = () => {
          db.close();
          reject(request.error as Error);
        };
      });
    });
  }
}

const db = new DB();
export default db;
