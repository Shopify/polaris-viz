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
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
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

  const topSegmentMarkup = (
    <path
      d={getRoundedRectPath({
        width: barWidth,
        height: topSegmentHeight,
        borderRadius: `${isFirst ? FUNNEL_SEGMENT.borderRadius : 0} ${
          isLast ? FUNNEL_SEGMENT.borderRadius : 0
        } 0 0`,
      })}
      fill={FUNNEL_SEGMENT.colors.primary}
    />
  );

  const scaleSize = calculateResponsiveScale(drawableHeight);
  const calculateScaleHeight = () =>
    scaleSize * FUNNEL_SEGMENT.scaleHeightMultiplier;

  const scaleEffectMarkup = (
    <g transform={`translate(0, ${topSegmentHeight})`}>
      {[
        FUNNEL_SEGMENT.colors.scaleLight,
        FUNNEL_SEGMENT.colors.scaleShadow,
        FUNNEL_SEGMENT.colors.scaleLight,
        FUNNEL_SEGMENT.colors.scaleShadow,
      ].map((fill, index) => (
        <rect
          key={`scale-effect-${index}`}
          x={0}
          y={scaleSize * index}
          width={barWidth}
          height={scaleSize}
          fill={fill}
        />
      ))}
    </g>
  );

  const scaleRippleMarkup = (
    <g transform={`translate(0, ${topSegmentHeight})`}>
      <path
        d={`M ${scaleSize * 1.5},${scaleSize} L 0,0 L 0,${scaleSize * 2} Z`}
        fill={FUNNEL_SEGMENT.colors.ripple}
      />
      <path
        d={`M ${scaleSize * 1.5},${scaleSize * 3} L 0,${scaleSize * 2} L 0,${
          scaleSize * 4
        } Z`}
        fill={FUNNEL_SEGMENT.colors.ripple}
      />
    </g>
  );

  const bottomSegmentMarkup = (
    <rect
      x={0}
      y={topSegmentHeight + calculateScaleHeight()}
      width={barWidth}
      height={barHeight - topSegmentHeight - calculateScaleHeight()}
      fill={FUNNEL_SEGMENT.colors.primary}
    />
  );

  return (
    <Fragment>
      <g transform={`translate(${dimensions.x}, ${dimensions.y})`}>
        {topSegmentMarkup}
        {scaleEffectMarkup}
        {scaleRippleMarkup}
        {bottomSegmentMarkup}
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

const calculateTopSegmentHeight = (height: number) =>
  Math.floor(height * FUNNEL_SEGMENT.topSegmentHeightRatio);

const calculateResponsiveScale = (drawableHeight: number) => {
  // Scale will be 1.5% of the drawable height, with a minimum of 2px
  const scale = Math.max(drawableHeight * 0.015, 2);
  return scale;
};
