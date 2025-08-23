<template>
  <q-expansion-item
    class="collapsible-view tw:rounded-lg"
    expand-icon="r_expand_circle_down"
    expandIconClass="expand-icon"
    header-class="header tw:rounded-lg"
    :default-opened="defaultOpened"
    @show="$emit('show')"
    @hide="$emit('hide')"
  >
    <template #header>
      <q-item-section side>
        <q-icon><component :is="icon" /></q-icon>
      </q-item-section>

      <q-item-section data-testid="title" class="title"> {{ title }} </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <slot></slot>
      </q-card-section>
      <slot name="footer"></slot>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { type Component } from 'vue';
defineEmits(['show', 'hide']);

const {
  icon,
  title,
  defaultOpened = false,
} = defineProps<{
  icon: Component;
  title: string;
  defaultOpened?: boolean;
}>();
</script>

<style lang="scss" scoped>
.collapsible-view {
  border: 1px solid $border-primary;

  :deep(.header) {
    background-color: rgba($secondary, 0.035);
    box-shadow: 0 0 8px 0 rgba($shadow, 0.04);
    padding: 24px;

    .title {
      color: $text-secondary;
    }

    .expand-icon {
      color: rgba($secondary, 0.15);
    }
  }

  $radius: 8px;
  .q-card {
    border-radius: $radius;
    .q-card__section {
      padding: 24px;
    }
  }
}
</style>
