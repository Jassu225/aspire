import type { CardAction } from 'src/types/db/card';
import { CardActionType } from 'src/types/db/card';

const cardActions: CardAction[] = [
  {
    uid: '1',
    type: CardActionType.FREEZE,
    name: 'Freeze card',
    icon: {
      url: 'http://localhost:9000/icons/card/card-actions/freeze.png',
    },
    isVisible: true,
    isActive: true,
  },
  {
    uid: '2',
    type: CardActionType.SET_SPEND_LIMIT,
    name: 'Set spend limit',
    icon: {
      url: 'http://localhost:9000/icons/card/card-actions/meter.png',
    },
    isVisible: true,
    isActive: true,
  },
  {
    uid: '3',
    type: CardActionType.ADD_TO_GPAY,
    name: 'Add to GPay',
    icon: {
      url: 'http://localhost:9000/icons/card/card-actions/gpay.png',
    },
    isVisible: true,
    isActive: true,
  },
  {
    uid: '4',
    type: CardActionType.REPLACE,
    name: 'Replace card',
    icon: {
      url: 'http://localhost:9000/icons/card/card-actions/replace.png',
    },
    isVisible: true,
    isActive: true,
  },
  {
    uid: '5',
    type: CardActionType.CANCEL,
    name: 'Cancel card',
    icon: {
      url: 'http://localhost:9000/icons/card/card-actions/deactivate.png',
    },
    isVisible: true,
    isActive: true,
  },
];

export default cardActions;
