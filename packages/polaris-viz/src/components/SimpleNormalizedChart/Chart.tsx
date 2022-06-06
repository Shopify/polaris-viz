import React, {useState} from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {
  COLOR_VISION_SINGLE_ITEM,
  DataSeries,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';
import type {Direction, LabelFormatter} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {
  useColorVisionEvents,
  usePrefersReducedMotion,
  useTheme,
  useWatchColorVisionEvents,
} from '../../hooks';
import {classNames} from '../../utilities';

import {BarSegment, BarLabel} from './components';
import type {Size, LabelPosition} from './types';
import styles from './SimpleNormalizedChart.scss';

export interface ChartProps {
  data: DataSeries[];
  comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
  labelFormatter?: LabelFormatter;
  labelPosition?: LabelPosition;
  direction?: Direction;
  size?: Size;
  theme?: string;
}

export function Chart({
  comparisonMetrics = [],
  data,
  labelFormatter = (value) => `${value}`,
  labelPosition = 'top-left',
  direction = 'horizontal',
  size = 'small',
  theme = DEFAULT_THEME_NAME,
}: ChartProps) {
  const flattenedData = data.map(({data}) => data).flat();

  useColorVisionEvents();

  const selectedTheme = useTheme(theme);
  const colors = useThemeSeriesColors(data, selectedTheme);

  const containsNegatives = flattenedData.some(
    ({value}) => value !== null && value < 0,
  );
  const isDevelopment = process.env.NODE_ENV === 'development';
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveIndex(detail.index),
  });

  if (isDevelopment && containsNegatives) {
    // eslint-disable-next-line no-console
    console.warn(
      'This component is not built to handle negatives. Consider using a different component.',
    );
  }

  if (isDevelopment && flattenedData.length > 4) {
    throw new Error(
      'This component displays a max of 4 data items. Please modify your data before passing it into this component.',
    );
  }

  const slicedData = flattenedData.slice(0, 4);
  const totalValue = sum(slicedData, ({value}) => value);

  const xScale = scaleLinear().range([0, 100]).domain([0, totalValue]);

  const isVertical = direction === 'vertical';
  const bars = isVertical ? slicedData.reverse() : slicedData;

  const isRightLabel = labelPosition.includes('right');
  const isBottomLabel = labelPosition.includes('bottom');
  const isVerticalAndRightLabel = isVertical && isRightLabel;
  const isVerticalAndBottomLabel = isVertical && isBottomLabel;
  const isHorizontalAndRightLabel = !isVertical && isRightLabel;
  const isHorizontalAndBottomLabel = !isVertical && isBottomLabel;

  return (
    <div
      className={classNames(
        styles.Container,
        isVertical ? styles.VerticalContainer : styles.HorizontalContainer,
        isVerticalAndRightLabel && styles.VerticalContainerRightLabel,
        isHorizontalAndBottomLabel && styles.HorizontalContainerBottomLabel,
      )}
    >
      <ul
        className={classNames(
          isVertical
            ? styles.VerticalLabelContainer
            : styles.HorizontalLabelContainer,
          (isVerticalAndBottomLabel || isHorizontalAndRightLabel) &&
            styles.LabelContainerEndJustify,
        )}
      >
        {slicedData.map(({key, value}, index) => {
          if (value == null) {
            return null;
          }

          const comparisonMetric = comparisonMetrics.find(
            ({dataIndex}) => index === dataIndex,
          );

          const formattedValue = labelFormatter(value);
          return (
            <BarLabel
              activeIndex={activeIndex}
              index={index}
              key={`${key}-${formattedValue}-${index}`}
              label={`${data[index].name}`}
              value={formattedValue}
              color={colors[index]}
              comparisonMetric={comparisonMetric}
              legendColors={selectedTheme.legend}
              direction={direction}
              labelPosition={labelPosition}
            />
          );
        })}
      </ul>

      <div
        className={classNames(
          styles.BarContainer,
          isVertical
            ? styles.VerticalBarContainer
            : styles.HorizontalBarContainer,
        )}
      >
        {bars.map(({value, key}, index) => {
          if (value == null || value === 0) {
            return null;
          }

          const colorIndex = isVertical ? bars.length - 1 - index : index;

          return (
            <BarSegment
              activeIndex={activeIndex}
              index={colorIndex}
              isAnimated={!prefersReducedMotion}
              direction={direction}
              size={size}
              scale={xScale(value)}
              key={`${key}-${index}`}
              color={colors[colorIndex]}
              roundedCorners={selectedTheme.bar.hasRoundedCorners}
            />
          );
        })}
      </div>
    </div>
  );
}
