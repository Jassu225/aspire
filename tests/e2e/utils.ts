import { type Page } from '@playwright/test';
import { MockeryEvents } from 'src/services/mockery/mockery-event-emitter';
import type { MockeryResponseEventDetail } from 'src/services/mockery/mockery-event-emitter';

/**
 * Created to handle api mocking.
 * @param page - The page object.
 * @param _url - The url to wait for.
 * @param _timeout - The timeout in milliseconds.
 * @returns A promise that resolves to the response detail.
 */
export function waitForResponse<ReqT, ResT>(
  page: Page,
  _url: string,
  { timeout: _timeout }: { timeout?: number } = { timeout: 10000 },
) {
  return page.evaluate(
    async ({ timeout, url, MockeryEvents }) => {
      return new Promise<MockeryResponseEventDetail<ReqT, ResT>>((resolve, reject) => {
        const timerId = timeout ? setTimeout(() => reject(new Error('Timeout')), timeout) : null;
        if (!globalThis.mockeryEventEmitter) {
          return reject(new Error('MockeryEventEmitter not found'));
        }
        globalThis.mockeryEventEmitter.on<MockeryResponseEventDetail<ReqT, ResT>>(
          MockeryEvents.ON_RESPONSE,
          (event, { off }) => {
            console.log('event.detail', event.detail);
            if (event.detail.url.endsWith(url)) {
              if (timerId) {
                clearTimeout(timerId);
              }
              off();
              resolve(event.detail);
            }
          },
        );
      });
    },
    { timeout: _timeout, url: _url, MockeryEvents },
  );
}
