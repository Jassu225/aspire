<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-between items-end tw:pb-1">
      <div class="balance-container">
        <p>Available balance</p>
        <div class="row inline items-center" style="gap: 12px">
          <div class="currency-sign-container">
            <span class="sign text-white tw:font-bold">S$</span>
          </div>
          <span class="balance-amount tw:text-[26px] tw:font-bold">{{
            formatAsCurrencyWithoutSign(3000)
          }}</span>
        </div>
      </div>
      <q-btn color="accent" class="new-card-btn" :ripple="false" :no-caps="true">
        <q-icon name="r_add_circle" />
        <span class="tw:ml-1 tw:font-bold">New card</span>
      </q-btn>
    </div>
    <q-tabs
      v-model="tab"
      no-caps
      outside-arrows
      mobile-arrows
      inline-label
      align="left"
      dense
      class="tw:mt-10"
      indicator-color="indicator"
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.type"
        :name="tab.type"
        :label="tab.label"
        :ripple="false"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel v-for="tab in tabs" :key="tab.type" :name="tab.type">
        <component :is="tab.component" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatAsCurrencyWithoutSign } from 'src/utils/number';
import { tabs } from './types';
import type { TabType } from './types';
const tab = ref<TabType>('my-cards');
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

  .q-tabs {
    .q-tab {
      padding: 0 4px;
      margin-left: 28px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
