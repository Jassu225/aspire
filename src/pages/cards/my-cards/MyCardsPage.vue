<template>
  <div>
    <q-carousel
      v-model="selectedCardUid"
      swipeable
      animated
      navigation
      padding
      height="364px"
      class="bg-grey text-black rounded-borders"
    >
      <q-carousel-slide v-for="card in cards" :key="card.uid" :name="card.uid">
        <CardView :card="card" />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from 'src/types/db/card';
import { CardNetwork, CardStatus, CardType } from 'src/types/db/card';
import CardView from '../CardView.vue';

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
      backgroundColor: '#ffffff',
      textColor: '#000000',
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
}
</style>
