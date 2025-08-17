import { type SubmitNewCardFormRequest } from 'src/types/api/cards';
import { type Card, CardNetwork, CardStatus, CardType } from 'src/types/db/card';
import { CARD_VALIDITY_RANGE_IN_YEARS, getCardNetworkLogo } from 'src/utils/card';
import { nameRule } from 'src/utils/form';
import { nanoid } from 'nanoid';
import { enumToSentence } from 'src/utils/enum';
import { inrCurrency, sgdCurrency } from '../mockery/fake-data/cards';
import { getAssetUrl } from 'src/utils/url';

export const ISSUING_BANK = 'Axis';
const CREDIT_BINS = {
  [CardNetwork.VISA]: '405995', // business, https://bintable.com/bin/405995
  [CardNetwork.MASTERCARD]: '550343', // executive, https://bintable.com/bin/550343
};

const DEBIT_BINS = {
  [CardNetwork.VISA]: '417405', // platinum, https://bintable.com/bin/417405
  [CardNetwork.RUPAY]: '652236', // platinum, https://bintable.com/bin/652236
  [CardNetwork.MASTERCARD]: '557654', // business, https://bintable.com/bin/557654
};

// ------------- AI GENERATED BEGIN ---------------------------- //
// Luhn algorithm to calculate check digit
const calculateLuhnCheckDigit = (cardNumber: string): string => {
  const digits = cardNumber.split('').map(Number);
  let sum = 0;

  // Process digits from right to left, excluding the check digit position
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]!;

    // Double every second digit from right
    if ((digits.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = digit - 9;
      }
    }

    sum += digit;
  }

  // Check digit makes the total sum divisible by 10
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
};

// Generate random digits
const generateRandomDigits = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
};

export const generateCardNumber = (cardType: CardType, cardNetwork: CardNetwork): string => {
  // Get the appropriate BIN based on card type and network
  const bins = (cardType === CardType.CREDIT ? CREDIT_BINS : DEBIT_BINS) as Record<
    CardNetwork,
    string
  >;
  const bin = bins[cardNetwork] || null;

  if (!bin) {
    throw new Error(
      `${enumToSentence(cardNetwork)} for ${enumToSentence(cardType)} is not yet supported. Available networks: ${Object.keys(bins).map(enumToSentence).join(', ')}`,
    );
  }

  // All our BINs are for 16-digit cards, so we need 9 more random digits + 1 check digit
  const remainingLength = 16 - bin.length - 1; // -1 for check digit

  // Generate the card number without check digit
  const cardNumberWithoutCheck = bin + generateRandomDigits(remainingLength);

  // Calculate and append check digit
  const checkDigit = calculateLuhnCheckDigit(cardNumberWithoutCheck);
  const fullCardNumber = cardNumberWithoutCheck + checkDigit;

  return fullCardNumber;
};

// Helper function to format card number with spaces
export const formatCardNumber = (cardNumber: string): string => {
  // Remove any existing spaces
  const cleaned = cardNumber.replace(/\s/g, '');

  // Format based on card length
  if (cleaned.length === 15) {
    // AMEX format: 4-6-5
    return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Standard format: 4-4-4-4
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  }
};

// Helper function to validate if a card number is valid using Luhn algorithm
export const isValidCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  const digits = cleaned.split('').map(Number);
  let sum = 0;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]!;

    if ((digits.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = digit - 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
};
// ------------- AI GENERATED END ---------------------------- //

export const generateCvv = () => generateRandomDigits(3);
export const getExpiry = (years: number) => {
  const date = new Date();
  const expiryYear = date.getFullYear() + years;
  const month = date.getMonth() + 1;
  return `${month.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`;
};

const validateNewCardRequest = (cardRequest: SubmitNewCardFormRequest) => {
  if (!Object.values(CardType).includes(cardRequest.type)) {
    throw new Error(`Invalid card type ${cardRequest.type}.`);
  }
  if (!Object.values(CardType).includes(cardRequest.type)) {
    throw new Error(`Invalid card type ${cardRequest.type}.`);
  }
  const successOrMsg = nameRule()(cardRequest.name);
  if (successOrMsg !== true) {
    throw new Error(`${successOrMsg} in name.`);
  }
  if (!CARD_VALIDITY_RANGE_IN_YEARS.includes(cardRequest.validityInYears)) {
    throw new Error(`Invalid valildity ${cardRequest.validityInYears}`);
  }
};

export const cardColors = [
  {
    backgroundColor: '#01D167',
    textColor: 'black',
  },
  {
    backgroundColor: '#536DFF',
    textColor: 'black',
  },
  // {
  //   backgroundColor: '#222222',
  //   textColor: 'white',
  // },
];

export const generateNewCard = (cardRequest: SubmitNewCardFormRequest) => {
  validateNewCardRequest(cardRequest);
  const colors = cardColors[Math.floor(Math.random() * cardColors.length)]!;
  const newCard: Card = {
    uid: nanoid(12),
    cardNumber: generateCardNumber(cardRequest.type, cardRequest.network),
    cardHolderName: cardRequest.name,
    expiry: getExpiry(cardRequest.validityInYears),
    cvv: generateCvv(),
    type: cardRequest.type,
    status: CardStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    cardNetwork: cardRequest.network,
    issuingBank: ISSUING_BANK,
    currency: Math.random() < 0.5 ? inrCurrency : sgdCurrency,
    cardDesign: {
      backgroundColor: colors.backgroundColor,
      textColor: colors.textColor,
      networkLogo: getCardNetworkLogo(cardRequest.network)!,
      logo: {
        url: getAssetUrl('/icons/card/banks/axis-bank.png'),
        width: 114.3,
        height: 31,
        alt: 'Axis bank logo',
      },
      logoHasName: true,
    },
  };
  return newCard;
};
