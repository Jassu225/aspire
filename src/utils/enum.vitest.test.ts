import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { CardActionType, CardTransactionType } from 'src/types/db/card';
import { enumToSentence } from './enum';

installQuasarPlugin();

describe('enum utils', () => {
  it('should convert enum to sentence', () => {
    expect(enumToSentence(CardTransactionType.CASHBACK_RECEIVED)).toBe('Cashback received');
    expect(enumToSentence(CardTransactionType.REFUND)).toBe('Refund');
    expect(enumToSentence(CardTransactionType.PAYMENT_RECEIVED)).toBe('Payment received');
    expect(enumToSentence(CardTransactionType.WITHDRAWL)).toBe('Withdrawl');
    expect(enumToSentence(CardTransactionType.CASHBACK_ADJUSTMENT)).toBe('Cashback adjustment');
    expect(enumToSentence(CardActionType.SET_SPEND_LIMIT)).toBe('Set spend limit');
    expect(enumToSentence(CardActionType.ADD_TO_GPAY)).toBe('Add to gpay');
    expect(enumToSentence(CardActionType.REPLACE)).toBe('Replace');
  });
});
