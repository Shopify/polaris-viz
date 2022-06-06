import {useEffect} from 'react';

import {useCallbackRef} from './useCallbackRef';

interface Props {
  onBlur: (event: Event) => void;
  ref: SVGElement | null;
  checkFn?: (activeElement: Element | null) => boolean;
}

export function useSVGBlurEvent({checkFn = () => true, onBlur, ref}: Props) {
  const checkFnCallback = useCallbackRef(checkFn);

  useEffect(() => {
    const handleBlur = (event: UIEvent) => {
      const currentTarget = event.currentTarget;

      requestAnimationFrame(() => {
        if (
          !(currentTarget as SVGElement).contains(document.activeElement) &&
          checkFnCallback(document.activeElement)
        ) {
          onBlur(event);
        }
      });
    };

    ref?.addEventListener('focusout', handleBlur);

    return () => {
      ref?.removeEventListener('focusout', handleBlur);
    };
  }, [checkFnCallback, onBlur, ref]);
}
