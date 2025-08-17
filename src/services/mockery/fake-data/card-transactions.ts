import { CardTransactionStatus, CardTransactionType } from 'src/types/db/card';
import { MerchantCategory } from 'src/types/db/merchant';
import { type UiCardTransaction } from 'src/types/ui/card';
import { getAssetUrl } from 'src/utils/url';
import { inrCurrency, sgdCurrency } from './cards';
import { nanoid } from 'nanoid';

const hamleysMerchant: UiCardTransaction['merchant'] = {
  uid: 'QAcfRbWmo__5',
  name: 'Hamleys',
  icon: {
    url: getAssetUrl('/icons/card/transactions/categories/file-storage.svg'),
    color: '#009DFF',
    width: 16,
    height: 15.2,
  },
  category: MerchantCategory.LEISURE,
};

export const fakeMcDonalsdsMerchant: UiCardTransaction['merchant'] = {
  uid: 'dZ7TIXv6vJ6e',
  name: 'Mc Donalds',
  icon: {
    url: getAssetUrl('/icons/card/transactions/categories/fast-food.svg'),
    color: '#00D6B5',
    width: 24,
    height: 24,
  },
  category: MerchantCategory.LEISURE,
};

export const fakeMerchantUidMap: Record<string, UiCardTransaction['merchant']> = {
  [fakeMcDonalsdsMerchant.uid]: fakeMcDonalsdsMerchant,
  [hamleysMerchant.uid]: hamleysMerchant,
};

const getFakeCardTransactions = (cardUid: string): UiCardTransaction[] => {
  return [
    {
      uid: nanoid(12),
      cardUid,
      merchant: hamleysMerchant,
      amount: {
        value: 150000, // in paisa
        currency: inrCurrency,
        fractionFactor: 2,
      },
      type: CardTransactionType.REFUND,
      status: CardTransactionStatus.SETTLED,
      createdAt: '2025-08-10T00:46:14.000Z',
      settledAt: '2025-08-10T00:46:14.000Z',
    },
    {
      uid: nanoid(12),
      cardUid,
      merchant: fakeMcDonalsdsMerchant,
      amount: {
        value: 15000, // in cents
        currency: sgdCurrency,
        fractionFactor: 2,
      },
      type: CardTransactionType.PURCHASE,
      status: CardTransactionStatus.PENDING,
      createdAt: '2025-08-11T00:46:14.000Z',
    },
    {
      uid: nanoid(12),
      cardUid,
      merchant: hamleysMerchant,
      amount: {
        value: 150000, // in paisa
        currency: inrCurrency,
        fractionFactor: 2,
      },
      type: CardTransactionType.REFUND,
      status: CardTransactionStatus.SETTLED,
      createdAt: '2025-08-17T00:46:14.000Z',
      settledAt: '2025-08-17T00:46:14.000Z',
    },
    {
      uid: nanoid(12),
      cardUid,
      merchant: fakeMcDonalsdsMerchant,
      amount: {
        value: 15000, // in cents
        currency: sgdCurrency,
        fractionFactor: 2,
      },
      type: CardTransactionType.PURCHASE,
      status: CardTransactionStatus.PENDING,
      createdAt: '2025-08-12T00:46:14.000Z',
    },
  ];
};

export default getFakeCardTransactions;
