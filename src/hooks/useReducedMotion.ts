import {Globals} from '@react-spring/web';
import {useEffect} from 'react';

import {usePrefersReducedMotion} from './usePrefersReducedMotion';

export function useReducedMotion(isAnimated = true) {
  const {prefersReducedMotion} = usePrefersReducedMotion();

  useEffect(() => {
    Globals.assign({
      skipAnimation: !isAnimated || prefersReducedMotion,
    });
  }, [isAnimated, prefersReducedMotion]);
}
