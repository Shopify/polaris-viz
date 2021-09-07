import React, {useCallback, useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {Color} from 'types';
import {useTransition} from '@react-spring/web';

import {usePrefersReducedMotion} from '../../../../hooks';
import {Bar} from '../../../Bar';
import {LinearGradient} from '../../../LinearGradient';
import {BAR_SPACING} from '../../constants';
import {
  MIN_BAR_HEIGHT,
  BARS_TRANSITION_CONFIG,
  SUBDUE_OPACITY,
} from '../../../../constants';
import {getAnimationTrail, uniqueId} from '../../../../utilities';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  data: number[];
  colors: Color[];
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

  const transitions = useTransition(data, {
    key: (dataPoint: number, index: number) =>
      `${index}-${barGroupIndex}${dataPoint}`,
    from: {height: 0},
    leave: {height: 0},
    enter: (rawValue) => ({height: getBarHeight(rawValue)}),
    update: (rawValue) => ({height: getBarHeight(rawValue)}),
    default: {immediate: !shouldAnimate},
    trail: shouldAnimate ? getAnimationTrail(data.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

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
      {transitions(({height}, value, _transition, index) => {
        const handleFocus = () => {
          onFocus(barGroupIndex);
        };

        const ariaEnabledBar = index === 0;
        return (
          <g
            role={ariaEnabledBar ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={`${barGroupIndex}${index}`}
            opacity={isSubdued ? SUBDUE_OPACITY : 1}
          >
            <Bar
              height={height}
              color={`url(#${gradientId}${index})`}
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
      <defs>
        {gradients.map((gradient, index) => {
          return (
            <g key={`${maskId}${index}`}>
              <LinearGradient
                gradient={gradient}
                id={`${gradientId}${index}`}
              />
            </g>
          );
        })}
      </defs>
    </React.Fragment>
  );
}
