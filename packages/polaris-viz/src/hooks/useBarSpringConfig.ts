import {
  BARS_LOAD_ANIMATION_CONFIG,
  BARS_TRANSITION_CONFIG,
  useChartContext,
  useSpringConfig,
} from '@shopify/polaris-viz-core';

interface Props {
  animationDelay?: number;
}

export function useBarSpringConfig({animationDelay = 0}: Props) {
  const {shouldAnimate} = useChartContext();

  return useSpringConfig({
    animationDelay: shouldAnimate ? animationDelay : 0,
    shouldAnimate,
    unmountedSpringConfig: BARS_LOAD_ANIMATION_CONFIG,
    mountedSpringConfig: BARS_TRANSITION_CONFIG,
  });
}
