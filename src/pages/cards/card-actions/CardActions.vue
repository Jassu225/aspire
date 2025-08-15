<template>
  <div class="card-actions row items-center justify-between tw:rounded-2xl tw:px-7 tw:py-5">
    <q-btn
      v-for="action in cardsStore.selectedCard?.actions"
      :key="action.type"
      flat
      class="action-btn"
      :ripple="false"
      no-caps
    >
      <div class="">
        <q-icon :name="`img:${action.icon.url}`" />
        <br />
        <pre class="name tw:mt-2">{{ formatActionName(action.name) }}</pre>
      </div>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import useCardsStore from 'src/stores/cards';

const cardsStore = useCardsStore();

const formatActionName = (name: string) => {
  const words = name.split(' ');
  if (words.length <= 1) return words;
  return `${words.slice(0, -1).join(' ')}\n${words[words.length - 1]}`;
};
</script>

<style lang="scss" scoped>
.card-actions {
  background-color: #edf3ff;

  .q-btn {
    padding-left: 4px;
    padding-right: 4px;
    .q-icon {
      width: 32px;
      height: 32px;
    }
    .name {
      font-size: 13px;
      font-weight: 500;
      color: $on-primary-container;
      line-height: 1.5;
    }
  }
}
</style>
