import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { formatAsCurrency, formatAsCurrencyWithoutSign, getCurrencySign } from './number';

installQuasarPlugin();

describe('number utils', () => {
  const inrCurrency = { type: 'INR', fractionFactor: 2 };
  const usdCurrency = { type: 'USD', fractionFactor: 2 };
  const sgdCurrency = { type: 'SGD', sign: 'S$', fractionFactor: 2 };

  it('getCurrencySign', () => {
    expect(getCurrencySign(inrCurrency)).toBe('₹');
    expect(getCurrencySign(usdCurrency)).toBe('$');
    expect(getCurrencySign({ type: 'EUR', fractionFactor: 2 })).toBe('€');
    expect(getCurrencySign({ type: 'GBP', fractionFactor: 2 })).toBe('£');
    expect(getCurrencySign({ type: 'AUD', fractionFactor: 2 })).toBe('A$');
    expect(getCurrencySign({ type: 'CAD', fractionFactor: 2 })).toBe('CA$');
    expect(getCurrencySign({ type: 'CHF', fractionFactor: 2 })).toBe('CHF');

    expect(getCurrencySign({ type: 'SGD', fractionFactor: 2 })).toBe('SGD');
    expect(getCurrencySign(sgdCurrency)).toBe('S$');
  });

  it('formatAsCurrencyWithoutSign', () => {
    expect(formatAsCurrencyWithoutSign(100000, inrCurrency)).toBe('1,000');
    expect(formatAsCurrencyWithoutSign(1000000, usdCurrency)).toBe('10,000');
    expect(formatAsCurrencyWithoutSign(10000000, sgdCurrency)).toBe('1,00,000');

    expect(formatAsCurrencyWithoutSign(100000.12, inrCurrency)).toBe('NaN');
  });

  it('formatAsCurrency', () => {
    expect(formatAsCurrency(100000, inrCurrency)).toBe('₹ 1,000');
    expect(formatAsCurrency(1000000, usdCurrency)).toBe('$ 10,000');
    expect(formatAsCurrency(10000000, sgdCurrency)).toBe('S$ 1,00,000');

    expect(formatAsCurrency(100000.12, inrCurrency)).toBe('₹ NaN');
  });
});
