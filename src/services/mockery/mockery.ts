import { findMockAndExec } from 'src/services/mock-backend/back-end';
import type {
  MockeryRequestEventDetail,
  MockeryResponseEventDetail,
} from './mockery-event-emitter';
import mockeryEventEmitter, { MockeryEvents } from './mockery-event-emitter';

const setupMockery = (): (() => void) => {
  console.log(`--------- Mockery Enabled -------`);

  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string') {
      try {
        const request = JSON.parse((init?.body as string) || '{}');
        const resPromise = findMockAndExec(input, request);
        if (resPromise instanceof Promise) {
          mockeryEventEmitter.emit<MockeryRequestEventDetail<unknown>>(MockeryEvents.ON_REQUEST, {
            request,
            url: input,
          });
          const res = await resPromise;
          const response = new Response(JSON.stringify(res), {
            status: 200,
            statusText: 'OK',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          mockeryEventEmitter.emit<MockeryResponseEventDetail<unknown, object>>(
            MockeryEvents.ON_RESPONSE,
            { request, response: res, url: input },
          );
          return response;
        }
      } catch (e) {
        const response = new Response(null, {
          status: 400,
          statusText: (e as Error)?.message || 'Bad Request',
        });
        return response;
      }
    }
    return originalFetch(input, init);
  };

  return () => {
    globalThis.fetch = originalFetch;
  };
};

export default setupMockery;
