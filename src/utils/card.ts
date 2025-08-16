import {
  type Card,
  CardNetwork,
  type CardTransaction,
  CardTransactionType,
  type CardType,
} from 'src/types/db/card';
import type { UiCardTransaction, UiCard } from 'src/types/user/card';
import { enumToSentence } from './enum';
import { fakeCardActions } from 'src/services/mockery/fake-data/cards';
import { getAssetUrl } from './url';
import type { ImageResource } from 'src/types/helpers';

export const splitCardNumber = (cardNumber: string): string[] => {
  // Split the card number into groups of 4 digits
  const groups: string[] = [];
  const sanitizedCardNumber = cardNumber.split('').filter((c) => c >= '0' && c <= '9'); // Remove non-digit characters
  for (let i = 0; i < sanitizedCardNumber.length; i += 4) {
    groups.push(sanitizedCardNumber.slice(i, i + 4).join(''));
  }
  return groups;
};

export enum CashFlow {
  INWARDS = 'INWARDS',
  OUTWARDS = 'OUTWARDS',
}

export const getCashFlow = (transaction: UiCardTransaction) => {
  switch (transaction.type) {
    case CardTransactionType.CASHBACK_ADJUSTMENT:
    case CardTransactionType.FEE:
    case CardTransactionType.PURCHASE:
    case CardTransactionType.WITHDRAWL:
      return CashFlow.OUTWARDS;
    case CardTransactionType.DEPOSIT:
    case CardTransactionType.CASHBACK_RECEIVED:
    case CardTransactionType.REFUND:
    case CardTransactionType.PAYMENT_RECEIVED:
      return CashFlow.INWARDS;
  }
};

export const getTransactionCaption = (transaction: UiCardTransaction, cardType: CardType) => {
  switch (transaction.type) {
    case CardTransactionType.CASHBACK_RECEIVED:
    case CardTransactionType.REFUND:
    case CardTransactionType.PAYMENT_RECEIVED:
    case CardTransactionType.WITHDRAWL:
      return `${enumToSentence(transaction.type)} on the ${enumToSentence(cardType).toLowerCase()} card`;
    case CardTransactionType.CASHBACK_ADJUSTMENT:
    case CardTransactionType.DEPOSIT:
      return `${enumToSentence(transaction.type)} to the ${enumToSentence(cardType).toLowerCase()} card`;
    case CardTransactionType.FEE:
    case CardTransactionType.PURCHASE:
      return `Charged to the ${enumToSentence(cardType).toLowerCase()} card`;
  }
};

export const getCardNetworkLogo = (cardNetwork: CardNetwork): ImageResource | undefined => {
  const assetPathPrefix = '/icons/card/networks';
  switch (cardNetwork) {
    case CardNetwork.VISA:
      return {
        url: getAssetUrl(`${assetPathPrefix}/visa.svg`),
        width: 69,
        height: 23,
        alt: 'Visa',
      };
    case CardNetwork.MASTERCARD:
      return {
        url: getAssetUrl(`${assetPathPrefix}/mastercard.png`),
        width: 82.27,
        height: 54,
        alt: 'Mastercard',
      };
    case CardNetwork.RUPAY:
      return {
        url: getAssetUrl(`${assetPathPrefix}/rupay.svg`),
        width: 230,
        height: 60,
        alt: 'Rupay',
      };
  }
  return undefined;
};

export const MAX_CARD_NAME_LENGTH = 16;
export const CARD_VALIDITY_RANGE_IN_YEARS = [2, 3, 4, 5];

export const toUiCard = (card: Card): UiCard => ({ ...card, actions: fakeCardActions });
export const toDbCard = (card: UiCard): Card => {
  const dbCard = JSON.parse(JSON.stringify({ ...card, actions: undefined }));
  return dbCard;
};

export const toDbCardTransaction = (transaction: UiCardTransaction): CardTransaction => {
  const dbData = JSON.parse(
    JSON.stringify({ ...transaction, merchant: undefined, merchantUid: transaction.merchant.uid }),
  );
  return dbData;
};
