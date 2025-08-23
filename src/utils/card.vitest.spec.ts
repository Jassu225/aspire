import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { CardTransactionType, CardType } from 'src/types/db/card';
import { CashFlow, getCashFlow, getTransactionCaption, splitCardNumber } from './card';

installQuasarPlugin();

describe('card utils', () => {
  it('should split card number', () => {
    expect(splitCardNumber('1234567890')).toEqual(['1234', '5678', '90']);
    expect(splitCardNumber('1234567890123456')).toEqual(['1234', '5678', '9012', '3456']);
    expect(splitCardNumber('12345678901234567890')).toEqual([
      '1234',
      '5678',
      '9012',
      '3456',
      '7890',
    ]);
  });

  it('should get cash flow', () => {
    expect(getCashFlow(CardTransactionType.CASHBACK_ADJUSTMENT)).toBe(CashFlow.OUTWARDS);
    expect(getCashFlow(CardTransactionType.FEE)).toBe(CashFlow.OUTWARDS);
    expect(getCashFlow(CardTransactionType.PURCHASE)).toBe(CashFlow.OUTWARDS);
    expect(getCashFlow(CardTransactionType.WITHDRAWL)).toBe(CashFlow.OUTWARDS);

    expect(getCashFlow(CardTransactionType.DEPOSIT)).toBe(CashFlow.INWARDS);
    expect(getCashFlow(CardTransactionType.CASHBACK_RECEIVED)).toBe(CashFlow.INWARDS);
    expect(getCashFlow(CardTransactionType.REFUND)).toBe(CashFlow.INWARDS);
    expect(getCashFlow(CardTransactionType.PAYMENT_RECEIVED)).toBe(CashFlow.INWARDS);
  });

  it('should get transaction caption', () => {
    expect(getTransactionCaption(CardTransactionType.CASHBACK_RECEIVED, CardType.DEBIT)).toBe(
      'Cashback received on the debit card',
    );
    expect(getTransactionCaption(CardTransactionType.REFUND, CardType.DEBIT)).toBe(
      'Refund on the debit card',
    );
    expect(getTransactionCaption(CardTransactionType.PAYMENT_RECEIVED, CardType.DEBIT)).toBe(
      'Payment received on the debit card',
    );
    expect(getTransactionCaption(CardTransactionType.WITHDRAWL, CardType.DEBIT)).toBe(
      'Withdrawl on the debit card',
    );

    expect(getTransactionCaption(CardTransactionType.CASHBACK_ADJUSTMENT, CardType.DEBIT)).toBe(
      'Cashback adjustment to the debit card',
    );
    expect(getTransactionCaption(CardTransactionType.DEPOSIT, CardType.CREDIT)).toBe(
      'Deposit to the credit card',
    );

    expect(getTransactionCaption(CardTransactionType.FEE, CardType.DEBIT)).toBe(
      'Charged to the debit card',
    );
    expect(getTransactionCaption(CardTransactionType.PURCHASE, CardType.CREDIT)).toBe(
      'Charged to the credit card',
    );
  });
});
