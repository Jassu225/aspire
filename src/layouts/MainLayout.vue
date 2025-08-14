<template>
  <q-layout view="hHh lpR fFf" class="main-layout">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      no-swipe-close
      persistent
      :width="340"
      class="q-py-xl main-layout__drawer"
    >
      <q-img src="/src/assets/logo/logo-with-name.svg" width="125px" class="lr-margin" />
      <p style="margin-bottom: 0; margin-top: 20px" class="trust-indicator lr-padding">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>
      <q-list>
        <NavLink v-for="link in linksList" :key="link.title" v-bind="link" class="lr-padding" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavLink, { type NavLinkProps } from 'components/layout/NavLink.vue';

const linksList: NavLinkProps[] = [
  {
    title: 'Home',
    link: '/',
    iconPath: 'icons/logo.svg|0 0 25.595 25',
  },
  {
    title: 'Cards',
    iconPath: 'icons/card-back.svg',
    link: '/cards',
  },
  {
    title: 'Payments',
    iconPath: 'icons/logo.svg|0 0 24 24.25',
    link: '/payments',
  },
  {
    title: 'Credit',
    iconPath: 'icons/credit.svg',
    link: '/credit',
  },
  {
    title: 'Settings',
    iconPath: 'icons/account.svg',
    link: '/settings',
  },
];

const leftDrawerOpen = ref(false);
</script>

<style lang="scss" scoped>
.main-layout {
  .q-drawer-container {
    :deep(.q-drawer) {
      background-color: #0c365a;

      .lr-padding {
        padding-left: 48px;
        padding-right: 40px;
      }
      .lr-margin {
        // for images
        margin-left: 48px;
        margin-right: 40px;
      }

      .trust-indicator {
        color: rgba(#ffffff, 0.3);
        font-size: 15px;
      }

      .q-list {
        margin-top: 80px;
      }
    }
  }
}
</style>
