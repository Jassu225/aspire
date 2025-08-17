export default abstract class BaseMigration {
  abstract VERSION: number;
  abstract migration(db: IDBDatabase, transaction: IDBTransaction): void;
  abstract dataOps(db: IDBDatabase): Promise<void>;
}
