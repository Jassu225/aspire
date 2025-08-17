export const capitalizeSentence = (sentence: string) => {
  const s = sentence.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
