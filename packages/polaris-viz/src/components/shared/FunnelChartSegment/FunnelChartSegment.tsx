import type {ReactNode} from 'react';
import {Fragment, useRef} from 'react';
import type {SpringValue} from '@react-spring/web';
import {useSpring, animated} from '@react-spring/web';
import {getRoundedRectPath} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import {InteractiveOverlay} from './components/InteractiveOverlay';
import {ScaledSegment} from './components/ScaledSegment';
import {FUNNEL_CHART_SEGMENT_FILL, BORDER_RADIUS} from './constants';

interface Props {
  ariaLabel: string;
  barHeight: number;
  barWidth: number;
  children: ReactNode;
  drawableHeight: number;
  index: number;
  isLast: boolean;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  shouldApplyScaling: boolean;
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
  shouldApplyScaling,
  x,
}: Props) {
  const mounted = useRef(false);
  const isFirst = index === 0;

  const springConfig = useBarSpringConfig({
    animationDelay: index * 150,
  });

  const {animatedHeight} = useSpring({
    from: {
      animatedHeight: mounted.current ? barHeight : 0,
    },
    to: {
      animatedHeight: barHeight,
    },
    ...springConfig,
  });

  if (shouldApplyScaling && isFirst) {
    return (
      <ScaledSegment
        barHeight={barHeight}
        barWidth={barWidth}
        drawableHeight={drawableHeight}
        index={index}
        isLast={isLast}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        x={x}
      >
        {children}
      </ScaledSegment>
    );
  }

  return (
    <Fragment>
      <AnimatedSegment
        animatedHeight={animatedHeight}
        ariaLabel={ariaLabel}
        barWidth={barWidth}
        drawableHeight={drawableHeight}
        isFirst={isFirst}
        isLast={isLast}
        x={x}
      />
      <InteractiveOverlay
        width={barWidth}
        height={barHeight}
        index={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        x={x}
        y={drawableHeight - barHeight}
      />
      {children}
    </Fragment>
  );
}

interface AnimatedSegmentProps {
  animatedHeight: SpringValue<number>;
  ariaLabel: string;
  barWidth: number;
  drawableHeight: number;
  isFirst: boolean;
  isLast: boolean;
  x: number;
}

function AnimatedSegment({
  animatedHeight,
  ariaLabel,
  barWidth,
  drawableHeight,
  isFirst,
  isLast,
  x,
}: AnimatedSegmentProps) {
  const borderRadius = `${isFirst ? BORDER_RADIUS : 0} ${
    isLast ? BORDER_RADIUS : 0
  } 0 0`;

  return (
    <animated.path
      aria-label={ariaLabel}
      d={animatedHeight.to((value: number) =>
        getRoundedRectPath({
          height: value,
          width: barWidth,
          borderRadius,
        }),
      )}
      fill={FUNNEL_CHART_SEGMENT_FILL}
      style={{
        transform: animatedHeight.to(
          (value: number) => `translate(${x}px, ${drawableHeight - value}px)`,
        ),
      }}
      width={barWidth}
    />
  );
}
