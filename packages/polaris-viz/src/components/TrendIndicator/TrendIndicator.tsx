import {useTheme} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../utilities';
import type {Trend, TrendDirection, TrendSize} from '../../types';

import {ArrowDown, ArrowUp, Svg} from './components/';

export interface TrendIndicatorProps {
  accessibilityLabel?: string;
  direction?: TrendDirection;
  size?: TrendSize;
  theme?: string;
  trend?: Trend;
  value?: string;
}

const NO_VALUE_WIDTH = 29;
const NO_VALUE_ICON_WIDTH = 12;
const NO_VALUE_ICON_HEIGHT = 2;

const LEFT_PADDING = 5;
const RIGHT_PADDING = 7;
const TEXT_X = 22;
const ICON_HEIGHT = 12;

const SMALL_FONT_SIZE = 12;
const LARGE_FONT_SIZE = 20;

const SMALL_HEIGHT = 16;
const LARGE_HEIGHT = 24;

const FONT_WEIGHT = 600;

const Y_OFFSET = 3;

export function TrendIndicator({
  accessibilityLabel,
  direction = 'upward',
  size = 'default',
  theme = 'Light',
  trend = 'neutral',
  value,
}: TrendIndicatorProps) {
  const selectedTheme = useTheme(theme);

  const height = size === 'small' ? SMALL_HEIGHT : LARGE_HEIGHT;

  if (value == null) {
    return (
      <Svg
        accessibilityLabel={accessibilityLabel}
        height={height}
        width={NO_VALUE_WIDTH}
      >
        <rect
          width={NO_VALUE_WIDTH}
          height={height}
          fill={selectedTheme.trendIndicator.background}
          rx={height / 2}
        />

        <path
          d="M0.519531 1.79395H12.0039V0.249023H0.519531V1.79395Z"
          fill={selectedTheme.trendIndicator.neutral}
          transform={`translate(${
            (NO_VALUE_WIDTH - NO_VALUE_ICON_WIDTH) / 2
          }, ${(height - NO_VALUE_ICON_HEIGHT) / 2})`}
        />
      </Svg>
    );
  }

  const fontSize = size === 'small' ? SMALL_FONT_SIZE : LARGE_FONT_SIZE;

  const textWidth = estimateStringWidthWithOffset(value, fontSize, FONT_WEIGHT);
  const totalWidth = Math.round(TEXT_X + textWidth + RIGHT_PADDING);

  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      height={height}
      width={totalWidth}
    >
      <rect
        width={totalWidth}
        height={height}
        fill={selectedTheme.trendIndicator.background}
        rx={height / 2}
      />

      <g color={selectedTheme.trendIndicator[trend]}>
        <g
          transform={`translate(${LEFT_PADDING}, ${
            (height - ICON_HEIGHT) / 2
          })`}
        >
          {direction === 'upward' ? <ArrowUp /> : <ArrowDown />}
        </g>

        <text
          x={TEXT_X}
          y={(height + Y_OFFSET) / 2}
          fontSize={fontSize}
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
