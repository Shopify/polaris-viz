import React from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';

import {BarSegment, BarLabel} from './components';
import {Orientation, Size, ColorScheme, Color, Data} from './types';
import {getColorPalette, getTokensFromColors} from './utilities';
import {
  Container,
  BarContainer,
  LabelContainer,
} from './NormalizedStackedBar.style';

interface Props {
  data: Data[];
  accessibilityLabel?: string;
  size?: number;
  orientation?: Orientation;
  colors?: Color[] | ColorScheme;
}

export function NormalizedStackedBar({
  data,
  accessibilityLabel,
  size = Size.Small,
  orientation = Orientation.Horizontal,
  colors = ColorScheme.Classic,
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

  const isVertical = orientation === Orientation.Vertical;
  const colorPalette =
    typeof colors === 'number'
      ? getColorPalette(colors)
      : getTokensFromColors(colors);

  return (
    <Container theme={{isVertical}} aria-label={accessibilityLabel} role="img">
      <LabelContainer theme={{isVertical}}>
        {slicedData.map(({label, formattedValue}, index) => (
          <BarLabel
            key={`${label}-${formattedValue}`}
            label={label}
            value={formattedValue}
            color={colorPalette[index]}
          />
        ))}
      </LabelContainer>

      <BarContainer theme={{isVertical}}>
        {slicedData.map(({value, label}, index) => (
          <BarSegment
            orientation={orientation}
            size={size}
            scale={xScale(value)}
            key={`${label}-${value}`}
            color={colorPalette[index]}
          />
        ))}
      </BarContainer>
    </Container>
  );
}
