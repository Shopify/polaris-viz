import type {ReactNode} from 'react';
import {Fragment, useRef} from 'react';
import {useSpring} from '@react-spring/web';
import {useChartContext} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';

import {InteractiveOverlay} from './components/InteractiveOverlay';
import {ScaledSegment} from './components/ScaledSegment';
import {AnimatedSegment} from './components/AnimatedSegment';

interface Props {
  ariaLabel: string;
  barHeight: number;
  barWidth: number;
  children: ReactNode;
  index: number;
  isLast: boolean;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  shouldApplyScaling: boolean;
  x: number;
}

export function FunnelChartSegment({
  ariaLabel,
  barHeight,
  barWidth,
  children,
  index = 0,
  isLast,
  onMouseEnter,
  onMouseLeave,
  shouldApplyScaling,
  x,
}: Props) {
  const mounted = useRef(false);
  const {containerBounds} = useChartContext();
  const isFirst = index === 0;
  const {height: drawableHeight} = containerBounds ?? {
    height: 0,
  };

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
