import { capitalizeSentence } from './text';

export const enumToSentence = (enumVal: string) => capitalizeSentence(enumVal.split('_').join(' '));
