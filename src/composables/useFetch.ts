import { ref, watchEffect, toValue, type Reactive, computed } from 'vue';

export function useFetch(url: Reactive<string>) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  const isFetching = computed(() => data.value === null && error.value === null);

  return { data, error, isFetching };
}
