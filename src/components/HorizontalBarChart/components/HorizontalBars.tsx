import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {FONT_SIZE} from '../../../constants';
import type {Data, XAxisOptions} from '../types';
import {getTextWidth} from '../../../utilities';
import {
  BAR_LABEL_OFFSET,
  FONT_SIZE_PADDING,
  GRADIENT_ID,
  LABEL_HEIGHT,
  NEGATIVE_GRADIENT_ID,
  SPACE_BETWEEN_SINGLE,
} from '../constants';
import {useTheme} from '../../../hooks';
import {getBarId} from '../utilities';

import {Bar, RoundedBorder} from './Bar';
import {Label} from './Label';

interface HorizontalBarProps {
  areAllAllNegative: boolean;
  ariaLabel: string;
  barHeight: number;
  firstNonNegativeValue: number;
  groupIndex: number;
  isAnimated: boolean;
  labelFormatter: XAxisOptions['labelFormatter'];
  series: Data[];
  isSimple: boolean;
  xScale: ScaleLinear<number, number>;
  animationDelay?: number;
  theme?: string;
}

export function HorizontalBars({
  areAllAllNegative,
  ariaLabel,
  barHeight,
  groupIndex,
  firstNonNegativeValue,
  isAnimated,
  labelFormatter,
  series,
  isSimple,
  theme,
  animationDelay,
  xScale,
}: HorizontalBarProps) {
  const selectedTheme = useTheme(theme);

  return (
    <g
      transform={`translate(0,${LABEL_HEIGHT})`}
      aria-label={ariaLabel}
      role="listitem"
    >
      {series.map(({rawValue, color}, seriesIndex) => {
        const isNegative = rawValue < 0;
        const label = labelFormatter(rawValue);
        const id = getBarId(groupIndex, seriesIndex);

        const labelWidth = getTextWidth({
          text: `${label}`,
          fontSize: FONT_SIZE + FONT_SIZE_PADDING,
        });

        const leftLabelOffset = isSimple ? labelWidth + BAR_LABEL_OFFSET : 0;
        const width = isNegative
          ? Math.abs(xScale(rawValue) - firstNonNegativeValue + leftLabelOffset)
          : Math.abs(xScale(rawValue) - firstNonNegativeValue);

        const y = barHeight * seriesIndex + SPACE_BETWEEN_SINGLE * seriesIndex;
        const negativeX = areAllAllNegative
          ? -(width + leftLabelOffset)
          : -(width + leftLabelOffset);
        const x = isNegative ? negativeX : width + BAR_LABEL_OFFSET;
        const ariaHidden = seriesIndex !== 0;
        const barColor = color ? id : `${GRADIENT_ID}${seriesIndex}`;

        return (
          <React.Fragment key={id}>
            <Bar
              animationDelay={animationDelay}
              color={`url(#${isNegative ? NEGATIVE_GRADIENT_ID : barColor})`}
              height={barHeight}
              index={groupIndex}
              isAnimated={isAnimated}
              role="img"
              roundedBorder={RoundedBorder.Right}
              tabIndex={ariaHidden ? -1 : 0}
              transform={isNegative ? 'scaleX(-1)' : ''}
              width={width}
              x={0}
              y={y}
            />
            {isSimple && (
              <Label
                animationDelay={animationDelay}
                barHeight={barHeight}
                color={selectedTheme.xAxis.labelColor}
                isAnimated={isAnimated}
                label={`${label}`}
                labelWidth={labelWidth}
                x={x}
                y={y}
              />
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
}
