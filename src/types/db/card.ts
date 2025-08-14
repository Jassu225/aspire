import type { ImageResource } from './helpers';

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
  limits?: {
    dailyLimit?: number; // Optional, daily spending limit
    monthlyLimit?: number; // Optional, monthly spending limit
    totalLimit?: number; // Optional, total spending limit, applicable for a credit card
  };
  isVirtual?: boolean; // Optional, if the card is a virtual card
  isCorporate?: boolean; // Optional, if the card is a corporate card
  isInternational?: boolean; // Optional, if the card can be used internationally
  notes?: string; // Optional, any additional notes about the card
  tags?: string[]; // Optional, tags for categorization
  cardDesign?: {
    backgroundColor?: string; // Optional, background color of the card
    textColor?: string; // Optional, text color on the card
    logo?: ImageResource; // Optional, logo on the card / bank logo
    logoHasName?: boolean; // Optional, if the logo has a name
    cardNetworkLogo?: ImageResource; // Optional, card network logo
  };
};

export enum CardActionType {
  FREEZE = 'FREEZE',
  UNFREEZE = 'UNFREEZE',
  SET_SPEND_LIMIT = 'SET_SPEND_LIMIT',
  ADD_TO_GPAY = 'ADD_TO_GPAY',
  REPLACE = 'REPLACE',
  CANCEL = 'CANCEL',
}

export type CardAction = {
  type: CardActionType;
  name: string; // Name of the action
  icon: ImageResource; // Path to the icon for the action
  description?: string; // Optional, description of the action
  isVisible: boolean; // Whether the action is visible in the UI
  isActive: boolean; // Whether the action is currently active
};
