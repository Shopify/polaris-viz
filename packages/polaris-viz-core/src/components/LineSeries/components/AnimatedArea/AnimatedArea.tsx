import {useRef} from 'react';
import {useSpring} from '@react-spring/core';

import {useSpringConfig} from '../../../../hooks/useSpringConfig';
import {
  LINES_TRANSITION_CONFIG,
  LINES_LOAD_ANIMATION_CONFIG,
} from '../../../../constants';
import {Area} from '../Area';

export function AnimatedArea({
  immediate,
  fromData,
  toData,
  zeroLineData,
  delay,
  areaGenerator,
  type,
}) {
  const mounted = useRef(false);

  const springConfig = useSpringConfig({
    shouldAnimate: !immediate,
    animationDelay: delay,
    mountedSpringConfig: LINES_TRANSITION_CONFIG,
    unmountedSpringConfig: LINES_LOAD_ANIMATION_CONFIG,
  });

  const {animatedLineShape} = useSpring({
    from: {
      animatedLineShape: areaGenerator(
        mounted.current ? fromData.data : zeroLineData,
      ),
    },
    to: {
      animatedLineShape: areaGenerator(toData.data),
    },
    ...springConfig,
  });

  return <Area areaPath={animatedLineShape} series={toData} type={type} />;
}
