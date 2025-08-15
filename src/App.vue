<template>
  <router-view />
</template>

<script setup lang="ts">
//
import setupMockery from 'src/services/api/mockery/mockery';
setupMockery();
</script>
