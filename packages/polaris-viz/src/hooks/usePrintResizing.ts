import type {Dispatch} from 'react';
import {useLayoutEffect, useState} from 'react';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {useBrowserCheck} from './useBrowserCheck';

interface Props {
  ref: HTMLElement | null;
  setContainerBounds: (value: React.SetStateAction<Dimensions | null>) => void;
  onIsPrintingChange: Dispatch<React.SetStateAction<boolean>>;
}

export function usePrintResizing({
  ref,
  setContainerBounds,
  onIsPrintingChange,
}: Props) {
  const [isPrinting, setIsPrinting] = useState(false);
  const {isFirefox, isSafari} = useBrowserCheck();

  useLayoutEffect(() => {
    const isServer = typeof window === 'undefined';

    function handlePrint() {
      if (ref != null) {
        const {paddingRight, paddingLeft, paddingTop, paddingBottom} =
          getComputedStyle(ref);
        const width =
          ref.clientWidth -
          parseInt(paddingLeft, 10) -
          parseInt(paddingRight, 10);
        const height =
          ref.clientHeight -
          parseInt(paddingTop, 10) -
          parseInt(paddingBottom, 10);
        setContainerBounds({width, height});

        setIsPrinting((isPrinting) => {
          const newIsPrinting = !isPrinting;
          onIsPrintingChange(newIsPrinting);
          return newIsPrinting;
        });
      }
    }

    const printSafari = () => {
      setTimeout(() => {
        handlePrint();
      });
    };

    const addEventListener =
      typeof window.matchMedia('print').addEventListener === 'function';
    // older versions of Safari break if we call addEventListener
    const addListener =
      typeof window.matchMedia('print').addListener === 'function';
    const notSafariOrServer = !isSafari && !isServer;
    const safariNotServer = isSafari && !isServer;

    if (isFirefox) {
      window.addEventListener('beforeprint', handlePrint);
      window.addEventListener('afterprint', handlePrint);
    }

    if (notSafariOrServer) {
      if (addEventListener) {
        window.matchMedia('print').addEventListener('change', handlePrint);
      } else if (addListener) {
        window.matchMedia('print').addListener(printSafari);
      }
    }

    if (safariNotServer) {
      if (addEventListener) {
        window.matchMedia('print').addEventListener('change', printSafari);
      } else if (addListener) {
        window.matchMedia('print').addListener(printSafari);
      }
    }

    return () => {
      if (isFirefox) {
        window.removeEventListener('beforeprint', handlePrint);
        window.removeEventListener('afterprint', handlePrint);
      }

      if (notSafariOrServer) {
        if (addEventListener) {
          window.matchMedia('print').removeEventListener('change', handlePrint);
        } else if (addListener) {
          window.matchMedia('print').removeListener(printSafari);
        }
      }

      if (safariNotServer) {
        if (addEventListener) {
          window.matchMedia('print').removeEventListener('change', printSafari);
        } else if (addListener) {
          window.matchMedia('print').removeListener(printSafari);
        }
      }
    };
  }, [onIsPrintingChange, setContainerBounds, ref, isFirefox, isSafari]);

  return {isPrinting};
}
