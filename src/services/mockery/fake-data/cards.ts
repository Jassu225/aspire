import { nanoid } from 'nanoid';
import {
  type Card,
  type CardAction,
  CardActionType,
  CardNetwork,
  CardStatus,
  CardType,
} from 'src/types/db/card';
import { type Currency } from 'src/types/helpers';
import { getCardNetworkLogo } from 'src/utils/card';
import { getAssetUrl } from 'src/utils/url';

export const inrCurrency: Currency = {
  type: 'INR',
  fractionFactor: 2,
};

export const sgdCurrency: Currency = {
  type: 'SGD',
  sign: 'S$',
  fractionFactor: 2,
};

export const getFakeCardActions = (cardUid: string): CardAction[] => {
  const fakeCardActions = [
    {
      uid: nanoid(12),
      cardUid,
      type: CardActionType.FREEZE,
      name: 'Freeze card',
      icon: {
        url: getAssetUrl('/icons/card/card-actions/freeze.png'),
      },
      isActive: true,
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardActionType.SET_SPEND_LIMIT,
      name: 'Set spend limit',
      icon: {
        url: getAssetUrl('/icons/card/card-actions/meter.png'),
      },
      isActive: true,
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardActionType.ADD_TO_GPAY,
      name: 'Add to GPay',
      icon: {
        url: getAssetUrl('/icons/card/card-actions/gpay.png'),
      },
      isActive: true,
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardActionType.REPLACE,
      name: 'Replace card',
      icon: {
        url: getAssetUrl('/icons/card/card-actions/replace.png'),
      },
      isActive: true,
    },
    {
      uid: nanoid(12),
      cardUid,
      type: CardActionType.CANCEL,
      name: 'Cancel card',
      icon: {
        url: getAssetUrl('/icons/card/card-actions/deactivate.png'),
      },
      isActive: true,
    },
  ];
  const randomIndexToRemove = Math.floor(Math.random() * fakeCardActions.length);

  return [
    ...fakeCardActions.slice(0, randomIndexToRemove),
    ...fakeCardActions.slice(randomIndexToRemove + 1),
  ];
};

export const getCardsFakeData: () => Card[] = () => [
  {
    uid: process.env.NODE_ENV === 'test' ? nanoid(12) : 'mkMSzBvWSA77',
    type: CardType.DEBIT,
    cardNumber: '1234 5678 9012 3456',
    expiry: '12/25',
    cardHolderName: 'Mark Henry',
    currency: inrCurrency,
    cardDesign: {
      backgroundColor: '#01D167',
      textColor: 'white',
      logo: {
        url: getAssetUrl('/icons/logo-with-name.svg'),
        width: 85,
        height: 24,
        alt: 'Card Logo with Name',
      },
      logoHasName: true,
      networkLogo: getCardNetworkLogo(CardNetwork.VISA)!,
    },
    cvv: '789',
    issuingBank: 'Aspire',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
  },
  {
    uid: process.env.NODE_ENV === 'test' ? nanoid(12) : 'omAesPcPttgV',
    type: CardType.DEBIT,
    cardNumber: '1111 5678 9012 3456',
    expiry: '12/26',
    cardHolderName: 'Jane Doe',
    currency: sgdCurrency,
    cardDesign: {
      backgroundColor: '#222222',
      textColor: '#ffffff',
      logo: {
        url: getAssetUrl('/icons/logo-with-name.svg'),
        width: 85,
        height: 24,
        alt: 'Card Logo with Name',
      },
      logoHasName: true,
      networkLogo: getCardNetworkLogo(CardNetwork.MASTERCARD)!,
    },
    cvv: '012',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.MASTERCARD,
  },
];
