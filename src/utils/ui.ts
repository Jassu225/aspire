export const toPx = (value?: number) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};
