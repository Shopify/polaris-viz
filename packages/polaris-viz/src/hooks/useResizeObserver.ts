import {useLayoutEffect, useState} from 'react';
import type {ResizeObserverEntry} from '@juggle/resize-observer';
import {ResizeObserver as Polyfill} from '@juggle/resize-observer';

// This default value is used in our tests so that consumers of Polaris Viz don't need to mock or fire a ResizeObserver event
const defaultEntry =
  process.env.NODE_ENV === 'test'
    ? ({contentRect: {width: 500, height: 500}} as ResizeObserverEntry)
    : null;

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
  entry: ResizeObserverEntry | null;
} => {
  const [ref, setRef] = useState<T | null>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(defaultEntry);

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
