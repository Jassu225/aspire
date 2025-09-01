<template>
  <q-page class="row items-center justify-evenly">
    <q-btn label="Go to Cards" color="primary" to="/cards" :data-testid="homePage.cardsPageBtnId" />
  </q-page>
</template>

<script setup lang="ts">
import { homePage } from 'src/constants/tests/locators/home-page';
</script>
