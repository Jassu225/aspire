import type {
  FetchCardsInfoRequest,
  FetchCardsInfoResponse,
  FetchCardTransactionsRequest,
  FetchCardTransactionsResponse,
  SubmitNewCardFormRequest,
} from 'src/types/api/cards';
import { fakeMcDonalsdsMerchant, fakeMerchantUidMap } from './fake-data/card-transactions';
import type { UiCard, UiCardTransaction } from 'src/types/user/card';
import { toUiCard } from 'src/utils/card';
import { generateNewCard } from '../backend/card-generator';
import db, { COLLECTIONS } from './db';
import type { CardAction, Card, CardTransaction } from 'src/types/db/card';

type BaseMock = {
  endpoint: string;
  requestTrap: (req: unknown) => Promise<object>;
};

type MockType<ReqT, ResT> = {
  endpoint: string;
  requestTrap: (req: ReqT) => Promise<ResT>;
};
//

const sleep = () => new Promise((res) => setTimeout(res, 2000));

const cardsMock: MockType<FetchCardsInfoRequest, FetchCardsInfoResponse> = {
  endpoint: '/api/cards',
  requestTrap: async function () {
    await db.ready;
    const [, cards, allCardsActions] = await Promise.all([
      sleep(),
      db.getAllFromCollection(COLLECTIONS.CARDS) as Promise<Card[]>,
      db.getAllFromCollection(COLLECTIONS.CARD_ACTIONS) as Promise<CardAction[]>,
    ]);
    const uiCards: UiCard[] = cards.map((card) => {
      const cardActions = allCardsActions.filter((action) => action.cardUid === card.uid);
      return {
        ...card,
        actions: cardActions,
      };
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
    console.log(`Fetching transactions for ---- `, req.cardUid);
    const [, cardTransactions] = await Promise.all([
      sleep(),
      db.getAllFromCollectionBy(COLLECTIONS.TRANSACTIONS, 'cardUid', req.cardUid) as Promise<
        CardTransaction[]
      >,
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
    await new Promise((res) => setTimeout(res, 2000));
    return toUiCard(generateNewCard(req));
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
