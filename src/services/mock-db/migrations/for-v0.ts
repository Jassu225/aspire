import { getFakeCardActions, getCardsFakeData } from 'src/services/mockery/fake-data/cards';
import { toDbCardTransaction } from 'src/utils/card';
import getFakeCardTransactions from 'src/services/mockery/fake-data/card-transactions';
import { COLLECTIONS } from '../types';
import BaseMigration from './types';
import { getIndexNameFromKeys } from '../helper';

class MigrationV0 extends BaseMigration {
  override get VERSION() {
    return 0;
  }

  override migration(db: IDBDatabase) {
    db.createObjectStore(COLLECTIONS.CARDS, { keyPath: 'uid' });

    const cardActionsStore = db.createObjectStore(COLLECTIONS.CARD_ACTIONS, {
      keyPath: 'uid',
    });
    cardActionsStore.createIndex(getIndexNameFromKeys(['cardUid']), 'cardUid');

    const transactionsStore = db.createObjectStore(COLLECTIONS.TRANSACTIONS, {
      keyPath: 'uid',
    });
    transactionsStore.createIndex(getIndexNameFromKeys(['cardUid']), 'cardUid');
  }

  override async dataOps(db: IDBDatabase) {
    console.log(`---- SEEDING for version ${this.VERSION} ------`);

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(
        [COLLECTIONS.CARDS, COLLECTIONS.CARD_ACTIONS, COLLECTIONS.TRANSACTIONS],
        'readwrite',
      );

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error as Error);

      try {
        const cardsFakeData = getCardsFakeData();

        console.log(`----- ADDING CARDS ---- `);
        const cardsStore = transaction.objectStore(COLLECTIONS.CARDS);
        cardsFakeData.forEach((card) => {
          cardsStore.add(card);
        });
        console.log(`----- CARDS ADDED ---- `);

        console.log(`----- ADDING CARDS' ACTIONS ---- `);
        const cardActionsStore = transaction.objectStore(COLLECTIONS.CARD_ACTIONS);
        cardsFakeData.forEach((uiCard) => {
          const fakeCardActions = getFakeCardActions(uiCard.uid);
          fakeCardActions.forEach((action) => {
            cardActionsStore.add(action);
          });
        });
        console.log(`----- CARDS' ACTIONS ADDED ---- `);

        console.log(`----- ADDING CARDS' TRANSACTIONS ---- `);
        const transactionsStore = transaction.objectStore(COLLECTIONS.TRANSACTIONS);
        cardsFakeData.forEach((card) => {
          getFakeCardTransactions(card.uid).forEach((transaction) => {
            transactionsStore.add(toDbCardTransaction(transaction));
          });
        });
        console.log(`----- CARDS' TRANSACTIONS ADDED ---- `);
      } catch (error) {
        console.error(`Error in seeding for version ${this.VERSION}:`, error);
        reject(error as Error);
      }
    });
  }
}

const migrationV0 = new MigrationV0();
export default migrationV0;
