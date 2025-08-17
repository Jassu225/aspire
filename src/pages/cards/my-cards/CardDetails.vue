<template>
  <CollapsibleView :icon="CardDetailsIcon" title="Card details" class="card-details">
    <q-list v-if="selectedCard !== null">
      <template v-for="(detail, index) in cardDetails" :key="detail.title">
        <q-separator v-if="index > 0" />
        <q-item>
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

type Detail = { title: string; description: string };

const cardsStore = useCardsStore();
const { selectedCard } = storeToRefs(cardsStore);

const cardDetails = computed<Detail[]>(() => {
  const card = toValue(selectedCard);
  if (card === null) return emptyList as unknown as Detail[];
  return [
    {
      title: 'Type',
      description: enumToSentence(card.type),
    },
    {
      title: 'Network',
      description: enumToSentence(card.cardNetwork),
    },
    {
      title: 'Card number',
      description: splitCardNumber(card.cardNumber).join(' '),
    },
    {
      title: 'Expiry',
      description: card.expiry,
    },
    {
      title: 'CVV',
      description: card.cvv,
    },
    {
      title: 'Card holder name',
      description: card.cardHolderName,
    },
    {
      title: 'Currency',
      description: `${getCurrencySign(card.currency)} (${card.currency.type})`,
    },
    {
      title: 'Per transaction limit',
      description: formatAsCurrency(card.limits.TRANSACTION_LIMIT, card.currency),
    },
    {
      title: 'Daily limit',
      description: formatAsCurrency(card.limits.DAILY_LIMIT, card.currency),
    },
    {
      title: 'Monthly limit',
      description: formatAsCurrency(card.limits.MONTHLY_LIMIT, card.currency),
    },
    {
      title: 'Total limit',
      description: formatAsCurrency(card.limits.TOTAL_LIMIT, card.currency),
    },
    {
      title: 'Usable limit',
      description: formatAsCurrency(card.limits.USABLE_LIMIT, card.currency),
    },
    {
      title: 'Issued by',
      description: enumToSentence(card.issuingBank || '-'),
    },
    {
      title: 'Isued on',
      description: formatAsDate(card.createdAt),
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
