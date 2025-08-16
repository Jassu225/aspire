<template>
  <router-link :to="link" class="nav-link">
    <q-item :class="$attrs.class">
      <q-item-section avatar>
        <q-icon size="24px"><component :is="icon" /></q-icon>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
defineOptions({
  inheritAttrs: false,
});

export interface NavLinkProps {
  title: string;
  link?: string;
  icon: Component;
}

const { link = '#', title, icon } = defineProps<NavLinkProps>();
</script>

<style lang="scss" scoped>
.nav-link {
  &:hover {
    .q-item {
      background-color: rgba($primary, 0.2);
    }
  }
  &.router-link-exact-active {
    .q-item {
      .q-icon,
      .q-item__label {
        color: $primary;
        font-size: bold;
      }
    }
  }

  .q-item {
    margin-top: 60px;
    .q-icon,
    .q-item__label {
      color: white;
      font-size: 1rem;
    }
  }
}
</style>
