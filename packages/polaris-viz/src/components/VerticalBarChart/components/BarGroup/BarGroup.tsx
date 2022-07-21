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
  useTheme,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';

import type {AccessibilitySeries} from '../../../VerticalBarChart/types';
import {formatAriaLabel} from '../../utilities';
import {useWatchColorVisionEvents} from '../../../../hooks';
import {Bar} from '../Bar';
import {BAR_SPACING} from '../../constants';
import {
  MASK_HIGHLIGHT_COLOR,
  SHAPE_ANIMATION_HEIGHT_BUFFER,
} from '../../../../constants';
import styles from '../../Chart.scss';

interface Props {
  animationDelay: number;
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  height: number;
  data: number[];
  colors: Color[];
  barGroupIndex: number;
  hasRoundedCorners: boolean;
  indexOffset: number;
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  gapWidth: number;
  areAllNegative?: boolean;
  theme?: string;
}

export function BarGroup({
  animationDelay,
  x,
  data,
  yScale,
  width,
  colors,
  height,
  indexOffset,
  barGroupIndex,
  hasRoundedCorners,
  accessibilityData,
  activeBarGroup,
  gapWidth,
  theme,
  areAllNegative,
}: Props) {
  const groupAriaLabel = formatAriaLabel(accessibilityData[barGroupIndex]);
  const {shouldAnimate} = useChartContext();

  const [activeBarIndex, setActiveBarIndex] = useState(-1);
  const selectedTheme = useTheme(theme);

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
      return Math.abs(yScale(rawValue) - yScale(0));
    },
    [yScale],
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
                isAnimated={shouldAnimate}
                color={MASK_HIGHLIGHT_COLOR}
                x={x + (barWidth + BAR_SPACING) * index}
                zeroPosition={yScale(0)}
                rawValue={rawValue}
                width={barWidth}
                index={index}
                borderRadius={
                  hasRoundedCorners ? BORDER_RADIUS.Top : BORDER_RADIUS.None
                }
                animationDelay={animationDelay}
                areAllNegative={areAllNegative}
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
                y={SHAPE_ANIMATION_HEIGHT_BUFFER * -1}
                width={barWidth - BAR_SPACING}
                height={height + SHAPE_ANIMATION_HEIGHT_BUFFER * 2}
                fill={
                  data[index] === 0
                    ? selectedTheme.bar.zeroValueColor
                    : `url(#${gradientId}${index})`
                }
                style={getColorVisionStylesForActiveIndex({
                  activeIndex: activeBarIndex,
                  index: index + indexOffset,
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
                index: index + indexOffset,
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
