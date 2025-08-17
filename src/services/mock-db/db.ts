import { COLLECTIONS, ERRORS } from './types';
import { getAll, getIndexNameFromKeys } from './helper';
import migrationV1 from './migrations/for-v1';
import migrationV0 from './migrations/for-v0';
import type BaseMigration from './migrations/types';

const migrations: BaseMigration[] = [migrationV0, migrationV1];

type Filter = Record<string, IDBValidKey>;

class DB {
  ready: Promise<boolean> | null = null;
  private dbName = 'aspire-play';
  private needDataOps = false;
  private oldVersion = 0;
  private get VERSION() {
    return 2;
  }
  private get INDEX_KEY_SEPARATOR() {
    return '-';
  }

  constructor() {
    void this.initDB();
  }

  private getDbRequest() {
    return indexedDB.open(this.dbName, this.VERSION);
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
      request.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
        this.needDataOps = true;
        try {
          const target = evt.target as IDBOpenDBRequest;
          const db = target.result;
          const transaction = target.transaction!;
          const oldVersion = evt.oldVersion;
          this.oldVersion = oldVersion;
          console.log(`---- Upgrading DB from  v${oldVersion} to  v${this.VERSION} ----`);

          // Run all migrations from oldVersion to currentVersion
          for (let version = oldVersion; version < this.VERSION; version++) {
            const migration = migrations[version]!;
            console.log(`----  Running migration for version ${migration.VERSION} ---- `);
            migration.migration(db, transaction);
            console.log(`---- Completed migration for version ${migration.VERSION} ---- `);
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
      if (!this.needDataOps) return true;
      const db = await this.openDB();
      for (let version = this.oldVersion; version < this.VERSION; version++) {
        const migration = migrations[version]!;

        console.log(` ------ Running Data Ops for version ${migration.VERSION} ---- `);
        await migration.dataOps(db);
        console.log(` ------ Completed Data Ops for version ${version} ---- `);
      }
      return true;
    });
    return this.ready;
  }

  async addToCollection(name: COLLECTIONS, data: unknown): Promise<void> {
    if (!(await this.ready)) throw ERRORS.notReady;
    return this.openDB().then((db) => {
      return new Promise<void>((resolve, reject) => {
        // Start transaction
        const transaction = db.transaction([name], 'readwrite');
        const collection = transaction.objectStore(name);

        // Add data
        if (Array.isArray(data)) {
          data.forEach((data) => collection.add(data));
        } else {
          collection.add(data);
        }

        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject(transaction.error as Error);
      }).finally(() => db.close());
    });
  }

  async getAllFromCollection(name: COLLECTIONS): Promise<unknown[]> {
    if (!(await this.ready)) throw ERRORS.notReady;
    const db = await this.openDB();
    try {
      const results = await new Promise<unknown[]>((resolve, reject) => {
        const transaction = db.transaction([name], 'readonly');
        const store = transaction.objectStore(name);
        getAll(store).then(resolve).catch(reject);
      });
      return results;
    } finally {
      db.close();
    }
  }

  async getAllFromCollectionWithFilter(name: COLLECTIONS, filter: Filter): Promise<unknown[]> {
    if (!(await this.ready)) throw ERRORS.notReady;
    return this.openDB().then((db) => {
      return new Promise<unknown[]>((resolve, reject) => {
        const transaction = db.transaction([name], 'readonly');
        const store = transaction.objectStore(name);
        const index = store.index(getIndexNameFromKeys(Object.keys(filter)));
        const values = Object.values(filter);
        const request = index.getAll(values.length === 1 ? values[0] : values);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error as Error);
      }).finally(() => {
        db.close();
      });
    });
  }

  async getAllFromCollectionWithFilterAndSort(
    name: COLLECTIONS,
    filter: Filter,
    sortKey: string,
    direction: 'ASC' | 'DESC' = 'ASC',
  ): Promise<unknown[]> {
    if (!(await this.ready)) throw ERRORS.notReady;
    const db = await this.openDB();
    return new Promise<unknown[]>((resolve, reject) => {
      const transaction = db.transaction([name], 'readonly');
      const store = transaction.objectStore(name);
      const index = store.index(getIndexNameFromKeys([...Object.keys(filter), sortKey]));
      const values = Object.values(filter);
      const cursorDirection: IDBCursorDirection = direction === 'ASC' ? 'next' : 'prev';

      const query = IDBKeyRange.bound(
        [...values, new Date(0).toISOString()],
        [...values, new Date().toISOString()],
        false,
        false,
      );

      const results: unknown[] = [];
      const request = index.openCursor(query, cursorDirection);

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error as Error);
    }).finally(() => db.close());
  }
}

const db = new DB();
export default db;
export { COLLECTIONS };
