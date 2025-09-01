<template>
  <q-carousel
    v-model="cardsStore.selectedCardUid"
    swipeable
    animated
    navigation
    control-color="primary"
    padding
    transition-prev="slide-right"
    transition-next="slide-left"
    height="364px"
    :data-testid="cardsPage.cardsCarousel.cardsContainer"
  >
    <template #navigation-icon="{ active, onClick, index }">
      <q-btn round @click="onClick" size="xs" push unelevated flat>
        <span
          class="tw:rounded-full tw:inline-block control-icon"
          :class="{ active: active || cards[index]?.uid === cardsStore.selectedCardUid }"
          :data-testid="cardsPage.cardsCarousel.cardNavigationButton"
        ></span>
      </q-btn>
    </template>
    <q-carousel-slide v-for="card in cards" :key="card.uid" :name="card.uid">
      <CardView :card="card" :data-testid="cardsPage.cardsCarousel.cardViewContainer" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useCardsStore from 'src/stores/cards';
import { emptyList } from 'src/utils/empty';
import { cardsPage } from 'src/constants/tests/locators/cards-page';
import CardView from '../cards-carousel/CardView.vue';

const cardsStore = useCardsStore();
const cards = computed(() => cardsStore.cardsInfoResponse?.cards || emptyList);
</script>

<style lang="scss" scoped>
$card-width: 414px;
.q-carousel {
  width: $card-width;
  .q-carousel__slide {
    width: $card-width;
    padding-left: 0;
    padding-right: 0;
  }

  :deep(.q-carousel__navigation-inner) {
    .q-btn {
      &.q-btn--round {
        min-width: 0;
        min-height: 0;
      }
      padding: 0;
      .control-icon {
        width: 8px;
        height: 8px;
        cursor: pointer;
        background-color: rgba($primary, 0.2);
        transition:
          width 250ms linear,
          background-color 250ms linear;
        &.active {
          width: 16px;
          background-color: $primary;
        }
      }
    }
  }
}
</style>
