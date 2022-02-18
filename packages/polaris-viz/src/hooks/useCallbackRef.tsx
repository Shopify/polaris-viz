import {useRef} from 'react';

type BasicFunction = (...args: any[]) => void;

// Returns a callback function that doesn't change it's reference,
// but will always call the latest callback.
//
// useCallback will change its reference when the deps change, but useCallbackRef
// doesn't. It keeps the same reference but will always have an up-to-date
// version of the latest method passed as a dependency.
//
// Example: If you have a hook that adds/removes event listeners, you can
// use useCallbackRef so that the events aren't removed/re-added whenever
// the callback changes.
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
