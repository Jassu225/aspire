<template>
  <CollapsibleView
    :icon="TransactionsIcon"
    title="Recent transactions"
    @show="expanded = true"
    @hide="expanded = false"
  >
    <q-list>
      <template
        v-for="(transaction, index) in cardsStore.selectedCardTransactions"
        :key="transaction.uid"
      >
        <q-separator v-if="index > 0" />
        <CardTransactionItem :transaction="transaction" :card-type="CardType.DEBIT" />
      </template>
      <q-item v-if="cardsStore.isFetchingSelectedCardTransactions">
        <q-item-section>
          <q-inner-loading showing>
            <q-spinner color="primary" size="3em" :thickness="2" />
          </q-inner-loading>
        </q-item-section>
      </q-item>
      <q-item v-else-if="(cardsStore.selectedCardTransactions?.length || 0) === 0">
        <q-item-section class="tw:text-center"> No transactions yet. </q-item-section>
      </q-item>
    </q-list>
    <template v-if="(cardsStore.selectedCardTransactions?.length || 0) > 0" #footer>
      <q-card-actions class="column items-stretch">
        <q-btn flat no-caps label="View all card transactions" color="primary" />
      </q-card-actions>
    </template>
  </CollapsibleView>
</template>

<script setup lang="ts">
import { onWatcherCleanup, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import CollapsibleView from 'src/components/CollapsibleView.vue';
import TransactionsIcon from 'assets/icons/card/transactions.svg?component';
import useCardsStore from 'src/stores/cards';
import { CardType } from 'src/types/db/card/index';
import CardTransactionItem from './CardTransactionItem.vue';

const cardsStore = useCardsStore();
const { selectedCardUid } = storeToRefs(cardsStore);

const expanded = ref(false);

watch([selectedCardUid, expanded], () => {
  if (!expanded.value) return false;
  // console.log('calling --- ', selectedCardUid);
  const abortController = new AbortController();

  void cardsStore.fetchSelectedCardTransactions({ signal: abortController.signal });

  onWatcherCleanup(() => {
    abortController.abort();
  });
});
</script>

<style lang="scss" scoped>
.q-card__actions {
  padding: 0;
  .q-btn {
    border-radius: 0 0 8px 8px;
    background-color: rgba($primary, 0.15);
    padding: 16px 8px;
    font-weight: 600;
  }
}
</style>
