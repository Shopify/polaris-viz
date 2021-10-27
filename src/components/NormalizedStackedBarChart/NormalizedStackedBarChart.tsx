import React from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';

import {getSeriesColorsFromCount} from '../../hooks/use-theme-series-colors';
import {usePrefersReducedMotion, useTheme} from '../../hooks';
import {classNames} from '../../utilities';

import {BarSegment, BarLabel} from './components';
import type {Size, Data, Orientation, LabelPosition} from './types';
import styles from './NormalizedStackedBarChart.scss';

export interface NormalizedStackedBarChartProps {
  data: Data[];
  size?: Size;
  orientation?: Orientation;
  labelPosition?: LabelPosition;
  theme?: string;
}

export function NormalizedStackedBarChart({
  data,
  size = 'small',
  orientation = 'horizontal',
  labelPosition = 'top-left',
  theme,
}: NormalizedStackedBarChartProps) {
  const selectedTheme = useTheme(theme);
  const colors = getSeriesColorsFromCount(data.length, selectedTheme);
  const containsNegatives = data.some(({value}) => value < 0);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const {prefersReducedMotion} = usePrefersReducedMotion();

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

  const isVertical = orientation === 'vertical';
  const bars = isVertical ? slicedData.reverse() : slicedData;

  return (
    <div
      className={classNames(
        styles.Container,
        isVertical ? styles.VerticalContainer : styles.HorizontalContainer,
        isVertical && labelPosition.includes('right')
          ? styles.VerticalContainerRightLabel
          : '',
        !isVertical && labelPosition.includes('bottom')
          ? styles.HorizontalContainerBottomLabel
          : '',
      )}
      style={{
        background: selectedTheme.chartContainer.backgroundColor,
        padding: selectedTheme.chartContainer.padding,
        borderRadius: selectedTheme.chartContainer.borderRadius,
      }}
    >
      <ul
        className={classNames(
          isVertical
            ? styles.VerticalLabelContainer
            : styles.HorizontailLabelContainer,
          (isVertical && labelPosition.includes('bottom')) ||
            (!isVertical && labelPosition.includes('right'))
            ? styles.LabelContainerEndJustify
            : '',
        )}
      >
        {slicedData.map(({label, formattedValue, comparisonMetric}, index) => (
          <BarLabel
            key={`${label}-${formattedValue}`}
            label={label}
            value={formattedValue}
            color={colors[index]}
            comparisonMetric={comparisonMetric}
            legendColors={selectedTheme.legend}
            orientation={orientation}
            labelPosition={labelPosition}
          />
        ))}
      </ul>

      <div
        className={classNames(
          styles.BarContainer,
          isVertical
            ? styles.VerticalBarContainer
            : styles.HorizontalBarContainer,
        )}
      >
        {bars.map(({value, label}, index) => {
          if (value === 0) {
            return null;
          }

          const colorIndex = isVertical ? bars.length - 1 - index : index;

          return (
            <BarSegment
              index={index}
              isAnimated={!prefersReducedMotion}
              orientation={orientation}
              size={size}
              scale={xScale(value)}
              key={`${label}`}
              color={colors[colorIndex]}
              roundedCorners={selectedTheme.bar.hasRoundedCorners}
            />
          );
        })}
      </div>
    </div>
  );
}
