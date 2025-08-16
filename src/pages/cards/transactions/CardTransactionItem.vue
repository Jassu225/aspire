<template>
  <q-item class="card-transaction-item items-start">
    <q-item-section side class="icon-wrapper">
      <div class="icon-container tw:rounded-full tw:relative">
        <div
          class="icon-background tw:rounded-full tw:w-full tw:h-full tw:absolute"
          :style="{ backgroundColor: transaction.merchant.icon?.color }"
        ></div>
        <div class="icon-content row no-wrap flex-center tw:rounded-full tw:w-full tw:h-full">
          <img
            v-if="transaction.merchant.icon?.url"
            :src="transaction.merchant.icon.url"
            :alt="transaction.merchant.icon.alt || ''"
            :style="{
              width: toPx(transaction.merchant.icon.width),
              height: toPx(transaction.merchant.icon.height),
            }"
          />
        </div>
      </div>
    </q-item-section>
    <q-item-section class="content-wrapper tw:pt-1">
      <div class="row no-wrap items-center justify-between">
        <span class="tw:font-semibold">{{ transaction.merchant.name }}</span>
        <span class="row no-wrap items-center tw:inline-block">
          <span
            class="amount tw:font-bold"
            :class="{
              positive: amount.cashFlow === CashFlow.INWARDS,
              negative: amount.cashFlow === CashFlow.OUTWARDS,
            }"
          >
            <span>{{ amount.sign }}</span>
            <span class="tw:ml-1">{{ amount.currencySign }}</span>
            <span>&nbsp;{{ amount.value }}</span>
          </span>
          <q-icon name="r_arrow_forward_ios" tag="span" class="tw:ml-2"
        /></span>
      </div>
      <span class="date tw:mt-1">{{
        formatAsDate(transaction.settledAt || transaction.createdAt)
      }}</span>
      <div class="row no-wrap items-center tw:gap-1 tw:mt-3">
        <div class="icon-container row inline flex-center tw:rounded-full">
          <q-icon size="10px" color="white"><CardIcon /></q-icon>
        </div>
        <span class="caption">{{ getTransactionCaption(transaction, cardType) }}</span>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type UiCardTransaction } from 'src/types/ui/card';
import { formatAmount } from 'src/utils/number';
import { getCashFlow, CashFlow, getTransactionCaption } from 'src/utils/card';
import { formatAsDate } from 'src/utils/date';
import CardIcon from 'src/assets/icons/card/card-back-simple.svg?component';
import { type CardType } from 'src/types/db/card';
import { toPx } from 'src/utils/ui';

const props = defineProps<{ transaction: UiCardTransaction; cardType: CardType }>();
const amount = computed(() => {
  const cashFlow = getCashFlow(props.transaction);
  return {
    cashFlow,
    sign: cashFlow === CashFlow.INWARDS ? '+' : '-',
    value: formatAmount(props.transaction.amount),
    currencySign: props.transaction.amount.currencySign || props.transaction.amount.currency,
  };
});
</script>

<style lang="scss" scoped>
.card-transaction-item {
  padding: 16px;
  .icon-wrapper {
    .icon-container {
      width: 48px;
      height: 48px;
      .icon-background {
        opacity: 0.1;
        background-color: #009dff;
      }
    }
  }

  .content-wrapper {
    .amount {
      &.positive {
        color: $primary;
      }
    }

    .date {
      font-size: 13px;
      color: #aaaaaa;
    }

    .icon-container {
      width: 24px;
      height: 20px;
      background-color: $secondary;
    }

    .caption {
      color: $secondary;
    }
  }
}
</style>
