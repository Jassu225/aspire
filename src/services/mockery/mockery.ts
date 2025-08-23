import { findMockAndExec } from 'src/services/mock-backend/back-end';

const setupMockery = (): (() => void) => {
  console.log(`--------- Mockery Enabled -------`);

  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string') {
      try {
        const resPromise = findMockAndExec(input, JSON.parse((init?.body as string) || '{}'));
        if (resPromise instanceof Promise) {
          const res = await resPromise;
          const response = new Response(JSON.stringify(res), {
            status: 200,
            statusText: 'OK',
            headers: {
              'Content-Type': 'application/json',
            },
          });
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
