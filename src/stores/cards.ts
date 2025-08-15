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

  isFetchingCardsInfo: boolean;
  isFetchingSelectedCardTransactions: boolean;
};

const useCardsStore = defineStore('cards-store', {
  state: (): CardsStore => ({
    cardsInfoRequest: null,
    cardsInfoResponse: null,
    selectedCardUid: '',
    isFetchingCardsInfo: false,
    isFetchingSelectedCardTransactions: false,
    selectedCardTransactions: [],
  }),
  getters: {
    selectedCard: (state) =>
      state.cardsInfoResponse?.cards.find((card) => card.uid === state.selectedCardUid) || null,
  },
  actions: {
    async fetchCardsInfo(cardsInfoRequest: FetchCardsInfoRequest, options?: RequestOptions) {
      this.cardsInfoRequest = cardsInfoRequest;
      try {
        this.isFetchingCardsInfo = true;
        const res = await fetchCards(cardsInfoRequest, options);
        this.cardsInfoResponse = res;
        if (res.cards.length > 0) {
          this.selectedCardUid = res.cards[0]!.uid;
        }
      } finally {
        this.isFetchingCardsInfo = false;
      }
    },
    async fetchSelectedCardTransactions(options?: RequestOptions) {
      try {
        this.isFetchingSelectedCardTransactions = true;
        this.selectedCardTransactions = [];
        const res = await fetchCardTransactions({ cardUid: this.selectedCardUid }, options);
        this.selectedCardTransactions = res.transactions || [];
      } finally {
        this.isFetchingSelectedCardTransactions = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCardsStore, import.meta.hot));
}

export default useCardsStore;
