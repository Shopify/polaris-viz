import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {DataSeries, RoundedBorder} from '../../../types';
import {
  FONT_SIZE,
  FONT_SIZE_PADDING,
  HORIZONTAL_BAR_LABEL_OFFSET,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import type {LabelFormatter} from '../../../types';
import {getTextWidth} from '../../../utilities';
import {useTheme} from '../../../hooks';
import {Bar} from '../Bar';
import {getGradientDefId} from '../GradientDefs';

import {Label} from './components';

export interface HorizontalBarsProps {
  ariaLabel: string;
  barHeight: number;
  data: DataSeries[];
  groupIndex: number;
  id: string;
  isAnimated: boolean;
  isSimple: boolean;
  labelFormatter: LabelFormatter;
  name: string;
  xScale: ScaleLinear<number, number>;
  zeroPosition: number;
  animationDelay?: number;
  theme?: string;
}

export function HorizontalBars({
  animationDelay,
  ariaLabel,
  barHeight,
  data,
  groupIndex,
  id,
  isAnimated,
  isSimple,
  labelFormatter,
  name,
  theme,
  xScale,
  zeroPosition,
}: HorizontalBarsProps) {
  const selectedTheme = useTheme(theme);

  return (
    <g
      transform={`translate(${zeroPosition},${HORIZONTAL_GROUP_LABEL_HEIGHT})`}
      aria-label={ariaLabel}
      role="listitem"
    >
      {data.map((_, seriesIndex) => {
        if (data[seriesIndex].data[groupIndex] == null) {
          return;
        }
        const {value} = data[seriesIndex].data[groupIndex];

        const isNegative = value && value < 0;
        const label = labelFormatter(value);

        const labelWidth = getTextWidth({
          text: `${label}`,
          fontSize: FONT_SIZE + FONT_SIZE_PADDING,
        });

        const leftLabelOffset = isSimple
          ? labelWidth + HORIZONTAL_BAR_LABEL_OFFSET
          : 0;
        const width = Math.abs(xScale(value ?? 0) - xScale(0));

        const y =
          barHeight * seriesIndex +
          HORIZONTAL_SPACE_BETWEEN_SINGLE * seriesIndex;
        const negativeX = (width + leftLabelOffset) * -1;
        const x = isNegative ? negativeX : width + HORIZONTAL_BAR_LABEL_OFFSET;
        const ariaHidden = seriesIndex !== 0;

        return (
          <React.Fragment key={`series-${seriesIndex}-${id}-${name}`}>
            <Bar
              animationDelay={animationDelay}
              color={`url(#${getGradientDefId(theme, seriesIndex, id)})`}
              height={barHeight}
              index={groupIndex}
              isAnimated={isAnimated}
              needsMinWidth
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
                color={
                  data[seriesIndex].isComparison
                    ? selectedTheme.seriesColors.comparison
                    : selectedTheme.xAxis.labelColor
                }
                isAnimated={isAnimated}
                label={label}
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
