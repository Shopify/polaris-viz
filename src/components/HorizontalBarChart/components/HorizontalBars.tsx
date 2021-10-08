import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {FONT_SIZE} from '../../../constants';
import type {NullableData, XAxisOptions} from '../types';
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
  animationDelay?: number;
  areAllAllNegative: boolean;
  ariaLabel: string;
  barHeight: number;
  data: NullableData[];
  firstNonNegativeValue: number;
  groupIndex: number;
  isAnimated: boolean;
  isSimple: boolean;
  labelFormatter: XAxisOptions['labelFormatter'];
  theme?: string;
  xScale: ScaleLinear<number, number>;
}

export function HorizontalBars({
  animationDelay,
  areAllAllNegative,
  ariaLabel,
  barHeight,
  data,
  firstNonNegativeValue,
  groupIndex,
  isAnimated,
  isSimple,
  labelFormatter,
  theme,
  xScale,
}: HorizontalBarProps) {
  const selectedTheme = useTheme(theme);

  return (
    <g
      transform={`translate(0,${LABEL_HEIGHT})`}
      aria-label={ariaLabel}
      role="listitem"
    >
      {data.map((values, seriesIndex) => {
        if (values == null) {
          return null;
        }

        const {rawValue, color} = values;
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
