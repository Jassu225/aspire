import { defineStore, acceptHMRUpdate } from 'pinia';
import { fetchCards, fetchCardTransactions, type RequestOptions } from 'src/services/api/cards';
import type {
  FetchCardsInfoRequest,
  FetchCardsInfoResponse,
  FetchCardTransactionsResponse,
} from 'src/types/api/cards';

type CardsStore = {
  cardsInfoRequest: FetchCardsInfoRequest | null;
  cardsInfoResponse: FetchCardsInfoResponse | null;
  selectedCardUid: string;
  selectedCardTransactions: FetchCardTransactionsResponse['transactions'];

  fetchingCardsApiCallCount: number;
  fetchingSelectedCardTransactionsApiCallCount: number;
};

const useCardsStore = defineStore('cards-store', {
  state: (): CardsStore => ({
    cardsInfoRequest: null,
    cardsInfoResponse: null,
    selectedCardUid: '',
    fetchingCardsApiCallCount: 0,
    fetchingSelectedCardTransactionsApiCallCount: 0,
    selectedCardTransactions: [],
  }),
  getters: {
    selectedCard: (state) =>
      state.cardsInfoResponse?.cards.find((card) => card.uid === state.selectedCardUid) || null,
    isFetchingCardsInfo: (state) => state.fetchingCardsApiCallCount > 0,
    isFetchingSelectedCardTransactions: (state) =>
      state.fetchingSelectedCardTransactionsApiCallCount > 0,
  },
  actions: {
    async fetchCardsInfo(cardsInfoRequest: FetchCardsInfoRequest, options?: RequestOptions) {
      this.cardsInfoRequest = cardsInfoRequest;
      try {
        ++this.fetchingCardsApiCallCount;
        const res = await fetchCards(cardsInfoRequest, options);
        this.cardsInfoResponse = res;
        if (res.cards.length > 0) {
          this.selectedCardUid = res.cards[0]!.uid;
        }
      } finally {
        --this.fetchingCardsApiCallCount;
      }
    },
    async fetchSelectedCardTransactions(options?: RequestOptions) {
      try {
        ++this.fetchingSelectedCardTransactionsApiCallCount;
        this.selectedCardTransactions = [];
        const res = await fetchCardTransactions({ cardUid: this.selectedCardUid }, options);
        this.selectedCardTransactions = res.transactions || [];
      } finally {
        --this.fetchingSelectedCardTransactionsApiCallCount;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCardsStore, import.meta.hot));
}

export default useCardsStore;
