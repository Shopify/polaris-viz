import type {TrendIndicator as TrendIndicatorType} from '@shopify/polaris-viz-core';
import {useTheme, FONT_FAMILY} from '@shopify/polaris-viz-core';

import {getFontSize} from '../../utilities/getFontSize';

import {ArrowDown, ArrowUp, Svg} from './components/';
import {estimateTrendIndicatorWidth} from './utilities/estimateTrendIndicatorWidth';
import {
  NO_VALUE_WIDTH,
  NO_VALUE_ICON_HEIGHT,
  TEXT_ICON_SPACING,
  ICON_SIZE,
  HEIGHT,
  Y_OFFSET,
} from './constants';

const TREND_FONT_WEIGHT = 650;

export interface TrendIndicatorProps extends TrendIndicatorType {
  tabIndex?: number;
  theme?: string;
}

export function TrendIndicator({
  accessibilityLabel,
  direction = 'upward',
  tabIndex = -1,
  theme = 'Light',
  trend = 'neutral',
  value,
}: TrendIndicatorProps) {
  const selectedTheme = useTheme(theme);
  const fontSize = getFontSize();

  const svgProps = {
    accessibilityLabel,
    height: HEIGHT,
    tabIndex,
  };

  if (value == null) {
    return (
      <Svg {...svgProps} width={NO_VALUE_WIDTH}>
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

  const {textWidth, totalWidth} = estimateTrendIndicatorWidth(
    value,
    fontSize,
    TREND_FONT_WEIGHT,
  );

  return (
    <Svg {...svgProps} width={totalWidth}>
      <g color={selectedTheme.trendIndicator[trend]}>
        <g transform={`translate(0, ${(HEIGHT - ICON_SIZE) / 2})`}>
          {direction === 'upward' ? <ArrowUp /> : <ArrowDown />}
        </g>

        <text
          x={ICON_SIZE + TEXT_ICON_SPACING}
          y={(HEIGHT + Y_OFFSET) / 2}
          fontSize={fontSize}
          fill="currentColor"
          fontWeight={TREND_FONT_WEIGHT}
          dominantBaseline="middle"
          fontFamily={FONT_FAMILY}
          textRendering="geometricPrecision"
          width={textWidth}
        >
          {value}
        </text>
      </g>
    </Svg>
  );
}
