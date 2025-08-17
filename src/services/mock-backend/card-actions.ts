import { type CardAction, CardActionType } from 'src/types/db/card';

const cardActionsOrder = [
  CardActionType.FREEZE,
  CardActionType.UNFREEZE,
  CardActionType.SET_SPEND_LIMIT,
  CardActionType.ADD_TO_GPAY,
  CardActionType.REPLACE,
  CardActionType.CANCEL,
];

export const sortCardActions = (cardActions: CardAction[]) => {
  const sortedActions: CardAction[] = [];
  cardActionsOrder.forEach((actionType) => {
    const action = cardActions.find((action) => action.type === actionType);
    if (action) {
      sortedActions.push(action);
    }
  });
  return sortedActions;
};
