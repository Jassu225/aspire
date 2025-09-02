import { CardsInfoType } from 'src/types/ui/card';

export const cardsPage = {
  availableBalanceContainer: {
    id: 'available-balance-container',
    label: 'available-balance-label',
    amount: {
      sign: 'available-balance-amount-sign',
      value: 'available-balance-amount-value',
    },
  },
  newCardButton: {
    id: 'new-card-button',
  },
  newCardForm: {
    id: 'new-card-form',
    nameOnCardInput: 'name-on-card-input',
    cardTypeSelect: 'card-type-select',
    cardNetworkSelect: 'card-network-select',
    validityInYearsSelect: 'validity-in-years-select',
    submitButton: 'submit-button',
    cancelButton: 'cancel-button',
  },
  tabs: {
    [CardsInfoType.ALL]: 'all-cards-tab',
    [CardsInfoType.OWN]: 'own-cards-tab',
  },
  cardsCarousel: {
    cardsContainer: 'cards-carousel',
    cardViewContainer: 'card-view',
    cardNavigationButton: 'card-navigation-btn',
    card: {
      cardType: 'card-type',
      bankLogo: 'bank-logo',
      issuingBank: 'issuing-bank',
      cardHolderName: 'card-holder-name',
      cardNumberContainer: 'card-number-container',
      expiryContainer: 'expiry-container',
      cvvContainer: 'cvv-container',
      visibilityButton: 'visibility-btn',
      networkLogoContainer: 'network-logo-container',
    },
  },
  cardDetail: {
    cardType: 'card-detail-card-type',
    cardNetwork: 'card-detail-card-network',
    cardNumber: 'card-detail-card-number',
    cardExpiry: 'card-detail-card-expiry',
    cardCvv: 'card-detail-card-cvv',
    cardHolderName: 'card-detail-card-holder-name',
    cardId: 'card-detail-card-id',
    cardCurrency: 'card-detail-card-currency',
    cardPerTransactionLimit: 'card-detail-card-per-transaction-limit',
    cardDailyLimit: 'card-detail-card-daily-limit',
    cardMonthlyLimit: 'card-detail-card-monthly-limit',
    cardTotalLimit: 'card-detail-card-total-limit',
    cardUsableLimit: 'card-detail-card-usable-limit',
    cardIssuingBank: 'card-detail-card-issuing-bank',
    cardIssuedOn: 'card-detail-card-issued-on',
  },
  cardAction: {
    cardActionContainer: 'card-action-container',
  },
  cardTransaction: {
    cardTransactionItem: 'card-transaction-item',
    cardTransactionAmountSign: 'card-transaction-amount-sign',
    cardTransactionAmountCurrency: 'card-transaction-amount-currency',
    cardTransactionAmountValue: 'card-transaction-amount-value',
    cardTransactionDate: 'card-transaction-date',
    cardTransactionDescription: 'card-transaction-description',
  },
};
