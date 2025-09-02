export enum MockeryEvents {
  ON_REQUEST = 'ON_REQUEST',
  ON_RESPONSE = 'ON_RESPONSE',
  //   ON_ERROR = 'ON_ERROR',
}

export type MockeryRequestEventDetail<ReqT> = {
  request: ReqT;
  url: string;
};

export type MockeryResponseEventDetail<ReqT, ResT> = {
  request: ReqT;
  response: ResT;
  url: string;
};

type DetailType = MockeryRequestEventDetail<unknown> | MockeryResponseEventDetail<unknown, unknown>;

// export class MockeryRequestEvent<ReqT> extends CustomEvent<MockeryRequestEventDetail<ReqT>> {
//   constructor(detail: MockeryRequestEventDetail<ReqT>) {
//     super(MockeryRequestEvent.type, { detail });
//   }
//   public static readonly type = MockeryEvents.ON_REQUEST;
// }

// export class MockeryResponseEvent<ReqT, ResT> extends CustomEvent<
//   MockeryResponseEventDetail<ReqT, ResT>
// > {
//   constructor(detail: MockeryResponseEventDetail<ReqT, ResT>) {
//     super(MockeryResponseEvent.type, { detail });
//   }
//   public static readonly type = MockeryEvents.ON_RESPONSE;
// }

export type MockeryEventListener<DetailT> = (
  event: Event & {
    detail: DetailT extends DetailType ? DetailT : never;
  },
  controller: { off: () => void },
) => void;

class MockeryEventEmitter extends EventTarget {
  emit<DetailT = DetailType>(event: MockeryEvents, detail: DetailT): this {
    this.dispatchEvent(new CustomEvent(event, { detail }));
    return this;
  }
  on<DetailT = DetailType>(
    event: string,
    _listener: MockeryEventListener<DetailT>,
    options?: AddEventListenerOptions | boolean,
  ): this {
    const listener: MockeryEventListener<DetailT> = (event) => _listener(event, { off });
    const off = () =>
      this.removeEventListener(event, listener as EventListenerOrEventListenerObject, options);
    this.addEventListener(event, listener as EventListenerOrEventListenerObject, options);
    return this;
  }
}

const mockeryEventEmitter = new MockeryEventEmitter();

declare global {
  var mockeryEventEmitter: MockeryEventEmitter | undefined;
}
globalThis.mockeryEventEmitter = mockeryEventEmitter;
export default mockeryEventEmitter;
