import React from 'react';
import {ScaleLinear, ScaleBand} from 'd3-scale';
import {Color, GradientColor} from 'types';

import {Bar} from '../../../Bar';
import {formatAriaLabel} from '../../utilities';
import {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: (Color | GradientColor)[];
  highlightColors: (Color | GradientColor)[];
  activeBarGroup: number | null;
  accessibilityData: {
    title: string;
    data: {
      label: string;
      value: string;
    }[];
  }[];
  onFocus: (index: number) => void;
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
}: Props) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;

  return (
    <g>
      {data.map(([start, end], barIndex) => {
        const xPosition = xScale(barIndex.toString());

        const fillColor = colors[groupIndex];

        const highlightColor = highlightColors[groupIndex];

        const handleFocus = () => {
          onFocus(barIndex);
        };

        const ariaLabel = formatAriaLabel(accessibilityData[barIndex]);

        const ariaEnabledBar = groupIndex === 0;

        if (xPosition == null) {
          return null;
        }

        return (
          <g
            role={groupIndex === 0 ? 'listitem' : undefined}
            aria-hidden={!ariaEnabledBar}
            key={barIndex}
          >
            <Bar
              color={fillColor}
              highlightColor={highlightColor}
              yScale={yScale}
              rawValue={end - start}
              width={barWidth}
              ariaLabel={ariaEnabledBar ? ariaLabel : undefined}
              tabIndex={ariaEnabledBar ? 0 : -1}
              role={ariaEnabledBar ? 'img' : undefined}
              x={xPosition}
              startingValue={start}
              onFocus={handleFocus}
              isSelected={activeBarGroup === barIndex}
              index={groupIndex}
            />
          </g>
        );
      })}
    </g>
  );
}
