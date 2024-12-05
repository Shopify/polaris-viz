import type {ReactNode} from 'react';
import {Fragment, useRef} from 'react';
import {useSpring, animated} from '@react-spring/web';
import {getRoundedRectPath} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import {FUNNEL_CHART_SEGMENT_FILL} from './constants';

const BORDER_RADIUS = 6;

export interface Props {
  ariaLabel: string;
  barHeight: number;
  barWidth: number;
  children: ReactNode;
  drawableHeight: number;
  index: number;
  isLast: boolean;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  tallestBarHeight: number;
  x: number;
}

export function FunnelChartSegment({
  ariaLabel,
  barHeight,
  barWidth,
  children,
  drawableHeight,
  index = 0,
  isLast,
  onMouseEnter,
  onMouseLeave,
  tallestBarHeight,
  x,
}: Props) {
  const mounted = useRef(false);

  const springConfig = useBarSpringConfig({animationDelay: index * 150});
  const isFirst = index === 0;

  const {animatedHeight} = useSpring({
    from: {
      animatedHeight: mounted.current ? barHeight : 0,
    },
    to: {
      animatedHeight: barHeight,
    },
    ...springConfig,
  });

  return (
    <Fragment>
      <animated.path
        aria-label={ariaLabel}
        fill={FUNNEL_CHART_SEGMENT_FILL}
        width={barWidth}
        d={animatedHeight.to((value: number) =>
          getRoundedRectPath({
            height: value,
            width: barWidth,
            borderRadius: `${isFirst ? BORDER_RADIUS : 0} ${
              isLast ? BORDER_RADIUS : 0
            } 0 0`,
          }),
        )}
        style={{
          transform: animatedHeight.to(
            (value: number) => `translate(${x}px, ${drawableHeight - value}px)`,
          ),
        }}
      />

      <rect
        x={x}
        y={drawableHeight - barHeight}
        width={barWidth}
        height={barHeight}
        fill="transparent"
        style={{
          outline: 'none',
        }}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        onFocus={() => onMouseEnter(index)}
        tabIndex={0}
      />

      {children}
    </Fragment>
  );
}
