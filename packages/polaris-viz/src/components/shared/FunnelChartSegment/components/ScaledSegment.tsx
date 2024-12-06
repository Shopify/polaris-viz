import type {ReactNode} from 'react';
import {Fragment, useState} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {getRoundedRectPath, useChartContext} from '@shopify/polaris-viz-core';

import {InteractiveOverlay} from '../components/InteractiveOverlay';
import {
  FUNNEL_CHART_SEGMENT_FILL,
  FUNNEL_CHART_SEGMENT_SCALE_LIGHT,
  FUNNEL_CHART_SEGMENT_SCALE_SHADOW,
} from '../constants';

const FUNNEL_SEGMENT = {
  minBorderRadius: 3,
  maxBorderRadius: 6,
  borderRadiusRatio: 0.03,
  scaleGap: 4,
  scaleStartRatio: 0.2,
  heightScaleFactor: 0.015,
  widthScaleFactor: 0.005,
  borderRadiusHeightThreshold: 200,
  colors: {
    primary: FUNNEL_CHART_SEGMENT_FILL,
    scaleLight: FUNNEL_CHART_SEGMENT_SCALE_LIGHT,
    scaleShadow: FUNNEL_CHART_SEGMENT_SCALE_SHADOW,
    ripple: 'white',
  },
};

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
  children: ReactNode;
}

export function ScaledSegment({
  barHeight,
  barWidth,
  index,
  isLast,
  x,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  const {containerBounds} = useChartContext();
  const {width: drawableWidth, height: drawableHeight} = containerBounds ?? {
    height: 0,
    width: 0,
  };
  const [hasAnimated, setHasAnimated] = useState(false);

  const scaleStripeHeight = calculateResponsiveScale(
    drawableHeight,
    drawableWidth,
  );
  const totalScaleHeight = scaleStripeHeight * 4;

  const springs = useSpring({
    from: {height: 0},
    to: {height: barHeight},
    delay: index * 100,
  });

  const scaleSpring = useSpring({
    from: {
      opacity: 0,
      scaleStripeHeight: 0,
    },
    to: {
      opacity: 1,
      scaleStripeHeight: totalScaleHeight,
    },
    config: {
      mass: 1,
      tension: 400,
      friction: 15,
    },
    delay: index * 100 + 700,
    onRest: () => setHasAnimated(true),
  });

  const isFirst = index === 0;

  const scaleStartHeight = calculateScaleStartHeight(barHeight);

  const dynamicBorderRadius = Math.min(
    Math.max(
      Math.round(drawableHeight * FUNNEL_SEGMENT.borderRadiusRatio),
      FUNNEL_SEGMENT.minBorderRadius,
    ),
    FUNNEL_SEGMENT.maxBorderRadius,
  );

  const fullSegmentMarkup = (
    <animated.path
      d={springs.height.to((height) =>
        getRoundedRectPath({
          width: barWidth,
          height,
          borderRadius: `${isFirst ? dynamicBorderRadius : 0} ${
            isLast ? dynamicBorderRadius : 0
          } 0 0`,
        }),
      )}
      fill={FUNNEL_SEGMENT.colors.primary}
    />
  );

  const scalePattern = [
    FUNNEL_SEGMENT.colors.scaleLight,
    FUNNEL_SEGMENT.colors.scaleShadow,
    FUNNEL_SEGMENT.colors.scaleLight,
    FUNNEL_SEGMENT.colors.scaleShadow,
  ];

  const scaleEffectMarkup = (
    <animated.g
      style={{opacity: scaleSpring.opacity}}
      transform={`translate(0, ${scaleStartHeight})`}
    >
      {scalePattern.map((fill, scaleIndex) =>
        hasAnimated ? (
          <rect
            key={`scale-effect-${scaleIndex}`}
            x={0}
            y={scaleStripeHeight * scaleIndex}
            width={barWidth}
            height={scaleStripeHeight}
            fill={fill}
          />
        ) : (
          <animated.rect
            key={`scale-effect-${scaleIndex}`}
            x={0}
            y={scaleSpring.scaleStripeHeight.to(
              (height) => (height / 4) * scaleIndex,
            )}
            width={barWidth}
            height={scaleSpring.scaleStripeHeight.to((height) => height / 4)}
            fill={fill}
          />
        ),
      )}
    </animated.g>
  );

  const getRipplePath = (
    scaleStripeHeight: number,
    verticalOffset: number,
    height: number = scaleStripeHeight * 2,
  ) => {
    return `M ${scaleStripeHeight * 1.5},${scaleStripeHeight + verticalOffset}
            L 0,${verticalOffset}
            L 0,${verticalOffset + height} Z`;
  };

  const scaleRippleMarkup = (
    <animated.g
      style={{opacity: scaleSpring.opacity}}
      transform={`translate(0, ${scaleStartHeight})`}
    >
      {hasAnimated ? (
        <Fragment>
          <path
            d={getRipplePath(scaleStripeHeight, 0)}
            fill={FUNNEL_SEGMENT.colors.ripple}
          />
          <path
            d={getRipplePath(scaleStripeHeight, scaleStripeHeight * 2)}
            fill={FUNNEL_SEGMENT.colors.ripple}
          />
        </Fragment>
      ) : (
        <Fragment>
          <animated.path
            d={scaleSpring.scaleStripeHeight.to((height) =>
              getRipplePath(scaleStripeHeight, 0, height / 2),
            )}
            fill={FUNNEL_SEGMENT.colors.ripple}
          />
          <animated.path
            d={scaleSpring.scaleStripeHeight.to((height) =>
              getRipplePath(
                scaleStripeHeight,
                scaleStripeHeight * 2,
                height / 2,
              ),
            )}
            fill={FUNNEL_SEGMENT.colors.ripple}
          />
        </Fragment>
      )}
    </animated.g>
  );

  return (
    <Fragment>
      <animated.g
        style={{
          transform: springs.height.to(
            (height) => `translate(${x}px, ${drawableHeight - height}px)`,
          ),
        }}
      >
        {fullSegmentMarkup}
        {scaleEffectMarkup}
        {scaleRippleMarkup}
        <InteractiveOverlay
          width={barWidth}
          height={barHeight}
          index={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </animated.g>
      {children}
    </Fragment>
  );
}

const calculateScaleStartHeight = (height: number) =>
  Math.floor(height * FUNNEL_SEGMENT.scaleStartRatio);

const calculateResponsiveScale = (
  drawableHeight: number,
  drawableWidth: number,
) => {
  const heightScale = drawableHeight * FUNNEL_SEGMENT.heightScaleFactor;
  const widthScale = drawableWidth * FUNNEL_SEGMENT.widthScaleFactor;
  const scale = Math.max((heightScale + widthScale) / 2, 1);
  return scale;
};
