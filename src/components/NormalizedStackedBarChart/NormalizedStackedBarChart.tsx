import React from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {classNames} from '@shopify/css-utilities';
import type {Color} from 'types';

import {getColorValue} from '../../utilities';

import {BarSegment, BarLabel} from './components';
import type {Size, Data, Orientation} from './types';
import styles from './NormalizedStackedBarChart.scss';

export interface NormalizedStackedBarChartProps {
  data: Data[];
  accessibilityLabel?: string;
  size?: Size;
  orientation?: Orientation;
  colors?: Color[];
}

export function NormalizedStackedBarChart({
  data,
  accessibilityLabel,
  size = 'small',
  orientation = 'horizontal',
  colors = ['colorPurpleDark', 'colorBlue', 'colorTeal', 'colorSkyDark'],
}: NormalizedStackedBarChartProps) {
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
  const colorPalette = colors.map((color) => getColorValue(color));

  return (
    <div
      className={classNames(
        styles.Container,
        isVertical ? styles.VerticalContainer : styles.HorizontalContainer,
      )}
      aria-label={accessibilityLabel}
      role="img"
    >
      <div
        className={
          isVertical
            ? styles.VerticalLabelContainer
            : styles.HorizontailLabelContainer
        }
      >
        {slicedData.map(({label, formattedValue}, index) => (
          <BarLabel
            key={`${label}-${formattedValue}`}
            label={label}
            value={formattedValue}
            color={colorPalette[index]}
          />
        ))}
      </div>

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
              color={colorPalette[index]}
            />
          ),
        )}
      </div>
    </div>
  );
}
