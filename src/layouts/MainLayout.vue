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
      :data-testid="mainLayout.drawer.id"
    >
      <q-img
        src="~assets/icons/logo/logo-with-name.svg"
        width="125px"
        class="lr-margin"
        :data-testid="mainLayout.drawer.logoId"
      />
      <p
        style="margin-bottom: 0; margin-top: 20px"
        class="trust-indicator lr-padding"
        :data-testid="mainLayout.drawer.trustIndicatorId"
      >
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
import HomeIcon from 'assets/icons/logo/logo.svg?component';
import CardBackIcon from 'assets/icons/navigation/card-back.svg?component';
import TransactionsIcon from 'assets/icons/navigation/transactions.svg?component';
import CreditIcon from 'assets/icons/navigation/credit.svg?component';
import AccountIcon from 'assets/icons/navigation/account.svg?component';
import { mainLayout } from 'src/constants/tests/locators/main-layout';

const linksList: NavLinkProps[] = [
  {
    title: 'Home',
    link: '/',
    icon: HomeIcon,
    dataTestId: mainLayout.drawer.navLinks.homeId,
  },
  {
    title: 'Cards',
    icon: CardBackIcon,
    link: '/cards',
    dataTestId: mainLayout.drawer.navLinks.cardsId,
  },
  {
    title: 'Payments',
    icon: TransactionsIcon,
    link: '/payments',
    dataTestId: mainLayout.drawer.navLinks.paymentsId,
  },
  {
    title: 'Credit',
    icon: CreditIcon,
    link: '/credit',
    dataTestId: mainLayout.drawer.navLinks.creditId,
  },
  {
    title: 'Settings',
    icon: AccountIcon,
    link: '/settings',
    dataTestId: mainLayout.drawer.navLinks.settingsId,
  },
];

const leftDrawerOpen = ref(false);
</script>

<style lang="scss" scoped>
.main-layout {
  .q-drawer-container {
    :deep(.q-drawer) {
      position: fixed;
      background-color: $bg-secondary;

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
