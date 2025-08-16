export const capitalizeSentence = (sentence: string) => {
  const s = sentence.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const enumToSentence = (enumVal: string) => capitalizeSentence(enumVal.split('_').join(' '));
