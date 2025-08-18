import type { Card, CardLimit } from 'src/types/db/card';
import getFakeCardLimits from 'src/services/mockery/fake-data/card-limits';
import BaseMigration from './types';
import { getAll } from '../helper';
import { COLLECTIONS } from '../types';

class MigrationV3 extends BaseMigration {
  override get VERSION() {
    return 3;
  }

  override migration(): void {}

  override dataOps(db: IDBDatabase): Promise<void> {
    console.log(`---- SEEDING for version ${this.VERSION} ------`);

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([COLLECTIONS.CARDS, COLLECTIONS.CARD_LIMITS], 'readwrite');

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error as Error);
      const cards: Card[] = [];
      try {
        {
          console.log(`------ READING all cards ----- `);
          const cardsStore = transaction.objectStore(COLLECTIONS.CARDS);
          void getAll(cardsStore).then((_results) => {
            cards.push(...(_results as Card[]));
          });
          console.log(`------ READ all cards ----- `);
        }

        {
          console.log(`----- FIXING Card limits -------- `);
          const cardLimitsStore = transaction.objectStore(COLLECTIONS.CARD_LIMITS);
          void getAll(cardLimitsStore).then((_results) => {
            const cardUids = new Set(cards.map((card) => card.uid));
            const limitsCardUids = new Set((_results as CardLimit[]).map((limit) => limit.cardUid));

            if (cardUids.difference(limitsCardUids).size > 0) {
              console.log(`---- Card uids in limits are not matching with the cards ---`);
              console.log(`---- Fixing ---`);
              cards.forEach((card) => {
                getFakeCardLimits(card.uid).forEach((limit) => {
                  cardLimitsStore.add(limit);
                });
              });
            }
          });
          console.log(`----- FIXED Card limits -------- `);
        }
      } catch (error) {
        console.error(`Error in seeding for version ${this.VERSION}:`, error);
        reject(error as Error);
      }
    });
  }
}

const migrationV3 = new MigrationV3();
export default migrationV3;
