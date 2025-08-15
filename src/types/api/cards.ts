import type { CardsInfoType, CardTransaction, UiCard } from '../user/card';

export type FetchCardsInfoRequest = {
  cardsInfoType: CardsInfoType;
};

export type FetchCardsInfoResponse = {
  cards: UiCard[];
};

export type FetchCardTransactionsRequest = {
  cardUid: string;
};

export type FetchCardTransactionsResponse = {
  transactions: CardTransaction[];
};
