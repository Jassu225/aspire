import { type Amount } from 'src/types/helpers';

export const LOCALE = 'en-IN';

export const formatAsCurrency = (value: number, currency = 'INR'): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
};

export const getCurrencySign = (currency = 'INR') =>
  formatAsCurrency(0, currency).slice(0, -1).trimEnd();

export const formatAsCurrencyWithoutSign = (value: number, currency = 'INR'): string => {
  const sign = getCurrencySign(currency);
  return formatAsCurrency(value, currency).slice(sign.length); // Remove the currency sign
};

export const formatAmount = (amount: Amount): string => {
  const amountStr = amount.value.toString();
  const orginalAmt = `${amountStr.slice(0, -amount.fractionFactor)}.${amountStr.slice(-amount.fractionFactor)}`;
  return formatAsCurrencyWithoutSign(+orginalAmt).replace('.00', '');
};
