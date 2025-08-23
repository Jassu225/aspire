<template>
  <router-view />
</template>

<script setup lang="ts">
//
import setupMockery from 'src/services/mockery/mockery';
import { onBeforeUnmount } from 'vue';

const cleanupMockery = setupMockery();

onBeforeUnmount(cleanupMockery);
</script>
