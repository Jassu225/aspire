import { CardNetwork, CardStatus, CardType } from 'src/types/db/card';
import type { UiCard } from 'src/types/user/card';

export const cardsFakeData: UiCard[] = [
  {
    uid: '1',
    type: CardType.DEBIT,
    cardNumber: '1234 5678 9012 3456',
    expiry: '12/25',
    cardHolderName: 'Mark Henry',
    cardDesign: {
      backgroundColor: '#01D167',
      textColor: 'white',
      logo: {
        url: 'http://localhost:9000/icons/logo.svg',
        width: 24,
        height: 23,
        alt: 'Card Logo',
      },
      logoHasName: false,
      cardNetworkLogo: {
        url: 'https://example.com/logo.png',
        width: 50,
        height: 50,
        alt: 'Card Logo',
      },
    },
    cvv: '789',
    issuingBank: 'Aspire',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
    actions: [],
  },
  {
    uid: '2',
    type: CardType.DEBIT,
    cardNumber: '1111 5678 9012 3456',
    expiry: '12/26',
    cardHolderName: 'Jane Doe',
    cardDesign: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      logo: {
        url: 'http://localhost:9000/icons/logo-with-name.svg',
        width: 85,
        height: 24,
        alt: 'Card Logo with Name',
      },
      logoHasName: true,
      cardNetworkLogo: {
        url: 'https://example.com/logo.png',
        width: 50,
        height: 50,
        alt: 'Card Logo',
      },
    },
    cvv: '012',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
    actions: [],
  },
];
