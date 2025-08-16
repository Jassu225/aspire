import { ref } from 'vue';
import type { RequestOptions } from 'src/services/api/cards';

export function useFetch<ReqT, ResT>(
  apiCaller: (req: ReqT, options?: RequestOptions) => Promise<ResT>,
) {
  const data = ref<ResT | null>(null);
  const error = ref<Error | null>(null);
  const isFetching = ref(false);

  const controllerRef = { value: new AbortController() };
  const fetch = (req: ReqT): Promise<ResT> => {
    isFetching.value = true;
    controllerRef.value.abort();
    data.value = null;
    error.value = null;

    controllerRef.value = new AbortController();
    return apiCaller(req, { signal: controllerRef.value.signal })
      .then((json) => {
        data.value = json;
        return json;
      })
      .catch((err) => {
        error.value = err;
        throw err;
      })
      .finally(() => (isFetching.value = false));
  };

  return { data, error, isFetching, fetch };
}
