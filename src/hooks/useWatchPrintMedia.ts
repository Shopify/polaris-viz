import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import type {Dimensions} from 'types';

import {useCallbackRef} from './useCallbackRef';

// Watch for media query changes on the window.
export function useWatchPrintMedia(
  callback: (event: MediaQueryListEvent) => void,
) {
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const isServer = typeof window === 'undefined';
    const matchMedia = window.matchMedia('print');

    if (!isServer) {
      if (typeof matchMedia.addEventListener === 'function') {
        matchMedia.addEventListener('change', callbackRef);
      } else if (typeof matchMedia.addListener === 'function') {
        matchMedia.addListener(callbackRef);
      }
    }

    return () => {
      if (!isServer) {
        if (typeof matchMedia.addEventListener === 'function') {
          matchMedia.removeEventListener('change', callbackRef);
        } else if (typeof matchMedia.addListener === 'function') {
          matchMedia.removeListener(callbackRef);
        }
      }
    };
  }, [callbackRef]);
}

export const IS_SAFARI =
  navigator.userAgent.includes('Safari') &&
  navigator.vendor.includes('Apple Computer');

// Resize charts when the user is trying to print the screen.
// Chart is sized onbeforeprint and then resized to it's original
// position onafterprint.
export function useResizeChartForPrint(
  ref: HTMLElement | null,
  dimensions: Dimensions | null,
  setDimensions: Dispatch<SetStateAction<Dimensions | null>>,
) {
  const previousSizeRef = useRef<Dimensions | null>(null);

  useWatchPrintMedia((event: MediaQueryListEvent) => {
    if (!ref) {
      return;
    }

    if (event.matches) {
      previousSizeRef.current = dimensions;

      if (IS_SAFARI) {
        setTimeout(() => setDimensions(ref.getBoundingClientRect()));
      } else {
        setDimensions(ref.getBoundingClientRect());
      }
    } else {
      setDimensions(previousSizeRef.current);
    }
  });
}
