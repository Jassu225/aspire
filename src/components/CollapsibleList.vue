<template>
  <CollapsibleView :icon="TransactionsIcon" title="Recent transactions" />
</template>

<script setup lang="ts">
// import type { Component } from 'vue';
import TransactionsIcon from 'assets/icons/card/transactions.svg?component';
import CollapsibleView from './CollapsibleView.vue';

// const { icon, title } = defineProps<{
//   icon: Component;
//   title: string;
// }>();
</script>

<style lang="scss" scoped>
.collapsible-view {
  border: 1px solid #f5f5f5;

  :deep(.header) {
    background-color: #f5f9ff;
    box-shadow: 0 0 8px 0 rgba(#000000, 0.04);

    .title {
      color: #0c365a;
    }

    .expand-icon {
      color: rgba(#325baf, 0.15);
    }
  }
}
</style>
