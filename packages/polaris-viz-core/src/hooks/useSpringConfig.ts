import {useRef} from 'react';
import type {SpringConfig} from '@react-spring/web';

interface Props {
  animationDelay?: number;
  shouldAnimate?: boolean;
  mountedSpringConfig?: SpringConfig;
  unmountedSpringConfig?: SpringConfig;
}

export function useSpringConfig({
  animationDelay = 0,
  shouldAnimate = true,
  mountedSpringConfig,
  unmountedSpringConfig,
}: Props) {
  const isMounted = useRef(false);

  const delay = shouldAnimate ? animationDelay : 0;

  return {
    config: isMounted.current ? mountedSpringConfig : unmountedSpringConfig,
    default: {immediate: !shouldAnimate},
    delay: isMounted.current ? 0 : delay,
    onRest: () => (isMounted.current = true),
  };
}
