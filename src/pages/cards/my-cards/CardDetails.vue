<template>
  <CollapsibleView :icon="CardDetailsIcon" title="Card details" class="card-details">
    <q-list v-if="selectedCard !== null">
      <template v-for="(detail, index) in cardDetails" :key="detail.title">
        <q-separator v-if="index > 0" />
        <q-item :data-testid="detail.testId">
          <q-item-section class="title">{{ detail.title }}</q-item-section>
          <q-item-section class="description tw:font-bold">{{ detail.description }}</q-item-section>
        </q-item>
      </template>
    </q-list>
    <span v-else></span>
  </CollapsibleView>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue';
import { storeToRefs } from 'pinia';
import CollapsibleView from 'src/components/CollapsibleView.vue';
import CardDetailsIcon from 'assets/icons/card/details.svg?component';
import useCardsStore from 'src/stores/cards';
import { enumToSentence } from 'src/utils/enum';
import { emptyList } from 'src/utils/empty';
import { formatAsDate } from 'src/utils/date';
import { splitCardNumber } from 'src/utils/card';
import { formatAsCurrency, getCurrencySign } from 'src/utils/number';
import { cardsPage } from 'src/constants/tests/locators/cards-page';

type Detail = { title: string; description: string; testId: string };

const cardsStore = useCardsStore();
const { selectedCard } = storeToRefs(cardsStore);

const cardDetails = computed<Detail[]>(() => {
  const card = toValue(selectedCard);
  if (card === null) return emptyList as unknown as Detail[];
  return [
    {
      title: 'Type',
      description: enumToSentence(card.type),
      testId: cardsPage.cardDetail.cardType,
    },
    {
      title: 'Network',
      description: enumToSentence(card.cardNetwork),
      testId: cardsPage.cardDetail.cardNetwork,
    },
    {
      title: 'Card number',
      description: splitCardNumber(card.cardNumber).join(' '),
      testId: cardsPage.cardDetail.cardNumber,
    },
    {
      title: 'Expiry',
      description: card.expiry,
      testId: cardsPage.cardDetail.cardExpiry,
    },
    {
      title: 'CVV',
      description: card.cvv,
      testId: cardsPage.cardDetail.cardCvv,
    },
    {
      title: 'Card holder name',
      description: card.cardHolderName,
      testId: cardsPage.cardDetail.cardHolderName,
    },
    {
      title: 'Currency',
      description: `${getCurrencySign(card.currency)} (${card.currency.type})`,
      testId: cardsPage.cardDetail.cardCurrency,
    },
    {
      title: 'Per transaction limit',
      description: formatAsCurrency(card.limits.TRANSACTION_LIMIT, card.currency),
      testId: cardsPage.cardDetail.cardPerTransactionLimit,
    },
    {
      title: 'Daily limit',
      description: formatAsCurrency(card.limits.DAILY_LIMIT, card.currency),
      testId: cardsPage.cardDetail.cardDailyLimit,
    },
    {
      title: 'Monthly limit',
      description: formatAsCurrency(card.limits.MONTHLY_LIMIT, card.currency),
      testId: cardsPage.cardDetail.cardMonthlyLimit,
    },
    {
      title: 'Total limit',
      description: formatAsCurrency(card.limits.TOTAL_LIMIT, card.currency),
      testId: cardsPage.cardDetail.cardTotalLimit,
    },
    {
      title: 'Usable limit',
      description: formatAsCurrency(card.limits.USABLE_LIMIT, card.currency),
      testId: cardsPage.cardDetail.cardUsableLimit,
    },
    {
      title: 'Issued by',
      description: enumToSentence(card.issuingBank || '-'),
      testId: cardsPage.cardDetail.cardIssuingBank,
    },
    {
      title: 'Isued on',
      description: formatAsDate(card.createdAt),
      testId: cardsPage.cardDetail.cardIssuedOn,
    },
  ];
});
</script>

<style lang="scss" scoped>
.card-details {
  .title {
    color: $text-secondary;
  }
}
</style>
