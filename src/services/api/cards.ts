import type {
  FetchCardsInfoRequest,
  FetchCardsInfoResponse,
  FetchCardTransactionsRequest,
  FetchCardTransactionsResponse,
} from 'src/types/api/cards';
// import type { CardsInfoType } from 'src/types/user/card';

const API_BASE_URL = process.env.API_BASE_URL || window.origin;

export type RequestOptions = {
  signal?: RequestInit['signal'];
};

async function makeApiCall<ReqT, ResT>({
  endpoint,
  method = 'GET',
  data,
  options = { signal: null },
}: {
  endpoint: string;
  method?: RequestInit['method'];
  data?: ReqT;
  options?: RequestOptions | undefined;
}): Promise<ResT> {
  const url = new URL(API_BASE_URL);
  url.pathname = endpoint;
  try {
    const requestOptions: RequestInit = {
      method,
      signal: options.signal || null,
    };
    if (typeof data === 'object') {
      requestOptions.body = JSON.stringify(data);
      requestOptions.headers = {
        'Content-Type': 'application/json',
      };
    }
    const res = await fetch(url.href, requestOptions);
    if (res.status === 200) return res.json() as ResT;
    else {
      throw new Error(`${res.status} - ${res.statusText}`);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const fetchCards = (req: FetchCardsInfoRequest, options?: RequestOptions) => {
  return makeApiCall<FetchCardsInfoRequest, FetchCardsInfoResponse>({
    endpoint: '/api/cards',
    data: req,
    options,
  });
};

export const fetchCardTransactions = (
  req: FetchCardTransactionsRequest,
  options?: RequestOptions,
) => {
  return makeApiCall<FetchCardTransactionsRequest, FetchCardTransactionsResponse>({
    endpoint: '/api/cards/transactions',
    data: req,
    options,
  });
};
