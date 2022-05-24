import React, {useCallback, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  uniqueId,
  LinearGradientWithStops,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
  COLOR_VISION_GROUP_ITEM,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  clamp,
  BORDER_RADIUS,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';

import type {AccessibilitySeries} from '../../../VerticalBarChart/types';
import {formatAriaLabel} from '../../utilities';
import {
  usePrefersReducedMotion,
  useWatchColorVisionEvents,
} from '../../../../hooks';
import {Bar} from '../Bar';
import {BAR_SPACING} from '../../constants';
import {
  MIN_BAR_HEIGHT,
  LOAD_ANIMATION_DURATION,
  MASK_HIGHLIGHT_COLOR,
  BAR_ANIMATION_HEIGHT_BUFFER,
} from '../../../../constants';
import styles from '../../Chart.scss';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  height: number;
  data: number[];
  colors: Color[];
  barGroupIndex: number;
  hasRoundedCorners: boolean;
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  zeroAsMinHeight: boolean;
  gapWidth: number;
  isAnimated?: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  height,
  barGroupIndex,
  hasRoundedCorners,
  zeroAsMinHeight,
  isAnimated = false,
  accessibilityData,
  activeBarGroup,
  gapWidth,
}: Props) {
  const groupAriaLabel = formatAriaLabel(accessibilityData[barGroupIndex]);

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (
        detail.index === -1 ||
        activeBarGroup === -1 ||
        activeBarGroup === barGroupIndex
      ) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  const dataLength = clamp({amount: data.length, min: 1, max: Infinity});
  const barWidth = width / dataLength;

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
          return (
            <g
              className={styles.BarGroup}
              data-type={DataType.BarGroup}
              data-index={barGroupIndex}
              key={`${barGroupIndex}${index}`}
              style={getColorVisionStylesForActiveIndex({
                activeIndex: activeBarGroup,
                index: barGroupIndex,
              })}
            >
              <Bar
                height={getBarHeight(rawValue)}
                color={MASK_HIGHLIGHT_COLOR}
                x={x + (barWidth + BAR_SPACING) * index}
                zeroPosition={yScale(0)}
                rawValue={rawValue}
                width={barWidth}
                index={index}
                borderRadius={
                  hasRoundedCorners ? BORDER_RADIUS.Top : BORDER_RADIUS.None
                }
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
                width={barWidth - BAR_SPACING}
                height={height + BAR_ANIMATION_HEIGHT_BUFFER * 2}
                fill={`url(#${gradientId}${index})`}
                style={getColorVisionStylesForActiveIndex({
                  activeIndex: activeBarIndex,
                  index,
                })}
              />
            </g>
          );
        })}
      </g>
      <g
        {...getColorVisionEventAttrs({
          type: COLOR_VISION_GROUP_ITEM,
          index: barGroupIndex,
        })}
        className={styles.BarGroup}
        data-type={DataType.BarGroup}
        data-index={barGroupIndex}
        aria-hidden="false"
        aria-label={groupAriaLabel}
        role="list"
      >
        <rect
          width={barWidth * dataLength + gapWidth}
          x={x - gapWidth / 2}
          height={height}
          fill="transparent"
          aria-hidden="true"
        />
        {data.map((rawValue, index) => {
          const {label, value} = accessibilityData[barGroupIndex].data[index];
          const ariaLabel = `${label} ${value}`;
          const height = clamp({
            amount: Math.abs(yScale(rawValue) - yScale(0)),
            min: 1,
            max: Infinity,
          });
          const isNegative = rawValue < 0;
          const y = isNegative ? yScale(0) : yScale(0) - height;

          return (
            <rect
              key={index}
              height={height}
              x={x + barWidth * index}
              y={y}
              width={barWidth}
              fill="transparent"
              aria-label={ariaLabel}
              role="listitem"
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index,
              })}
              className={styles.Bar}
              tabIndex={-1}
            />
          );
        })}
      </g>
    </React.Fragment>
  );
}
