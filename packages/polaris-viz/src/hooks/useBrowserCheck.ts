import {useMemo} from 'react';

export function useBrowserCheck() {
  const userAgent = navigator?.userAgent;

  return useMemo(() => {
    const isFirefox = userAgent.includes('Firefox');
    const isChromium = userAgent.includes('Chrome');
    const isSafari = userAgent.includes('Safari') && !isChromium;

    return {isFirefox, isChromium, isSafari};
  }, [userAgent]);
}
