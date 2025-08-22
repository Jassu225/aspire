import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { type SubmitNewCardFormRequest } from 'src/types/api/cards';
import { generateNewCard, getExpiry, isValidCardNumber } from './card-generator';
import { CardNetwork, CardStatus, CardType } from 'src/types/db/card';
import { CARD_VALIDITY_RANGE_IN_YEARS } from 'src/utils/card';

installQuasarPlugin();

const getInvalidCardValidity = () => {
  let randomValidity = 5;
  for (const validity of CARD_VALIDITY_RANGE_IN_YEARS) {
    if (CARD_VALIDITY_RANGE_IN_YEARS.includes(randomValidity)) {
      randomValidity = validity + 1;
    } else {
      return randomValidity;
    }
  }
  return randomValidity;
};

describe('mock-backend/card-generator', () => {
  it('generateNewCard', () => {
    {
      expect(() => generateNewCard({} as SubmitNewCardFormRequest)).toThrow('Invalid card type');
      expect(() =>
        generateNewCard({
          type: CardType.CREDIT,
        } as SubmitNewCardFormRequest),
      ).toThrow('Invalid card network');
      expect(() =>
        generateNewCard({
          type: CardType.DEBIT,
          network: CardNetwork.VISA,
        } as SubmitNewCardFormRequest),
      ).toThrow('Name is required.');
      expect(() =>
        generateNewCard({
          type: CardType.DEBIT,
          network: CardNetwork.VISA,
          name: '  ',
        } as SubmitNewCardFormRequest),
      ).toThrow('Name is required.');
      expect(() =>
        generateNewCard({
          type: CardType.DEBIT,
          network: CardNetwork.VISA,
          name: 'Jassu 1',
        } as SubmitNewCardFormRequest),
      ).toThrow('Only letters and spaces are allowed in name.');
      expect(() =>
        generateNewCard({
          type: CardType.DEBIT,
          network: CardNetwork.VISA,
          name: 'John Doe',
        } as SubmitNewCardFormRequest),
      ).toThrow('Invalid valildity');
      expect(() =>
        generateNewCard({
          type: CardType.DEBIT,
          network: CardNetwork.VISA,
          name: 'John Doe',
          validityInYears: getInvalidCardValidity(),
        } as SubmitNewCardFormRequest),
      ).toThrow('Invalid valildity');

      const newCard = generateNewCard({
        type: CardType.DEBIT,
        network: CardNetwork.VISA,
        name: 'John Doe',
        validityInYears: 2,
      } as SubmitNewCardFormRequest);
      expect(newCard).toBeDefined();

      expect(newCard.uid).toBeTypeOf('string');
      expect(newCard.uid).toHaveLength(12);

      expect(newCard.cardNumber).toBeTypeOf('string');
      expect(newCard.cardNumber).toMatch(/^\d{16}$/);
      expect(newCard.cardHolderName).toBeTypeOf('string');
      expect(newCard.expiry).toBeTypeOf('string');
      expect(newCard.cvv).toBeTypeOf('string');
      expect(newCard.cvv).toMatch(/^\d{3}$/);
      expect(newCard.type).toBe(CardType.DEBIT);
      expect(newCard.cardNetwork).toBe(CardNetwork.VISA);
      expect(newCard.status).toBe(CardStatus.ACTIVE);
      expect(newCard.createdAt).toBeTypeOf('string');
      expect(newCard.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(newCard.cardDesign).toBeDefined();
      expect(newCard.currency).toBeTypeOf('object');
    }
  });

  it('isValidCardNumber', () => {
    const newCard = generateNewCard({
      type: CardType.DEBIT,
      network: CardNetwork.VISA,
      name: 'John Doe',
      validityInYears: 2,
    } as SubmitNewCardFormRequest);
    expect(isValidCardNumber(newCard.cardNumber)).toBe(true);
    expect(isValidCardNumber('12345678901234567')).toBe(false);
    expect(isValidCardNumber('123456789012345678')).toBe(false);
    expect(isValidCardNumber('1234567890123456789')).toBe(false);
    expect(isValidCardNumber('12345678901234567890')).toBe(false);
  });

  it('getExpiry', () => {
    expect(getExpiry(2)).toBeTypeOf('string');
    expect(getExpiry(3)).toMatch(/^\d{2}\/\d{2}$/);
    expect(getExpiry(5)).toMatch(/^\d{2}\/\d{2}$/);
  });
});
