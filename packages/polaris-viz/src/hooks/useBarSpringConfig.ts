import {useRef} from 'react';
import {
  BARS_LOAD_ANIMATION_CONFIG,
  BARS_TRANSITION_CONFIG,
  useChartContext,
} from '@shopify/polaris-viz-core';

interface Props {
  animationDelay?: number;
}

export function useBarSpringConfig({animationDelay = 0}: Props) {
  const isMounted = useRef(false);
  const {shouldAnimate} = useChartContext();

  return {
    config: isMounted.current
      ? BARS_TRANSITION_CONFIG
      : BARS_LOAD_ANIMATION_CONFIG,
    default: {immediate: !shouldAnimate},
    delay: isMounted.current ? 0 : animationDelay,
    onRest: () => (isMounted.current = true),
  };
}
