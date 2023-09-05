import {Fragment, useRef} from 'react';
import {useSpring} from '@react-spring/core';

import {
  usePolarisVizContext,
  LINES_LOAD_ANIMATION_CONFIG,
  getColorVisionStylesForActiveIndex,
} from '../../../../';
import {useSpringConfig} from '../../../../hooks/useSpringConfig';
import {LINES_TRANSITION_CONFIG} from '../../../../constants';

export function AnimatedLine({
  immediate,
  fromData,
  toData,
  zeroLineData,
  delay,
  lineGenerator,
  activeLineIndex,
  index,
  strokeWidth,
  strokeDasharray,
  lastY,
  zeroLineY,
}) {
  const {
    components: {Path},
    animated,
  } = usePolarisVizContext();
  const AnimatedPath = animated(Path);

  const springConfig = useSpringConfig({
    shouldAnimate: !immediate,
    animationDelay: delay,
    mountedSpringConfig: LINES_TRANSITION_CONFIG,
    unmountedSpringConfig: LINES_LOAD_ANIMATION_CONFIG,
  });

  const mounted = useRef(false);

  const {animatedLineShape} = useSpring({
    from: {
      cy: mounted.current ? lastY : zeroLineY,
      animatedLineShape: lineGenerator(
        mounted.current ? fromData.data : zeroLineData,
      ),
    },
    to: {
      cy: lastY,
      animatedLineShape: lineGenerator(toData.data),
    },
    ...springConfig,
  });

  return (
    <Fragment>
      <AnimatedPath
        d={animatedLineShape}
        stroke="white"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{
          ...getColorVisionStylesForActiveIndex({
            activeIndex: activeLineIndex,
            index,
          }),
          strokeDasharray,
        }}
      />
    </Fragment>
  );
}
