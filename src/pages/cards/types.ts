import { defineAsyncComponent, h } from 'vue';

const LoadingComponent = h('q-spinner', { color: 'primary', size: '2em' });

const MyCardsPage = defineAsyncComponent({
  // the loader function
  loader: () => import('./my-cards/MyCardsPage.vue'),
  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
});

const AllCardsPage = defineAsyncComponent({
  // the loader function
  loader: () => import('./all-cards/AllCardsPage.vue'),
  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
});

export const tabs = [
  {
    type: 'my-cards',
    label: 'My debit cards',
    component: MyCardsPage,
  },
  {
    type: 'all-cards',
    label: 'All company cards',
    component: AllCardsPage,
  },
] as const;

export type TabType = (typeof tabs)[number]['type'];
