import { CardActionType, type Card, type CardAction, type CardLimit } from 'src/types/db/card';
import type { UiCardLimit } from 'src/types/ui/card';

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

export const toUiCard = (card: Card, actions: CardAction[], limits: CardLimit[]) => {
  return {
    ...card,
    actions: sortCardActions(actions),
    limits: limits.reduce(
      (map, limit) => ({ ...map, [limit.type]: limit.value }),
      {} as UiCardLimit,
    ),
  };
};
