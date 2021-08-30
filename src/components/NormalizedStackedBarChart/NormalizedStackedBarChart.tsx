import React from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';

import {getSeriesColorsFromCount} from '../../hooks/use-theme-series-colors';
import {useTheme} from '../../hooks';
import {classNames} from '../../utilities';

import {BarSegment, BarLabel} from './components';
import type {Size, Data, Orientation} from './types';
import styles from './NormalizedStackedBarChart.scss';

export interface NormalizedStackedBarChartProps {
  data: Data[];
  size?: Size;
  orientation?: Orientation;
  theme?: string;
}

export function NormalizedStackedBarChart({
  data,
  size = 'small',
  orientation = 'horizontal',
  theme,
}: NormalizedStackedBarChartProps) {
  const selectedTheme = useTheme(theme);
  const colors = getSeriesColorsFromCount(data.length, selectedTheme);
  const containsNegatives = data.some(({value}) => value < 0);
  const isDevelopment = process.env.NODE_ENV === 'development';

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

  return (
    <div
      className={classNames(
        styles.Container,
        isVertical ? styles.VerticalContainer : styles.HorizontalContainer,
      )}
      style={{
        background: selectedTheme.chartContainer.backgroundColor,
        padding: selectedTheme.chartContainer.padding,
        borderRadius: selectedTheme.chartContainer.borderRadius,
      }}
    >
      <ul
        className={
          isVertical
            ? styles.VerticalLabelContainer
            : styles.HorizontailLabelContainer
        }
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
        {slicedData.map(({value, label}, index) =>
          value === 0 ? null : (
            <BarSegment
              orientation={orientation}
              size={size}
              scale={xScale(value)}
              key={`${label}-${value}`}
              color={colors[index]}
              roundedCorners={selectedTheme.bar.hasRoundedCorners}
            />
          ),
        )}
      </div>
    </div>
  );
}
