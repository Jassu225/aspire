import type { CardNetwork, CardType } from '../db/card';
import type { CardsInfoType, UiCardTransaction, UiCard } from '../ui/card';

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
  transactions: UiCardTransaction[];
};

export type SubmitNewCardFormRequest = {
  type: CardType;
  network: CardNetwork;
  name: string;
  validityInYears: number;
};
