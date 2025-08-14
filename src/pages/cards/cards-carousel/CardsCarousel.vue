<template>
  <q-carousel
    v-model="selectedCardUid"
    swipeable
    animated
    navigation
    control-color="primary"
    padding
    transition-prev="slide-right"
    transition-next="slide-left"
    height="364px"
  >
    <template #navigation-icon="{ active, onClick, index }">
      <q-btn round @click="onClick" size="xs" push unelevated flat>
        <span
          class="tw:rounded-full tw:inline-block control-icon"
          :class="{ active: active || cards[index]?.uid === selectedCardUid }"
        ></span>
      </q-btn>
    </template>
    <q-carousel-slide v-for="card in cards" :key="card.uid" :name="card.uid">
      <CardView :card="card" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from 'src/types/db/card';
import { CardNetwork, CardStatus, CardType } from 'src/types/db/card';
import CardView from '../cards-carousel/CardView.vue';

const cards = ref<Card[]>([
  {
    uid: '1',
    type: CardType.DEBIT,
    cardNumber: '1234 5678 9012 3456',
    expiry: '12/25',
    cardHolderName: 'Mark Henry',
    cardDesign: {
      backgroundColor: '#01D167',
      textColor: 'white',
      logo: {
        url: 'http://localhost:9000/icons/logo.svg',
        width: 24,
        height: 23,
        alt: 'Card Logo',
      },
      logoHasName: false,
      cardNetworkLogo: {
        url: 'https://example.com/logo.png',
        width: 50,
        height: 50,
        alt: 'Card Logo',
      },
    },
    cvv: '789',
    issuingBank: 'Aspire',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
  },
  {
    uid: '2',
    type: CardType.DEBIT,
    cardNumber: '1111 5678 9012 3456',
    expiry: '12/26',
    cardHolderName: 'Jane Doe',
    cardDesign: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      logo: {
        url: 'http://localhost:9000/icons/logo-with-name.svg',
        width: 85,
        height: 24,
        alt: 'Card Logo with Name',
      },
      logoHasName: true,
      cardNetworkLogo: {
        url: 'https://example.com/logo.png',
        width: 50,
        height: 50,
        alt: 'Card Logo',
      },
    },
    cvv: '012',
    status: CardStatus.ACTIVE,
    createdAt: '2023-10-01T00:00:00Z',
    cardNetwork: CardNetwork.VISA,
  },
]);

const selectedCardUid = ref(cards.value[0]?.uid || '');
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
