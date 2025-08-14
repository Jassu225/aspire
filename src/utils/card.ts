export const splitCardNumber = (cardNumber: string): string[] => {
  // Split the card number into groups of 4 digits
  const groups: string[] = [];
  const sanitizedCardNumber = cardNumber.split('').filter((c) => c >= '0' && c <= '9'); // Remove non-digit characters
  for (let i = 0; i < sanitizedCardNumber.length; i += 4) {
    groups.push(sanitizedCardNumber.slice(i, i + 4).join(''));
  }
  return groups;
};
