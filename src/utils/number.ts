import { type Amount } from 'src/types/helpers';

export const formatAsCurrency = (value: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatAsCurrencyWithoutSign = (value: number, currency = 'INR'): string => {
  return formatAsCurrency(value, currency).slice(1); // Remove the currency sign
};

export const formatAmount = (amount: Amount): string => {
  const amountStr = amount.value.toString();
  const orginalAmt = `${amountStr.slice(0, -amount.fractionFactor)}.${amountStr.slice(-amount.fractionFactor)}`;
  return formatAsCurrencyWithoutSign(+orginalAmt).replace('.00', '');
};
