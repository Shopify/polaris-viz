import React, {useCallback, useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {LinearGradientWithStops} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../../../hooks';
import {Color, DataType} from '../../../../types';
import {Bar} from '../Bar';
import {BAR_SPACING} from '../../constants';
import {
  MIN_BAR_HEIGHT,
  LOAD_ANIMATION_DURATION,
  MASK_SUBDUE_COLOR,
  MASK_HIGHLIGHT_COLOR,
  BAR_ANIMATION_HEIGHT_BUFFER,
} from '../../../../constants';
import {clamp, uniqueId} from '../../../../utilities';
import styles from '../../Chart.scss';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  height: number;
  data: number[];
  colors: Color[];
  isSubdued: boolean;
  barGroupIndex: number;
  ariaLabel: string;
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
  barGroupIndex,
  ariaLabel,
  hasRoundedCorners,
  isSubdued,
  zeroAsMinHeight,
  isAnimated = false,
  rotateZeroBars = false,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const dataLength = clamp({amount: data.length, min: 1, max: Infinity});
  const barWidth = width / dataLength - BAR_SPACING;

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

  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const gradients = colors.map((color) => {
    return typeof color === 'string'
      ? [
          {
            color,
            offset: 0,
          },
        ]
      : color;
  });

  return (
    <React.Fragment>
      <mask id={maskId}>
        {data.map((rawValue, index) => {
          const ariaEnabledBar = index === 0;

          return (
            <g
              className={styles.BarGroup}
              role={ariaEnabledBar ? 'listitem' : undefined}
              aria-hidden={!ariaEnabledBar}
              data-type={DataType.BarGroup}
              data-index={barGroupIndex}
              tabIndex={index === 0 ? 0 : -1}
              aria-label={ariaEnabledBar ? ariaLabel : undefined}
              key={`${barGroupIndex}${index}`}
            >
              <Bar
                height={getBarHeight(rawValue)}
                color={isSubdued ? MASK_SUBDUE_COLOR : MASK_HIGHLIGHT_COLOR}
                x={x + (barWidth + BAR_SPACING) * index}
                zeroPosition={yScale(0)}
                rawValue={rawValue}
                width={barWidth}
                index={index}
                tabIndex={-1}
                role={ariaEnabledBar ? 'img' : undefined}
                hasRoundedCorners={hasRoundedCorners}
                rotateZeroBars={rotateZeroBars}
                animationDelay={
                  barGroupIndex * (LOAD_ANIMATION_DURATION / dataLength)
                }
                isAnimated={shouldAnimate}
              />
            </g>
          );
        })}
      </mask>
      <g mask={`url(#${maskId})`}>
        {gradients.map((gradient, index) => {
          return (
            <g key={`${maskId}${index}`}>
              <LinearGradientWithStops
                gradient={gradient}
                id={`${gradientId}${index}`}
              />
              <rect
                x={x + (barWidth + BAR_SPACING) * index}
                y={BAR_ANIMATION_HEIGHT_BUFFER * -1}
                width={barWidth}
                height={height + BAR_ANIMATION_HEIGHT_BUFFER * 2}
                fill={`url(#${gradientId}${index})`}
              />
            </g>
          );
        })}
      </g>
    </React.Fragment>
  );
}
