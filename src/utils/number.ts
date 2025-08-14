export const formatAsCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatAsCurrencyWithoutSign = (value: number): string => {
  return formatAsCurrency(value).slice(1); // Remove the currency sign
};
