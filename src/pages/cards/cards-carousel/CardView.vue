<template>
  <div class="card-view column no-wrap">
    <q-btn
      flat
      no-caps
      @click="detailsVisible = !detailsVisible"
      class="visibility-btn q-ml-auto"
      :style="{ color: card.cardDesign?.backgroundColor }"
    >
      <q-icon :name="detailsVisible ? 'o_visibility_off' : 'visibility'" size="xs" />
      <span class="tw:ml-1 tw:font-bold">{{ detailsVisible ? 'Hide' : 'Show' }} details</span>
    </q-btn>
    <div
      class="card column tw:rounded-2xl tw:p-7 tw:mt-1"
      :style="{ backgroundColor: card.cardDesign?.backgroundColor }"
    >
      <div v-if="logo !== null || card.issuingBank" class="q-ml-auto">
        <q-img
          no-spinner
          v-if="logo !== null && logo.url"
          :src="logo.url"
          v-bind="{
            width: logo.width ? `${logo.width}px` : undefined,
            height: logo.height ? `${logo.height}px` : undefined,
            alt: logo.alt || 'Card Logo',
          }"
        />
        <span
          v-if="(logo === null || !card.cardDesign?.logoHasName) && card.issuingBank"
          class="tw:lowercase tw:ml-1"
          :style="{ color: card.cardDesign?.textColor }"
          >{{ card.issuingBank }}</span
        >
      </div>
      <span class="tw:m-0 tw:text-2xl tw:mt-7" :style="{ color: card.cardDesign?.textColor }">{{
        card.cardHolderName
      }}</span>
      <div
        class="card-number row items-center tw:mt-8"
        :style="{ color: card.cardDesign?.textColor }"
      >
        <span
          v-for="(group, index) in cardNumberGroups"
          :key="index"
          class="card-number-group"
          :class="{ mask: !detailsVisible && index < cardNumberGroups.length - 1 }"
        >
          {{
            !detailsVisible && index < cardNumberGroups.length - 1
              ? '\u{2022}\u{2022}\u{2022}\u{2022}'
              : group
          }}
        </span>
      </div>
      <div
        class="expiry-cvv-container row items-center tw:text=[13px] tw:mt-5"
        :style="{ color: card.cardDesign?.textColor }"
      >
        <span class="expiry-container">
          Thru: <span class="expiry tw:tracking-[1px]">{{ card.expiry }}</span>
        </span>
        <div class="cvv-container row inline items-center tw:ml-9">
          <span>CVV:&nbsp;</span>
          <span v-if="detailsVisible" class="cvv">{{ card.cvv || '- - -' }}</span>
          <span v-else class="mask">&#10034; &#10034; &#10034;</span>
        </div>
        <!-- <span class="tw:ml-4 tw:font-bold tw:text-lg">
          {{ card.cardNetwork === CardNetwork.VISA ? 'VISA' : 'MASTERCARD' }}
        </span> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Card } from 'src/types/db/card';
import { splitCardNumber } from 'src/utils/card';

const props = defineProps<{
  card: Card;
}>();

const logo = computed(() => props.card.cardDesign?.logo || null);
const cardNumberGroups = computed(() => splitCardNumber(props.card.cardNumber));

const detailsVisible = ref(false);
</script>

<style lang="scss" scoped>
$card-width: 414px;
$card-height: 248px;
.card-view {
  height: 100%;
  font-weight: bold;
  .q-btn.visibility-btn {
    color: $primary;
    padding-right: 0;
    font-weight: bold;
  }
  .card {
    background-color: $primary;
    color: white;
    width: $card-width;
    height: $card-height;

    .card-number {
      height: 20px;
      .card-number-group {
        display: inline-block;
        margin-right: 28px;
        letter-spacing: 4px;
        :last-child {
          margin-right: 0;
        }

        &.mask {
          font-size: 24px;
          line-height: 20px;
        }
      }
    }

    .cvv-container {
      .cvv {
        letter-spacing: 2px;
      }
    }
  }
}
</style>
