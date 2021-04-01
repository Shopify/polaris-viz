import React from 'react';
import {ScaleLinear, ScaleBand} from 'd3-scale';
import {Color} from 'types';

import {formatAriaLabel} from '../../utilities';
import {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';
import {getColorValue} from '../../../../utilities';

import {StackedBar} from './components/StackedBar';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: Color[];
  highlightColors: Color[];
  activeBarGroup: number | null;
  accessibilityData: {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];
  onFocus: (index: number) => void;
  isAnimated: boolean;
  seriesLength: number;
  hasRoundedCorners: boolean;
}

export function StackedBarGroup({
  groupIndex,
  data,
  yScale,
  xScale,
  colors,
  highlightColors,
  activeBarGroup,
  onFocus,
  accessibilityData,
  isAnimated,
  seriesLength,
  hasRoundedCorners,
}: Props) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;

  return (
    <g>
      {data.map(([start, end], barIndex) => {
        const xPosition = xScale(barIndex.toString());

        const fillColor =
          activeBarGroup === barIndex
            ? getColorValue(highlightColors[groupIndex])
            : getColorValue(colors[groupIndex]);

        const handleFocus = () => {
          onFocus(barIndex);
        };

        const yPosition = yScale(end);

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);
        const height = Math.abs(yScale(end) - yScale(start));

        const ariaEnabledBar = groupIndex === 0;

        const nonUniqueHighlightColor =
          colors[groupIndex] === highlightColors[groupIndex];

        return (
          <StackedBar
            key={barIndex}
            x={xPosition}
            y={yPosition}
            height={height}
            fillColor={fillColor}
            ariaLabel={ariaLabel}
            ariaEnabledBar={ariaEnabledBar}
            nonUniqueHighlightColor={nonUniqueHighlightColor}
            barWidth={barWidth}
            groupIndex={groupIndex}
            isAnimated={isAnimated}
            barIndex={barIndex}
            start={start}
            end={end}
            handleFocus={handleFocus}
            seriesLength={seriesLength}
            hasRoundedCorners={hasRoundedCorners}
          />
        );
      })}
    </g>
  );
}
