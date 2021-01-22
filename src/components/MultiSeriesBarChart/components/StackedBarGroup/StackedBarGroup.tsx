import React from 'react';
import type {ScaleLinear, ScaleBand} from 'd3-scale';
import type {Color} from 'types';

import type {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';
import {getColorValue} from '../../../../utilities';
import styles from '../../shared.scss';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: Color[];
  highlightColors: Color[];
  activeBarGroup: number | null;
}

export function StackedBarGroup({
  groupIndex,
  data,
  yScale,
  xScale,
  colors,
  highlightColors,
  activeBarGroup,
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

        return (
          <rect
            className={styles.Bar}
            key={barIndex}
            x={xPosition}
            y={yScale(end)}
            height={Math.abs(yScale(end) - yScale(start))}
            width={barWidth}
            fill={fillColor}
          />
        );
      })}
    </g>
  );
}
