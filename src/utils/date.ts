const getShortMonth = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(date);

export const formatAsDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, '0')} ${getShortMonth(date)} ${date.getFullYear()}`;
};
