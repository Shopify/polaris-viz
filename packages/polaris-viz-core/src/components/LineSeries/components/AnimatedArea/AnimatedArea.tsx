import React, {useRef} from 'react';
import {useSpring} from '@react-spring/core';

import {LINES_LOAD_ANIMATION_CONFIG} from '../../../../';
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

  const {animatedLineShape} = useSpring({
    from: {
      animatedLineShape: areaGenerator(
        mounted.current ? fromData.data : zeroLineData,
      ),
    },
    to: {
      animatedLineShape: areaGenerator(toData.data),
    },
    delay,
    config: LINES_LOAD_ANIMATION_CONFIG,
    default: {immediate},
    onRest: () => (mounted.current = true),
  });

  return <Area areaPath={animatedLineShape} series={toData} type={type} />;
}
