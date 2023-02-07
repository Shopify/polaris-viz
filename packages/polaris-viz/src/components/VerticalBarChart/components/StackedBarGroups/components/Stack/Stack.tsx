import {useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  BARS_TRANSITION_CONFIG,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  getRoundedRectPath,
  useChartContext,
} from '@shopify/polaris-viz-core';
import {useSpring, animated} from '@react-spring/web';

import type {
  FormattedStackedSeries,
  StackedBarGapDirections,
} from '../../../../../../types';
import {
  getBorderRadiusForStackedValues,
  getYPosition,
} from '../../../../utilities';
import {getGradientDefId} from '../../../../../../components/shared';
import {useWatchColorVisionEvents} from '../../../../../../hooks';
import {STACKED_BAR_GAP} from '../../../../../../constants';

import styles from './Stack.scss';

interface StackProps {
  activeBarGroup: number;
  animationDelay: number;
  data: FormattedStackedSeries;
  gaps: {[key: number]: StackedBarGapDirections};
  groupIndex: number;
  id: string;
  width: number;
  x: number | undefined;
  yScale: ScaleLinear<number, number>;
}

export function Stack({
  activeBarGroup,
  animationDelay,
  data,
  gaps,
  groupIndex,
  id,
  width,
  x,
  yScale,
}: StackProps) {
  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const {theme, shouldAnimate} = useChartContext();

  const keys = data[0] ? Object.keys(data[0].data) : [];

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (
        detail.index === -1 ||
        activeBarGroup === -1 ||
        activeBarGroup === groupIndex
      ) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  const {transform} = useSpring({
    from: {
      transform: `scale(1, 0)`,
    },
    to: {
      transform: `scale(1, 1)`,
    },
    config: BARS_TRANSITION_CONFIG,
    delay: animationDelay,
    default: {immediate: !shouldAnimate},
  });

  return (
    <animated.g style={{transform, transformOrigin: `0px ${yScale(0)}px`}}>
      {data.map((data, index) => {
        const [start, end] = data;

        const height = Math.abs(yScale(end) - yScale(start));
        const values = data.data ? Object.values(data.data) : [];
        const ariaLabel = `${keys[index]} ${values[index]}`;

        const pathD = getRoundedRectPath({
          height,
          width,
          borderRadius: getBorderRadiusForStackedValues(values, index),
        });

        const y = getYPosition({
          start,
          end,
          groupIndex: index,
          gaps: gaps[groupIndex],
          yScale,
        });

        return (
          <g key={`${groupIndex}-${index}`} aria-hidden="true">
            <path
              fill={`url(#${getGradientDefId(theme, index, id)})`}
              d={pathD}
              key={index}
              transform={`translate(${x},${y})`}
              style={getColorVisionStylesForActiveIndex({
                activeIndex: activeBarIndex,
                index,
              })}
              aria-hidden="true"
            />
            <rect
              className={styles.Bar}
              fill="transparent"
              height={height + STACKED_BAR_GAP}
              width={width}
              transform={`translate(${x},${y})`}
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index,
              })}
              tabIndex={-1}
              role="listitem"
              aria-label={ariaLabel}
            />
          </g>
        );
      })}
    </animated.g>
  );
}
