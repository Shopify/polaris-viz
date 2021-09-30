import React, {useCallback, useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {Color} from 'types';

import {Bar} from '../../../Bar';
import {LinearGradient} from '../../../LinearGradient';
import {BAR_SPACING} from '../../constants';
import {
  MIN_BAR_HEIGHT,
  LOAD_ANIMATION_DURATION,
  MASK_SUBDUE_COLOR,
  MASK_HIGHLIGHT_COLOR,
  BAR_ANIMATION_HEIGHT_BUFFER,
} from '../../../../constants';
import {uniqueId} from '../../../../utilities';

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
  onFocus: (index: number) => void;
  hasRoundedCorners: boolean;
  zeroAsMinHeight: boolean;
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
  rotateZeroBars = false,
}: Props) {
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
          const handleFocus = () => {
            onFocus(barGroupIndex);
          };

          const ariaEnabledBar = index === 0;
          return (
            <g
              role={ariaEnabledBar ? 'listitem' : undefined}
              aria-hidden={!ariaEnabledBar}
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
                onFocus={handleFocus}
                tabIndex={ariaEnabledBar ? 0 : -1}
                role={ariaEnabledBar ? 'img' : undefined}
                ariaLabel={ariaEnabledBar ? ariaLabel : undefined}
                hasRoundedCorners={hasRoundedCorners}
                rotateZeroBars={rotateZeroBars}
                animationDelay={
                  barGroupIndex * (LOAD_ANIMATION_DURATION / data.length)
                }
              />
            </g>
          );
        })}
      </mask>
      <g mask={`url(#${maskId})`}>
        {gradients.map((gradient, index) => {
          return (
            <g key={`${maskId}${index}`}>
              <LinearGradient
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
