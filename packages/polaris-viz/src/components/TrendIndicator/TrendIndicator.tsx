import {estimateStringWidth, useTheme} from '@shopify/polaris-viz-core';

import type {Trend, TrendDirection, TrendSize} from '../../types';
import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';

import {ArrowDown, ArrowUp, Svg} from './components/';

export interface TrendIndicatorProps {
  accessibilityLabel?: string;
  direction?: TrendDirection;
  size?: TrendSize;
  theme?: string;
  trend?: Trend;
  value?: string;
}

const HEIGHT = 20;
const NO_VALUE_WIDTH = 29;

const LEFT_PADDING = 8;
const TEXT_X = 22;

export function TrendIndicator({
  accessibilityLabel,
  direction = 'upward',
  size = 'default',
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
        <rect
          width={NO_VALUE_WIDTH}
          height={HEIGHT}
          fill="#F6F6F7"
          rx={HEIGHT / 2}
        />

        <path
          d="M0.519531 1.79395H12.0039V0.249023H0.519531V1.79395Z"
          fill="#8C9196"
          transform={`translate(${LEFT_PADDING}, 9)`}
        />
      </Svg>
    );
  }

  const fontSize = size === 'small' ? 12 : 14;
  const rightPadding = size === 'small' ? 8 : 10;

  const textWidth =
    estimateStringWidth(value, characterWidths) *
    characterWidthOffsets[fontSize];

  const totalWidth = Math.round(TEXT_X + textWidth + rightPadding);

  return (
    <Svg
      accessibilityLabel={accessibilityLabel}
      height={HEIGHT}
      width={totalWidth}
    >
      <rect
        width={totalWidth}
        height={HEIGHT}
        fill={selectedTheme.trendIndicator.background}
        rx={HEIGHT / 2}
      />

      <g color={selectedTheme.trendIndicator[trend]}>
        <g transform={`translate(${LEFT_PADDING}, 4)`}>
          {direction === 'upward' ? <ArrowUp /> : <ArrowDown />}
        </g>

        <text
          x={TEXT_X}
          y="11.5"
          fontSize={fontSize}
          fill="currentColor"
          fontWeight="600"
          dominantBaseline="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
          textRendering="geometricPrecision"
        >
          {value}
        </text>
      </g>
    </Svg>
  );
}
