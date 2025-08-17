export enum CardTransactionType {
  PURCHASE = 'PURCHASE',
  REFUND = 'REFUND',
  CASHBACK_ADJUSTMENT = 'CASHBACK_ADJUSTMENT',
  FEE = 'FEE', // annual fee, transaction fee ...
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  CASHBACK_RECEIVED = 'CASHBACK_RECEIVED', // paying using cashback
  DEPOSIT = 'DEPOSIT',
  WITHDRAWL = 'WITHDRAWL',
}

export enum CardTransactionStatus {
  PENDING = 'PENDING',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}

// DB type
export type CardTransaction = {
  uid: string;
  cardUid: string;
  merchantUid: string;
  amount: number;
  type: CardTransactionType;
  status: CardTransactionStatus;
  createdAt: string;
  settledAt?: string;
};
