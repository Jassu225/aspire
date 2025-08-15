<template>
  <q-expansion-item
    class="collapsible-view tw:rounded-lg"
    expand-icon="r_expand_circle_down"
    expandIconClass="expand-icon"
    header-class="header tw:rounded-lg"
  >
    <template #header>
      <q-item-section side>
        <q-icon><icon /></q-icon>
      </q-item-section>

      <q-item-section class="title"> {{ title }} </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

const { icon, title } = defineProps<{
  icon: Component;
  title: string;
}>();
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

  .q-card {
    .q-card__section {
      padding: 24px;
    }
  }
}
</style>
