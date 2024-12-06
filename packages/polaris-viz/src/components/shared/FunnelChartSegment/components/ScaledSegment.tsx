import type {ReactNode} from 'react';
import {Fragment} from 'react';
import {getRoundedRectPath} from '@shopify/polaris-viz-core';

import {InteractiveOverlay} from '../components/InteractiveOverlay';
import {
  FUNNEL_CHART_SEGMENT_FILL,
  FUNNEL_CHART_SEGMENT_SCALE_LIGHT,
  FUNNEL_CHART_SEGMENT_SCALE_SHADOW,
} from '../constants';

const FUNNEL_SEGMENT = {
  borderRadius: 6,
  scaleGap: 4,
  scaleHeightMultiplier: 4,
  topSegmentHeightRatio: 0.2,
  colors: {
    primary: FUNNEL_CHART_SEGMENT_FILL,
    scaleLight: FUNNEL_CHART_SEGMENT_SCALE_LIGHT,
    scaleShadow: FUNNEL_CHART_SEGMENT_SCALE_SHADOW,
    ripple: 'white',
  },
} as const;

interface Dimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface InteractionHandlers {
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

interface Props extends InteractionHandlers {
  barHeight: number;
  barWidth: number;
  index: number;
  isLast: boolean;
  x: number;
  drawableHeight: number;
  children: ReactNode;
}

const calculateTopSegmentHeight = (height: number) =>
  Math.floor(height * FUNNEL_SEGMENT.topSegmentHeightRatio);
const calculateScaleHeight = () =>
  FUNNEL_SEGMENT.scaleGap * FUNNEL_SEGMENT.scaleHeightMultiplier;

export function ScaledSegment({
  barHeight,
  barWidth,
  index,
  isLast,
  x,
  drawableHeight,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  const topSegmentHeight = calculateTopSegmentHeight(barHeight);
  const isFirst = index === 0;
  const dimensions: Dimensions = {
    width: barWidth,
    height: barHeight,
    x,
    y: drawableHeight - barHeight,
  };

  return (
    <Fragment>
      <g transform={`translate(${dimensions.x}, ${dimensions.y})`}>
        <TopSegment
          width={barWidth}
          height={topSegmentHeight}
          isFirst={isFirst}
          isLast={isLast}
        />
        <ScaleEffect width={barWidth} topSegmentHeight={topSegmentHeight} />
        <ScaleRipple topSegmentHeight={topSegmentHeight} />
        <BottomSegment
          width={barWidth}
          height={barHeight}
          topSegmentHeight={topSegmentHeight}
        />
        <InteractiveOverlay
          width={barWidth}
          height={barHeight}
          index={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </g>
      {children}
    </Fragment>
  );
}

interface TopSegmentProps {
  width: number;
  height: number;
  isFirst: boolean;
  isLast: boolean;
}

function TopSegment({width, height, isFirst, isLast}: TopSegmentProps) {
  const borderRadius = `${isFirst ? FUNNEL_SEGMENT.borderRadius : 0} ${
    isLast ? FUNNEL_SEGMENT.borderRadius : 0
  } 0 0`;

  return (
    <path
      d={getRoundedRectPath({
        width,
        height,
        borderRadius,
      })}
      fill={FUNNEL_SEGMENT.colors.primary}
    />
  );
}

interface BottomSegmentProps {
  width: number;
  height: number;
  topSegmentHeight: number;
}

function BottomSegment({width, height, topSegmentHeight}: BottomSegmentProps) {
  const scaleHeight = calculateScaleHeight();
  const y = topSegmentHeight + scaleHeight;
  const segmentHeight = height - topSegmentHeight - scaleHeight;

  return (
    <rect
      x={0}
      y={y}
      width={width}
      height={segmentHeight}
      fill={FUNNEL_SEGMENT.colors.primary}
    />
  );
}

interface ScaleEffectProps {
  width: number;
  topSegmentHeight: number;
}

function ScaleEffect({width, topSegmentHeight}: ScaleEffectProps) {
  const scalePattern = [
    FUNNEL_SEGMENT.colors.scaleLight,
    FUNNEL_SEGMENT.colors.scaleShadow,
    FUNNEL_SEGMENT.colors.scaleLight,
    FUNNEL_SEGMENT.colors.scaleShadow,
  ];

  return (
    <g transform={`translate(0, ${topSegmentHeight})`}>
      {scalePattern.map((fill, index) => (
        <rect
          key={`scale-effect-${index}`}
          x={0}
          y={FUNNEL_SEGMENT.scaleGap * index}
          width={width}
          height={FUNNEL_SEGMENT.scaleGap}
          fill={fill}
        />
      ))}
    </g>
  );
}

interface ScaleRippleProps {
  topSegmentHeight: number;
}

function ScaleRipple({topSegmentHeight}: ScaleRippleProps) {
  const {scaleGap} = FUNNEL_SEGMENT;
  const rippleWidth = scaleGap * 1.5;

  const createRipplePath = (startY: number, endY: number) =>
    `M ${rippleWidth},${startY} L 0,${endY} L 0,${startY + scaleGap} Z`;

  return (
    <g transform={`translate(0, ${topSegmentHeight})`}>
      <path
        d={createRipplePath(scaleGap, 0)}
        fill={FUNNEL_SEGMENT.colors.ripple}
      />
      <path
        d={createRipplePath(scaleGap * 3, scaleGap * 2)}
        fill={FUNNEL_SEGMENT.colors.ripple}
      />
    </g>
  );
}
