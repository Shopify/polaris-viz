import {useLayoutEffect, useState} from 'react';
import {
  ResizeObserver as Polyfill,
  ResizeObserverEntry,
} from '@juggle/resize-observer';

function resizeObserver(
  callback: (entries: ResizeObserverEntry[], observer: Polyfill) => void,
) {
  if (typeof window === 'undefined') {
    return Polyfill;
  }

  return new ((window as any).ResizeObserver || Polyfill)(callback);
}

export const useResizeObserver = <T extends HTMLElement>(): {
  ref: T | null;
  setRef: (node: T | null) => void;
  entry: ResizeObserverEntry | undefined;
} => {
  const [ref, setRef] = useState<T | null>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry | undefined>();

  useLayoutEffect(() => {
    if (!ref) {
      return;
    }
    const observer = resizeObserver(([entry]) => setEntry(entry));
    observer.observe(ref);
    return () => {
      observer.disconnect();
    };
  }, [ref, setEntry]);

  return {ref, setRef, entry};
};
