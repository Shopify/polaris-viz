import React, {useState} from 'react';
import type {ScaleLinear} from 'd3-scale';

import {DataSeries, RoundedBorder} from '../../../types';
import {
  COLOR_VISION_SINGLE_ITEM,
  FONT_SIZE,
  FONT_SIZE_PADDING,
  HORIZONTAL_BAR_LABEL_OFFSET,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import type {LabelFormatter} from '../../../types';
import {getTextWidth} from '../../../utilities';
import {
  useTheme,
  useWatchColorVisionEvents,
  getColorVisionEventAttrs,
} from '../../../hooks';
import {Bar} from '../Bar';
import {getGradientDefId} from '../GradientDefs';

import {Label} from './components';

export interface HorizontalBarsProps {
  activeGroupIndex: number;
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
  activeGroupIndex,
  animationDelay,
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

  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

  return (
    <g
      transform={`translate(${zeroPosition},${HORIZONTAL_GROUP_LABEL_HEIGHT})`}
      aria-hidden="true"
    >
      {data.map((_, seriesIndex) => {
        if (data[seriesIndex].data[groupIndex] == null) {
          return;
        }
        const {value} = data[seriesIndex].data[groupIndex];

        const isNegative = value && value < 0;
        const label = labelFormatter(value);
        const ariaLabel = `${
          data[seriesIndex] ? data[seriesIndex].name : ''
        } ${value}`;

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

        return (
          <React.Fragment key={`series-${seriesIndex}-${id}-${name}`}>
            <Bar
              animationDelay={animationDelay}
              color={`url(#${getGradientDefId(theme, seriesIndex, id)})`}
              height={barHeight}
              index={groupIndex}
              isActive={activeBarIndex === -1 || activeBarIndex === seriesIndex}
              isAnimated={isAnimated}
              needsMinWidth
              roundedBorder={RoundedBorder.Right}
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
            <rect
              x={0}
              y={y - HORIZONTAL_SPACE_BETWEEN_SINGLE / 2}
              width={width}
              height={barHeight + HORIZONTAL_SPACE_BETWEEN_SINGLE}
              fill="transparent"
              style={{transform: isNegative ? 'scaleX(-1)' : ''}}
              {...getColorVisionEventAttrs({
                type: COLOR_VISION_SINGLE_ITEM,
                index: seriesIndex,
              })}
              tabIndex={-1}
              role="img"
              aria-label={ariaLabel}
            />
          </React.Fragment>
        );
      })}
    </g>
  );
}
