import React, {useCallback, useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {SeriesColor} from 'types';
import {useTransition} from 'react-spring';

import {usePrefersReducedMotion} from '../../../../hooks';
import {Bar} from '../../../Bar';
import {LinearGradient} from '../../../LinearGradient';
import {BAR_SPACING} from '../../constants';
import {
  MIN_BAR_HEIGHT,
  BARS_TRANSITION_CONFIG,
  MASK_SUBDUE_COLOR,
  MASK_HIGHLIGHT_COLOR,
} from '../../../../constants';
import {
  getAnimationTrail,
  uniqueId,
  getColorValue,
} from '../../../../utilities';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  height: number;
  data: number[];
  colors: SeriesColor[];
  isSubdued: boolean;
  barGroupIndex: number;
  ariaLabel: string;
  onFocus: (index: number) => void;
  hasRoundedCorners: boolean;
  zeroAsMinHeight: boolean;
  isAnimated?: boolean;
  rotateZeroBars?: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  height,
  onFocus,
  barGroupIndex,
  ariaLabel,
  hasRoundedCorners,
  isSubdued,
  zeroAsMinHeight,
  isAnimated = false,
  rotateZeroBars = false,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const barWidth = width / data.length - BAR_SPACING;

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
      const needsMinHeight = zeroAsMinHeight
        ? rawHeight < MIN_BAR_HEIGHT
        : rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

      return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
    },
    [yScale, zeroAsMinHeight],
  );

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const transitions = useTransition(data, (dataPoint) => dataPoint, {
    from: {height: 0},
    leave: {height: 0},
    enter: (rawValue) => ({height: getBarHeight(rawValue)}),
    update: (rawValue) => ({height: getBarHeight(rawValue)}),
    immediate: !shouldAnimate,
    trail: shouldAnimate ? getAnimationTrail(data.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const gradients = colors.map((color) => {
    return typeof color === 'string'
      ? [
          {
            color: getColorValue(color),
            offset: 0,
          },
        ]
      : color;
  });

  return (
    <React.Fragment>
      <mask id={maskId}>
        {transitions.map(({item: value, props: {height}}, index) => {
          const handleFocus = () => {
            onFocus(barGroupIndex);
          };

          const ariaEnabledBar = index === 0;
          return (
            <g
              role={ariaEnabledBar ? 'listitem' : undefined}
              aria-hidden={!ariaEnabledBar}
              key={index}
            >
              <Bar
                height={height}
                color={isSubdued ? MASK_SUBDUE_COLOR : MASK_HIGHLIGHT_COLOR}
                x={x + (barWidth + BAR_SPACING) * index}
                yScale={yScale}
                rawValue={value}
                width={barWidth}
                index={index}
                onFocus={handleFocus}
                tabIndex={ariaEnabledBar ? 0 : -1}
                role={ariaEnabledBar ? 'img' : undefined}
                ariaLabel={ariaEnabledBar ? ariaLabel : undefined}
                hasRoundedCorners={hasRoundedCorners}
                rotateZeroBars={rotateZeroBars}
              />
            </g>
          );
        })}
      </mask>
      <g mask={`url(#${maskId})`}>
        {gradients.map((gradient, index) => {
          return (
            <g key={index}>
              <LinearGradient
                gradient={gradient}
                id={`${gradientId}${index}`}
              />
              <rect
                x={x + (barWidth + BAR_SPACING) * index}
                y={0}
                width={barWidth}
                height={height}
                fill={`url(#${gradientId}${index})`}
              />
              ;
            </g>
          );
        })}
      </g>
    </React.Fragment>
  );
}
