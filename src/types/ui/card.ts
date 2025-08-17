import type { CardAction, CardTransaction as DbCardTransaction, Card as DbCard } from '../db/card';
import type { CardLimitType } from '../db/card/card-limits';
import type { Merchant } from '../db/merchant';

export type UiCardLimit = Record<CardLimitType, number>;

export type UiCard = DbCard & {
  actions: CardAction[];
  limits: UiCardLimit;
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
