import {useTheme} from '@shopify/polaris-viz-core';

import type {Trend, TrendDirection} from '../../types';

import {ArrowDown, ArrowUp, Svg} from './components/';
import {estimateTrendIndicatorWidth} from './utilities/estimateTrendIndicatorWidth';
import {
  NO_VALUE_WIDTH,
  NO_VALUE_ICON_HEIGHT,
  TEXT_ICON_SPACING,
  ICON_SIZE,
  FONT_SIZE,
  HEIGHT,
  Y_OFFSET,
} from './constants';

export interface TrendIndicatorProps {
  accessibilityLabel?: string;
  direction?: TrendDirection;
  theme?: string;
  trend?: Trend;
  value?: string;
}

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

  const {textWidth, totalWidth} = estimateTrendIndicatorWidth(value);

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
