import type { ImageResource } from 'src/types/helpers';

export enum CardActionType {
  FREEZE = 'FREEZE',
  UNFREEZE = 'UNFREEZE',
  SET_SPEND_LIMIT = 'SET_SPEND_LIMIT',
  ADD_TO_GPAY = 'ADD_TO_GPAY',
  REPLACE = 'REPLACE',
  CANCEL = 'CANCEL',
}

// DB type
export type CardAction = {
  uid: string;
  cardUid: string;
  type: CardActionType;
  name: string; // Name of the action
  icon: ImageResource; // Path to the icon for the action
  description?: string; // Optional, description of the action
  isActive: boolean; // Whether the action is currently active
};
