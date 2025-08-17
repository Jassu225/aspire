<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-between items-end tw:pb-1">
      <div class="balance-container">
        <p>Available balance</p>
        <div v-if="selectedCard" class="row inline items-center" style="gap: 12px">
          <div class="currency-sign-container">
            <span class="sign text-white tw:font-bold">{{
              getCurrencySign(selectedCard.currency)
            }}</span>
          </div>
          <span class="balance-amount tw:text-[26px] tw:font-bold">{{ usableLimit }}</span>
        </div>
      </div>
      <q-btn
        color="accent"
        class="new-card-btn"
        :ripple="false"
        :no-caps="true"
        @click="showNewCardForm = true"
      >
        <q-icon name="r_add_circle" />
        <span class="tw:ml-1 tw:font-bold">New card</span>
      </q-btn>
    </div>
    <q-tabs
      v-model="selectedTab"
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
    <q-tab-panels v-model="selectedTab" animated keep-alive>
      <q-tab-panel v-for="tab in tabs" :key="tab.type" :name="tab.type" class="tw:mt-4">
        <div class="panel-content-wrapper tw:rounded-lg tw:p-10">
          <component :is="tab.component" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <NewCardForm v-model="showNewCardForm" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onWatcherCleanup, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { getCurrencySign } from 'src/utils/number';
import { formatAsCurrencyWithoutSign } from 'src/utils/number';
import useCardsStore from 'src/stores/cards';
import { tabs } from './types';
import NewCardForm from './NewCardForm.vue';

const { selectedTab, selectedCard } = storeToRefs(useCardsStore());

console.log(selectedCard.value?.currency);

const usableLimit = computed(() =>
  selectedCard.value
    ? formatAsCurrencyWithoutSign(
        selectedCard.value.limits.USABLE_LIMIT,
        selectedCard.value.currency,
      )
    : '-',
);

const showNewCardForm = ref(false);
watch(
  selectedTab,
  () => {
    console.log('calling --- ', selectedTab.value);
    const store = useCardsStore();
    const abortController = new AbortController();

    void store.fetchCardsInfo(
      {
        cardsInfoType: selectedTab.value,
      },
      {
        signal: abortController.signal,
      },
    );

    onWatcherCleanup(() => {
      abortController.abort();
    });
  },
  {
    immediate: true,
  },
);
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

  .q-tab-panels {
    .q-tab-panel {
      padding: 6px;
      .panel-content-wrapper {
        box-shadow: 0 2px 12px 0 rgba($shadow, 0.14);
      }
    }
  }
}
</style>
