<template>
  <div class="wrapper">
    <div>
      <CardsCarousel />
      <CardActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardsCarousel from '../cards-carousel/CardsCarousel.vue';
import CardActions from '../card-actions/CardActions.vue';
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 414px 1fr;
  row-gap: 44px;
}
</style>
