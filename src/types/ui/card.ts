import type { CardAction, CardTransaction as DbCardTransaction, Card as DbCard } from '../db/card';
import type { Merchant } from '../db/merchant';

export type UiCard = DbCard & {
  actions: CardAction[];
};

export type UiCardTransaction = Omit<DbCardTransaction, 'merchantUid'> & {
  merchant: {
    uid: Merchant['uid'];
    name: Merchant['name'];
    icon: Merchant['icon'];
    category: Merchant['category'];
  };
};

export enum CardsInfoType {
  OWN = 'OWN',
  ALL = 'ALL',
}
