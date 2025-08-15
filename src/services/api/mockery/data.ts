import type { FetchCardsInfoRequest, FetchCardsInfoResponse } from 'src/types/api/cards';
import { cardsFakeData } from './fake-data/cards';

type MockType<ReqT, ResT> = {
  endpoint: string;
  requestTrap: (req: ReqT) => Promise<ResT>;
};

const cardsMock: MockType<FetchCardsInfoRequest, FetchCardsInfoResponse> = {
  endpoint: '/api/cards',
  requestTrap: async function () {
    await new Promise((res) => setTimeout(res, 2000));
    return {
      cards: cardsFakeData,
    };
  },
};

const mocks = [cardsMock];

export const findMockAndExec = (endpointUrl: string, req: unknown): Promise<object> | null => {
  for (const mock of mocks) {
    if (endpointUrl.endsWith(mock.endpoint)) {
      console.log(`Mocking --- ${endpointUrl}`);
      return mock.requestTrap(req as Parameters<typeof mock.requestTrap>[0]);
    }
  }
  return null;
};
