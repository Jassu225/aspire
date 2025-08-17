import { type Currency } from 'src/types/helpers';

export const LOCALE = 'en-IN';

export const formatAsCurrency = (value: number, currency = 'INR'): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
};

const _getInternalCurrencySign = (currency = 'INR') =>
  formatAsCurrency(0, currency).slice(0, -1).trimEnd();

export const getCurrencySign = (currency: Currency) => {
  return currency.sign || _getInternalCurrencySign(currency.type);
};

export const formatAsCurrencyWithoutSign = (value: number, currency = 'INR'): string => {
  const sign = _getInternalCurrencySign(currency);
  return formatAsCurrency(value, currency).slice(sign.length); // Remove the currency sign
};

export const formatAmount = (amount: number, currency: Currency): string => {
  const amountStr = amount.toString();
  const orginalAmt = `${amountStr.slice(0, -currency.fractionFactor)}.${amountStr.slice(-currency.fractionFactor)}`;
  return formatAsCurrencyWithoutSign(+orginalAmt).replace('.00', '');
};
