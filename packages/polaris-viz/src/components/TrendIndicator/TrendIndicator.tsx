import {useTheme} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../utilities';
import type {Trend, TrendDirection} from '../../types';

import {ArrowDown, ArrowUp, Svg} from './components/';

export interface TrendIndicatorProps {
  accessibilityLabel?: string;
  direction?: TrendDirection;
  theme?: string;
  trend?: Trend;
  value?: string;
}

const NO_VALUE_WIDTH = 11;
const NO_VALUE_ICON_HEIGHT = 2;

const TEXT_ICON_SPACING = 4;
const ICON_SIZE = 5.5;

const FONT_SIZE = 12;
const FONT_WEIGHT = 600;

const HEIGHT = 16;

const Y_OFFSET = 3;

export function TrendIndicator({
  accessibilityLabel,
  direction = 'upward',
  theme = 'Light',
  trend = 'neutral',
  value,
}: TrendIndicatorProps) {
  const selectedTheme = useTheme(theme);

  if (value == null) {
    return (
      <Svg
        accessibilityLabel={accessibilityLabel}
        height={HEIGHT}
        width={NO_VALUE_WIDTH}
      >
        <path
          d="M0.519531 1.79395H12.0039V0.249023H0.519531V1.79395Z"
          fill={selectedTheme.trendIndicator.neutral}
          transform={`translate(${(NO_VALUE_WIDTH - NO_VALUE_WIDTH) / 2}, ${
            (HEIGHT - NO_VALUE_ICON_HEIGHT) / 2
          })`}
        />
      </Svg>
    );
  }

  const textWidth = estimateStringWidthWithOffset(
    value,
    FONT_SIZE,
    FONT_WEIGHT,
  );
  const totalWidth = Math.round(ICON_SIZE + TEXT_ICON_SPACING + textWidth);

  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      height={HEIGHT}
      width={totalWidth}
    >
      <g color={selectedTheme.trendIndicator[trend]}>
        <g transform={`translate(0, ${(HEIGHT - ICON_SIZE) / 2})`}>
          {direction === 'upward' ? <ArrowUp /> : <ArrowDown />}
        </g>

        <text
          x={ICON_SIZE + TEXT_ICON_SPACING}
          y={(HEIGHT + Y_OFFSET) / 2}
          fontSize={FONT_SIZE}
          fill="currentColor"
          fontWeight="600"
          dominantBaseline="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
          textRendering="geometricPrecision"
          width={textWidth}
        >
          {value}
        </text>
      </g>
    </Svg>
  );
}
