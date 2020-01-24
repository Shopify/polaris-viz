import React from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {Color} from 'types';

import {BarSegment, BarLabel} from './components';
import {Size, ColorScheme, Data, Orientation} from './types';
import {getColorPalette, getTokensFromColors} from './utilities';
import {
  Container,
  BarContainer,
  LabelContainer,
} from './NormalizedStackedBar.style';

interface Props {
  data: Data[];
  accessibilityLabel?: string;
  size?: Size;
  orientation?: Orientation;
  colors?: Color[] | ColorScheme;
}

const SIZES = {
  small: 16,
  medium: 36,
  large: 56,
};

export function NormalizedStackedBar({
  data,
  accessibilityLabel,
  size = 'small',
  orientation = 'horizontal',
  colors = 'classic',
}: Props) {
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

  const xScale = scaleLinear()
    .range([0, 100])
    .domain([0, totalValue]);

  const isVertical = orientation === 'vertical';
  const colorPalette = Array.isArray(colors)
    ? getTokensFromColors(colors)
    : getColorPalette(colors);

  return (
    <Container
      isVertical={isVertical}
      aria-label={accessibilityLabel}
      role="img"
    >
      <LabelContainer isVertical={isVertical}>
        {slicedData.map(({label, formattedValue}, index) => (
          <BarLabel
            key={`${label}-${formattedValue}`}
            label={label}
            value={formattedValue}
            color={colorPalette[index]}
          />
        ))}
      </LabelContainer>

      <BarContainer isVertical={isVertical}>
        {slicedData.map(({value, label}, index) => (
          <BarSegment
            orientation={orientation}
            size={SIZES[size]}
            scale={xScale(value)}
            key={`${label}-${value}`}
            color={colorPalette[index]}
          />
        ))}
      </BarContainer>
    </Container>
  );
}
