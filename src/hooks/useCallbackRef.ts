import {useRef} from 'react';

type BasicFunction = (...args: any[]) => void;

// Returns a callback function that doesn't change it's reference,
// but will always call the latest callback.
//
// Allows us to pass a basic function to the hook without
// having to wrap it in a useCallback.
export function useCallbackRef<T extends BasicFunction>(callback: T): T {
  const callbackRef = useRef<T>(null as any);

  if (!callbackRef.current) {
    callbackRef.current = Proxy.create<T>();
  }

  Proxy.update(callbackRef.current, callback);

  return callbackRef.current;
}

const Proxy = {
  create<T extends BasicFunction>(): T {
    const proxy: any = (...args: any[]) => {
      return proxy.callback(...args);
    };

    return proxy;
  },

  update(proxy: any, callback: BasicFunction) {
    proxy.callback = callback;
  },
};
