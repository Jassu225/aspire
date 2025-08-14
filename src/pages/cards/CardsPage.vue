<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-between items-end tw:pb-1">
      <div class="balance-container">
        <p>Available balance</p>
        <div class="row inline items-center" style="gap: 12px">
          <div class="currency-sign-container">
            <span class="sign tw:text-white tw:font-bold">S$</span>
          </div>
          <span class="balance-amount tw:text-[26px] tw:font-bold">{{
            formatAsCurrencyWithoutSign(3000)
          }}</span>
        </div>
      </div>
      <q-btn color="accent" class="new-card-btn" :ripple="false">
        <q-icon name="r_add_circle" />
        <span class="tw:ml-1 tw:font-bold">New card</span>
      </q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { formatAsCurrencyWithoutSign } from 'src/utils/number';
</script>

<style lang="scss" scoped>
.q-page {
  padding: 60px;

  .balance-container {
    .currency-sign-container {
      padding: 3px 13px;
      background-color: $primary;
      border-radius: 4px;
      .sign {
        line-height: 18px;
      }
    }
  }

  .new-card-btn {
    text-transform: none;
  }
}
</style>
