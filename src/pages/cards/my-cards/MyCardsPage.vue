<template>
  <div class="my-cards-page tw:relative">
    <div class="wrapper" v-if="!cardsStore.isFetchingCardsInfo">
      <div>
        <CardsCarousel />
        <CardActions v-if="cardsStore.selectedCard?.actions.length || 0 > 0" />
      </div>
      <div class="column tw:pt-14 tw:gap-6">
        <CardDetails />
        <CardTransactions />
      </div>
    </div>
    <q-inner-loading :showing="cardsStore.isFetchingCardsInfo">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import useCardsStore from 'src/stores/cards';
import CardsCarousel from '../cards-carousel/CardsCarousel.vue';
import CardActions from '../card-actions/CardActions.vue';
import CardTransactions from '../transactions/CardTransactions.vue';
import CardDetails from './CardDetails.vue';

const cardsStore = useCardsStore();
</script>

<style lang="scss" scoped>
.my-cards-page {
  min-height: 360px;
  .wrapper {
    display: grid;
    grid-template-columns: 414px 1fr;
    column-gap: 44px;
  }
}
</style>
