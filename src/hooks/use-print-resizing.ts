import {useLayoutEffect, useState} from 'react';

import type {Dimensions} from '../types';

export function usePrintResizing({
  ref,
  setChartDimensions,
}: {
  ref: HTMLElement | null;
  setChartDimensions: (value: React.SetStateAction<Dimensions | null>) => void;
}) {
  const [isPrinting, setIsPrinting] = useState(false);

  useLayoutEffect(() => {
    const isServer = typeof window === 'undefined';

    function handlePrint() {
      if (ref != null) {
        const {
          paddingRight,
          paddingLeft,
          paddingTop,
          paddingBottom,
        } = getComputedStyle(ref);
        const width =
          ref.clientWidth -
          parseInt(paddingLeft, 10) -
          parseInt(paddingRight, 10);
        const height =
          ref.clientHeight -
          parseInt(paddingTop, 10) -
          parseInt(paddingBottom, 10);
        setChartDimensions({width, height});

        setIsPrinting((isPrinting) => !isPrinting);
      }
    }

    const printSafari = () => {
      setTimeout(() => {
        handlePrint();
      });
    };

    const isChromium = navigator?.userAgent.includes('Chrome');
    const isSafari = navigator?.userAgent.includes('Safari') && !isChromium;
    const addEventListener =
      typeof window.matchMedia('print').addEventListener === 'function';
    // older versions of Safari break if we call addEventListener
    const addListener =
      typeof window.matchMedia('print').addListener === 'function';
    const notSafariOrServer = !isSafari && !isServer;
    const safariNotServer = isSafari && !isServer;

    if (notSafariOrServer) {
      window.matchMedia('print').addEventListener('change', handlePrint);
    }

    if (safariNotServer) {
      if (addEventListener) {
        window.matchMedia('print').addEventListener('change', printSafari);
      } else if (addListener) {
        window.matchMedia('print').addListener(printSafari);
      }
    }

    return () => {
      if (notSafariOrServer) {
        window.matchMedia('print').removeEventListener('change', handlePrint);
      }

      if (safariNotServer) {
        if (addEventListener) {
          window.matchMedia('print').removeEventListener('change', printSafari);
        } else if (addListener) {
          window.matchMedia('print').removeListener(printSafari);
        }
      }
    };
  }, [setChartDimensions, ref]);

  return {isPrinting};
}
