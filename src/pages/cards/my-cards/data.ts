import { CardTransactionStatus, CardTransactionType, MerchantCategory } from 'src/types/db/card';
import { type CardTransaction } from 'src/types/user/card';

const hamleysMerchant: CardTransaction['merchant'] = {
  uid: 'hamleys',
  name: 'Hamleys',
  icon: {
    url: 'http://localhost:9000/icons/card/transactions/categories/file-storage.svg',
    color: '#009DFF',
    width: 16,
    height: 15.2,
  },
  category: MerchantCategory.LEISURE,
};

const mcDonalsdsMerchant: CardTransaction['merchant'] = {
  uid: 'mcD',
  name: 'Mc Donalds',
  icon: {
    url: 'http://localhost:9000/icons/card/transactions/categories/fast-food.svg',
    color: '#009DFF',
    width: 24,
    height: 24,
  },
  category: MerchantCategory.LEISURE,
};

export const transactions: CardTransaction[] = [
  {
    uid: '1',
    merchant: hamleysMerchant,
    amount: {
      value: 150000, // in paisa
      currencySign: '₹',
      currency: 'INR',
      fractionFactor: 2,
    },
    type: CardTransactionType.REFUND,
    status: CardTransactionStatus.SETTLED,
    createdAt: '2025-08-15T06:16:14+0530',
    settledAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '2',
    merchant: mcDonalsdsMerchant,
    amount: {
      value: 15000, // in cents
      currencySign: 'S$',
      currency: 'SGD',
      fractionFactor: 2,
    },
    type: CardTransactionType.PURCHASE,
    status: CardTransactionStatus.PENDING,
    createdAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '3',
    merchant: hamleysMerchant,
    amount: {
      value: 150000, // in paisa
      currencySign: '₹',
      currency: 'INR',
      fractionFactor: 2,
    },
    type: CardTransactionType.REFUND,
    status: CardTransactionStatus.SETTLED,
    createdAt: '2025-08-15T06:16:14+0530',
    settledAt: '2025-08-15T06:16:14+0530',
  },
  {
    uid: '4',
    merchant: mcDonalsdsMerchant,
    amount: {
      value: 15000, // in cents
      currencySign: 'S$',
      currency: 'SGD',
      fractionFactor: 2,
    },
    type: CardTransactionType.PURCHASE,
    status: CardTransactionStatus.PENDING,
    createdAt: '2025-08-15T06:16:14+0530',
  },
];
