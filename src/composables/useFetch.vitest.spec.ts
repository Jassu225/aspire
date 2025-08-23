import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import { useFetch } from './useFetch';

installQuasarPlugin();

const sleep = (time = 2000) => new Promise<number>((res) => setTimeout(() => res(time), time));
const sleepWithError = (time = 2000) =>
  new Promise<number>((_, rej) => setTimeout(() => rej(new Error('test')), time));

describe('composables/useFetch', () => {
  it('should have null data and error initially', () => {
    const { data, error, isFetching, fetch } = useFetch(sleep);
    expect(isFetching.value).toBe(false);
    expect(data.value).toBeNull();
    expect(error.value).toBeNull();
    expect(fetch).toBeDefined();
  });

  it.concurrent('should set isFetching to true when fetch is called', async () => {
    const { data, error, isFetching, fetch } = useFetch(sleep);
    const promise = fetch(500);
    expect(isFetching.value).toBe(true);
    expect(error.value).toBeNull();
    expect(data.value).toBeNull();
    await promise;
    expect(data.value).toBe(500);
    expect(error.value).toBeNull();
    expect(isFetching.value).toBe(false);
  });

  it.concurrent('should set error when fetch fails', async () => {
    const { data, error, isFetching, fetch } = useFetch(sleepWithError);
    const promise = fetch(500);
    expect(isFetching.value).toBe(true);
    expect(error.value).toBeNull();
    expect(data.value).toBeNull();
    await promise.catch(() => {});
    expect(error.value).toBeInstanceOf(Error);
    expect(error.value?.message).toBe('test');
    expect(data.value).toBeNull();
    expect(isFetching.value).toBe(false);
  });
});
