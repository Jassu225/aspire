import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { CardActionType, type Card, type CardAction, type CardLimit } from 'src/types/db/card';
import { describe, expect, it } from 'vitest';
import { sortCardActions, toUiCard } from './utils';

installQuasarPlugin();

describe('mock-backend/utils', () => {
  it('toUiCard', () => {
    expect(toUiCard({} as Card, [] as CardAction[], [] as CardLimit[])).toEqual({
      actions: [],
      limits: {},
    });
    expect(toUiCard({ uid: 'uid-1' } as Card, [] as CardAction[], [] as CardLimit[])).toEqual({
      uid: 'uid-1',
      actions: [],
      limits: {},
    });
  });

  it('sortCardActions', () => {
    expect(sortCardActions([])).toEqual([]);
    expect(sortCardActions([{ type: CardActionType.FREEZE } as CardAction])).toEqual([
      { type: CardActionType.FREEZE },
    ]);
    expect(
      sortCardActions([
        { type: CardActionType.FREEZE } as CardAction,
        { type: CardActionType.UNFREEZE } as CardAction,
        { type: CardActionType.ADD_TO_GPAY } as CardAction,
        { type: CardActionType.SET_SPEND_LIMIT } as CardAction,
        { type: CardActionType.CANCEL } as CardAction,
        { type: CardActionType.REPLACE } as CardAction,
      ]),
    ).toEqual([
      { type: CardActionType.FREEZE },
      { type: CardActionType.UNFREEZE },
      { type: CardActionType.SET_SPEND_LIMIT },
      { type: CardActionType.ADD_TO_GPAY },
      { type: CardActionType.REPLACE },
      { type: CardActionType.CANCEL },
    ]);
  });
});
