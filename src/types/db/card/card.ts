import type { Currency, ImageResource } from 'src/types/helpers';

export enum CardType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum CardNetwork {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DISCOVER = 'DISCOVER',
  RUPAY = 'RUPAY',
  MAESTRO = 'MAESTRO',
}

// DB type
export type Card = {
  uid: string;
  cardNumber: string; // 16 digits
  cardHolderName: string; // 26 characters max
  expiry: string; // Format: 'MM/YY'
  cvv: string;
  type: CardType;
  status: CardStatus;
  createdAt: string; // Timestamp in ISO 8601 format
  issuingBank?: string; // Optional, if the card is issued by a specific bank
  cardNetwork: CardNetwork;
  isVirtual?: boolean; // Optional, if the card is a virtual card
  isCorporate?: boolean; // Optional, if the card is a corporate card
  isInternational?: boolean; // Optional, if the card can be used internationally
  notes?: string; // Optional, any additional notes about the card
  tags?: string[]; // Optional, tags for categorization
  currency: Currency; // currency type of the card
  cardDesign?: {
    backgroundColor?: string; // Optional, background color of the card
    textColor?: string; // Optional, text color on the card
    logo?: ImageResource; // Optional, logo on the card / bank logo
    logoHasName?: boolean; // Optional, if the logo has a name
    networkLogo?: ImageResource; // Optional, card network logo
  };
};
