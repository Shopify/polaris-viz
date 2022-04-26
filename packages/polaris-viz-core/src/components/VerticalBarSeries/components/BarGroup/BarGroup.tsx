import React, {useCallback, useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {
  clamp,
  getAnimationTrail,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  uniqueId,
  formatAriaLabel,
} from '../../../../utilities';
import {LinearGradientWithStops} from '../../../LinearGradientWithStops';
import {Bar} from '../../../Bar';
import {usePolarisVizContext} from '../../../../hooks';
import {AccessibilitySeries, Color, DataType} from '../../../../types';
import {
  BARS_TRANSITION_CONFIG,
  BAR_ANIMATION_HEIGHT_BUFFER,
  BORDER_RADIUS,
  COLOR_VISION_GROUP_ITEM,
  COLOR_VISION_SINGLE_ITEM,
  IS_ANIMATED_DEFAULT,
  MASK_HIGHLIGHT_COLOR,
  MIN_BAR_HEIGHT,
  VERTICAL_BAR_SPACING,
} from '../../../../constants';

import styles from './BarGroup.scss';

const DELAY = 100;

interface Props {
  accessibilityData: AccessibilitySeries[];
  activeBarGroup: number;
  barGroupIndex: number;
  colors: Color[];
  data: number[];
  gapWidth: number;
  hasRoundedCorners: boolean;
  height: number;
  width: number;
  x: number;
  yScale: ScaleLinear<number, number>;
  zeroAsMinHeight: boolean;
  isAnimated?: boolean;
}

export function BarGroup({
  accessibilityData,
  activeBarGroup,
  barGroupIndex,
  colors,
  data,
  gapWidth,
  hasRoundedCorners,
  height,
  isAnimated = IS_ANIMATED_DEFAULT,
  width,
  x,
  yScale,
  zeroAsMinHeight,
}: Props) {
  const {useWatchColorVisionEvents, useTransition} = usePolarisVizContext();
  const groupAriaLabel = formatAriaLabel(accessibilityData[barGroupIndex]);

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

  const dataWithIndex = data
    ? data.map((value, index) => ({
        value,
        index,
      }))
    : [];

  const transitions = useTransition(dataWithIndex, {
    key: ({index}: {index: number}) => index,
    from: {height: 0},
    leave: {height: 0},
    enter: ({value}) => ({height: getBarHeight(value == null ? 0 : value)}),
    update: ({value}) => ({height: getBarHeight(value == null ? 0 : value)}),
    default: {immediate: !isAnimated},
    trail: isAnimated ? getAnimationTrail(data.length) : 0,
    delay: barGroupIndex * DELAY,
    config: BARS_TRANSITION_CONFIG,
  });

  return (
    <React.Fragment>
      <mask id={maskId}>
        {transitions(({height: barHeight}, item, _transition, index) => {
          const height = isAnimated ? barHeight : getBarHeight(item.value ?? 0);

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
                borderRadius={
                  hasRoundedCorners ? BORDER_RADIUS.Top : BORDER_RADIUS.None
                }
                fill={MASK_HIGHLIGHT_COLOR}
                height={height}
                value={item.value}
                width={barWidth}
                x={x + (barWidth + VERTICAL_BAR_SPACING) * index}
                yScale={yScale}
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
                x={x + (barWidth + VERTICAL_BAR_SPACING) * index}
                y={BAR_ANIMATION_HEIGHT_BUFFER * -1}
                width={barWidth - VERTICAL_BAR_SPACING}
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
