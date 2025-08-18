import type {
  FetchCardsInfoRequest,
  FetchCardsInfoResponse,
  FetchCardTransactionsRequest,
  FetchCardTransactionsResponse,
  SubmitNewCardFormRequest,
} from 'src/types/api/cards';
import { fakeMcDonalsdsMerchant, fakeMerchantUidMap } from '../mockery/fake-data/card-transactions';
import type { UiCard, UiCardTransaction } from 'src/types/ui/card';
import { generateNewCard } from './card-generator';
import db, { COLLECTIONS } from '../mock-db/db';
import { type CardAction, type Card, type CardTransaction } from 'src/types/db/card';
import getFakeCardLimits from '../mockery/fake-data/card-limits';
import { getFakeCardActions } from '../mockery/fake-data/cards';
import type { CardLimit } from 'src/types/db/card/card-limits';
import { toUiCard } from './utils';

type BaseMock = {
  endpoint: string;
  requestTrap: (req: unknown) => Promise<object>;
};

type MockType<ReqT, ResT> = {
  endpoint: string;
  requestTrap: (req: ReqT) => Promise<ResT>;
};
//

const sleep = (time = 2000) => new Promise((res) => setTimeout(res, time));

const cardsMock: MockType<FetchCardsInfoRequest, FetchCardsInfoResponse> = {
  endpoint: '/api/cards',
  requestTrap: async function () {
    await db.ready;
    const [, cards, allCardsActions, allCardsLimits] = await Promise.all([
      sleep(),
      db.getAllFromCollectionWithSort(COLLECTIONS.CARDS, 'createdAt') as Promise<Card[]>,
      db.getAllFromCollection(COLLECTIONS.CARD_ACTIONS) as Promise<CardAction[]>,
      db.getAllFromCollection(COLLECTIONS.CARD_LIMITS) as Promise<CardLimit[]>,
    ]);
    const uiCards: UiCard[] = cards.map((card) => {
      const cardActions = allCardsActions.filter((action) => action.cardUid === card.uid);
      const cardLimits = allCardsLimits.filter((limit) => limit.cardUid === card.uid);
      return toUiCard(card, cardActions, cardLimits);
    });
    return {
      cards: uiCards,
    };
  },
};

const cardTrasactionsMock: MockType<FetchCardTransactionsRequest, FetchCardTransactionsResponse> = {
  endpoint: '/api/cards/transactions',
  requestTrap: async function (req) {
    await db.ready;
    const [, cardTransactions] = await Promise.all([
      sleep(),
      db.getAllFromCollectionWithFilterAndSort(
        COLLECTIONS.TRANSACTIONS,
        {
          cardUid: req.cardUid,
        },
        'createdAt',
        'DESC',
      ) as Promise<CardTransaction[]>,
    ]);
    const uiTransactions: UiCardTransaction[] = cardTransactions.map((transaction) => ({
      ...transaction,
      merchantUid: undefined,
      merchant: fakeMerchantUidMap[transaction.merchantUid] || fakeMcDonalsdsMerchant,
    }));
    return {
      transactions: uiTransactions,
    };
  },
};

const createNewCardMock: MockType<SubmitNewCardFormRequest, UiCard> = {
  endpoint: '/api/cards/create',
  requestTrap: async function (req) {
    await db.ready;
    const newCard = generateNewCard(req);
    const cardLimits = getFakeCardLimits(newCard.uid, 120_000_00);
    const cardActions = getFakeCardActions(newCard.uid);
    await Promise.all([sleep(900), db.addToCollection(COLLECTIONS.CARDS, newCard)]);
    await Promise.all([
      db.addToCollection(COLLECTIONS.CARD_LIMITS, cardLimits),
      // db.addToCollection(COLLECTIONS.TRANSACTIONS, getFakeCardTransactions(newCard.uid)),
      db.addToCollection(COLLECTIONS.CARD_ACTIONS, cardActions),
    ]);

    return toUiCard(newCard, cardActions, cardLimits);
  },
};

const mocks = [cardsMock, cardTrasactionsMock, createNewCardMock] as BaseMock[];

export const findMockAndExec = (endpointUrl: string, req: unknown): Promise<object> | null => {
  for (const mock of mocks) {
    if (endpointUrl.endsWith(mock.endpoint)) {
      console.log(`Mocking --- ${endpointUrl}`);
      return mock.requestTrap(req);
    }
  }
  return null;
};
