import type {
  FetchCardsInfoRequest,
  FetchCardsInfoResponse,
  FetchCardTransactionsRequest,
  FetchCardTransactionsResponse,
} from 'src/types/api/cards';
import { cardsFakeData } from './fake-data/cards';
import fakeCardTransactions from './fake-data/card-transactions';

type BaseMock = {
  endpoint: string;
  requestTrap: (req: unknown) => Promise<object>;
};

type MockType<ReqT, ResT> = {
  endpoint: string;
  requestTrap: (req: ReqT) => Promise<ResT>;
};
//

const cardsMock: MockType<FetchCardsInfoRequest, FetchCardsInfoResponse> = {
  endpoint: '/api/cards',
  requestTrap: async function () {
    await new Promise((res) => setTimeout(res, 2000));
    return {
      cards: cardsFakeData,
    };
  },
};

const cardTrasactionsMock: MockType<FetchCardTransactionsRequest, FetchCardTransactionsResponse> = {
  endpoint: '/api/cards/transactions',
  requestTrap: async function () {
    await new Promise((res) => setTimeout(res, 2000));
    return {
      transactions: fakeCardTransactions,
    };
  },
};

const mocks: BaseMock[] = [cardsMock as BaseMock, cardTrasactionsMock as BaseMock];

export const findMockAndExec = (endpointUrl: string, req: unknown): Promise<object> | null => {
  for (const mock of mocks) {
    if (endpointUrl.endsWith(mock.endpoint)) {
      console.log(`Mocking --- ${endpointUrl}`);
      return mock.requestTrap(req);
    }
  }
  return null;
};
