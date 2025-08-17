export enum CardLimitType {
  TRANSACTION_LIMIT = 'TRANSACTION_LIMIT',
  DAILY_LIMIT = 'DAILY_LIMIT',
  MONTHLY_LIMIT = 'MONTHLY_LIMIT',
  TOTAL_LIMIT = 'TOTAL_LIMIT',
  USABLE_LIMIT = 'USABLE_LIMIT',
}

// Db type
export type CardLimit = {
  uid: string;
  cardUid: string;
  type: CardLimitType;
  value: number; // in lowest unit like cent, paisa ...
  timestamp: string; // ISO 8601 timestamp
};
