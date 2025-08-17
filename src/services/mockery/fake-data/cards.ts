import {
  type CardAction,
  CardActionType,
  CardNetwork,
  CardStatus,
  CardType,
} from 'src/types/db/card';
import { type Currency } from 'src/types/helpers';
import type { UiCard } from 'src/types/ui/card';
import { getCardNetworkLogo } from 'src/utils/card';
import { getAssetUrl } from 'src/utils/url';

export const inrCurrency: Currency = {
  type: 'INR',
};

export const sgdCurrency: Currency = {
  type: 'SGD',
  sign: 'S$',
};

export const fakeCardActions: CardAction[] = [
  {
    uid: '1',
    cardUid: '1',
    type: CardActionType.FREEZE,
    name: 'Freeze card',
    icon: {
      url: getAssetUrl('/icons/card/card-actions/freeze.png'),
    },
    isActive: true,
  },
  {
    uid: '2',
    cardUid: '1',
    type: CardActionType.SET_SPEND_LIMIT,
    name: 'Set spend limit',
    icon: {
      url: getAssetUrl('/icons/card/card-actions/meter.png'),
    },
    isActive: true,
  },
  {
    uid: '3',
    cardUid: '1',
    type: CardActionType.ADD_TO_GPAY,
    name: 'Add to GPay',
    icon: {
      url: getAssetUrl('/icons/card/card-actions/gpay.png'),
    },
    isActive: true,
  },
  {
    uid: '4',
    cardUid: '1',
    type: CardActionType.REPLACE,
    name: 'Replace card',
    icon: {
      url: getAssetUrl('/icons/card/card-actions/replace.png'),
    },
    isActive: true,
  },
  {
    uid: '5',
    cardUid: '1',
    type: CardActionType.CANCEL,
    name: 'Cancel card',
    icon: {
      url: getAssetUrl('/icons/card/card-actions/deactivate.png'),
    },
    isActive: true,
  },
];

export const getCardsFakeData: () => UiCard[] = () => [
  {
    uid: 'mkMSzBvWSA77',
    type: CardType.DEBIT,
    cardNumber: '1234 5678 9012 3456',
    expiry: '12/25',
    cardHolderName: 'Mark Henry',
    currency: inrCurrency,
    cardDesign: {
      backgroundColor: '#01D167',
      textColor: 'white',
      logo: {
        url: getAssetUrl('/icons/logo.svg'),
        width: 24,
        height: 23,
        alt: 'Card Logo',
      },
      logoHasName: false,
      networkLogo: getCardNetworkLogo(CardNetwork.VISA)!,
    },
    cvv: '789',
    issuingBank: 'Aspire',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
    actions: fakeCardActions,
  },
  {
    uid: 'omAesPcPttgV',
    type: CardType.DEBIT,
    cardNumber: '1111 5678 9012 3456',
    expiry: '12/26',
    cardHolderName: 'Jane Doe',
    currency: sgdCurrency,
    cardDesign: {
      backgroundColor: '#000000',
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
    actions: fakeCardActions.slice(1),
  },
];
