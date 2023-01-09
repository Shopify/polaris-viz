import {animated, useSpring} from '@react-spring/web';
import {
  getColorVisionStylesForActiveIndex,
  usePrevious,
} from '@shopify/polaris-viz-core';

import type {LineChartRelationalDataSeries} from '../../types';

export interface AreaProps {
  activeIndex: number;
  fill: string;
  getAreaGenerator: (series: LineChartRelationalDataSeries) => string | null;
  index: number;
  series: LineChartRelationalDataSeries;
  hiddenIndexes?: number[];
  shouldAnimate?: boolean;
}

export function Area({
  activeIndex,
  fill,
  getAreaGenerator,
  hiddenIndexes = [],
  index,
  series,
  shouldAnimate = false,
}: AreaProps) {
  const pathD = getAreaGenerator(series);
  const previous = usePrevious(pathD);

  const spring = useSpring<{pathD: string}>({
    from: {
      pathD: previous,
    },
    to: {
      pathD,
    },
    immediate: !shouldAnimate,
  });

  if (hiddenIndexes.includes(index)) {
    return null;
  }

  if (hiddenIndexes.includes(series.metadata?.relatedIndex ?? -1)) {
    return null;
  }

  if (pathD == null) {
    return null;
  }

  return (
    <animated.path
      d={spring.pathD}
      fill={fill}
      style={{
        ...getColorVisionStylesForActiveIndex({
          activeIndex,
          index: -1,
          fadedOpacity: 0.2,
        }),
      }}
    />
  );
}
