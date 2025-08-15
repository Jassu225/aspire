<template>
  <div class="wrapper">
    <div>
      <CardsCarousel />
      <CardActions />
    </div>
    <div class="tw:pt-14">
      <CollapsibleView :icon="TransactionsIcon" title="Recent transactions" default-opened>
        <q-list>
          <template v-for="(transaction, index) in transactions" :key="transaction.uid">
            <q-separator v-if="index > 0" />
            <CardTransactionItem :transaction="transaction" :card-type="CardType.DEBIT" />
          </template>
        </q-list>
      </CollapsibleView>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapsibleView from 'src/components/CollapsibleView.vue';
import TransactionsIcon from 'assets/icons/card/transactions.svg?component';
import { transactions } from './data';
import CardsCarousel from '../cards-carousel/CardsCarousel.vue';
import CardActions from '../card-actions/CardActions.vue';
import CardTransactionItem from '../CardTransactionItem.vue';
import { CardType } from 'src/types/db/card';
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 414px 1fr;
  column-gap: 44px;
}
</style>
