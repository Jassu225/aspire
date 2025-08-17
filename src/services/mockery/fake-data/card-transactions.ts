import { CardTransactionStatus, CardTransactionType } from 'src/types/db/card';
import { MerchantCategory } from 'src/types/db/merchant';
import { type Currency } from 'src/types/helpers';
import { type UiCardTransaction } from 'src/types/ui/card';
import { getAssetUrl } from 'src/utils/url';

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

const inrCurrency: Currency = {
  type: 'INR',
};

const sgdCurrency: Currency = {
  type: 'SGD',
  sign: 'S$',
};

const fakeCardTransactions: UiCardTransaction[] = [
  {
    uid: '1',
    cardUid: '1',
    merchant: hamleysMerchant,
    amount: {
      value: 150000, // in paisa
      currency: inrCurrency,
      fractionFactor: 2,
    },
    type: CardTransactionType.REFUND,
    status: CardTransactionStatus.SETTLED,
    createdAt: '2025-08-15T06:16:14+0530',
    settledAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '2',
    cardUid: '1',
    merchant: fakeMcDonalsdsMerchant,
    amount: {
      value: 15000, // in cents
      currency: sgdCurrency,
      fractionFactor: 2,
    },
    type: CardTransactionType.PURCHASE,
    status: CardTransactionStatus.PENDING,
    createdAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '3',
    cardUid: '1',
    merchant: hamleysMerchant,
    amount: {
      value: 150000, // in paisa
      currency: inrCurrency,
      fractionFactor: 2,
    },
    type: CardTransactionType.REFUND,
    status: CardTransactionStatus.SETTLED,
    createdAt: '2025-08-15T06:16:14+0530',
    settledAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '4',
    cardUid: '1',
    merchant: fakeMcDonalsdsMerchant,
    amount: {
      value: 15000, // in cents
      currency: sgdCurrency,
      fractionFactor: 2,
    },
    type: CardTransactionType.PURCHASE,
    status: CardTransactionStatus.PENDING,
    createdAt: '2025-08-15T06:16:14+0530',
  },
];

export default fakeCardTransactions;
