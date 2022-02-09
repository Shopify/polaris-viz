import React, {useState} from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';

import {COLOR_VISION_SINGLE_ITEM} from '../../constants';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {getSeriesColorsFromCount} from '../../hooks/use-theme-series-colors';
import {
  useColorVisionEvents,
  usePrefersReducedMotion,
  useTheme,
  useWatchColorVisionEvents,
} from '../../hooks';
import {classNames} from '../../utilities';
import type {DataPoint, Direction, LabelFormatter} from '../../types';

import {BarSegment, BarLabel} from './components';
import type {Size, LabelPosition} from './types';
import styles from './SimpleNormalizedChart.scss';

export interface ChartProps {
  data: DataPoint[];
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
  theme,
}: ChartProps) {
  useColorVisionEvents();

  const selectedTheme = useTheme(theme);
  const colors = getSeriesColorsFromCount(data.length, selectedTheme);
  const containsNegatives = data.some(({value}) => value !== null && value < 0);
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

  if (isDevelopment && data.length > 4) {
    throw new Error(
      'This component displays a max of 4 data items. Please modify your data before passing it into this component.',
    );
  }

  const slicedData = data.slice(0, 4);
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
              key={`${key}-${formattedValue}`}
              label={`${key}`}
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
              index={index}
              isAnimated={!prefersReducedMotion}
              direction={direction}
              size={size}
              scale={xScale(value)}
              key={`${key}`}
              color={colors[colorIndex]}
              roundedCorners={selectedTheme.bar.hasRoundedCorners}
            />
          );
        })}
      </div>
    </div>
  );
}
