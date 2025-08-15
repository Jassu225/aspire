import type {
  CardAction as DbCardAction,
  CardTransaction as DbCardTransaction,
  Merchant,
} from '../db/card';

export type CardAction = DbCardAction & {
  isVisible: boolean; // Whether the action is visible in the UI
  isActive: boolean; // Whether the action is currently active
};

export type CardTransaction = Omit<DbCardTransaction, 'merchantUid'> & {
  merchant: {
    uid: Merchant['uid'];
    name: Merchant['name'];
    icon: Merchant['icon'];
    category: Merchant['category'];
  };
};
