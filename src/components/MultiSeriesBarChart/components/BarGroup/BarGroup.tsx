import React from 'react';
import {ScaleLinear} from 'd3-scale';
import {Color} from 'types';

import {getColorValue} from '../../../../utilities';
import {MIN_BAR_HEIGHT, BAR_SPACING} from '../../constants';
import styles from '../../shared.scss';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  data: number[];
  colors: Color[];
  highlightColors: Color[];
  isActive: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  isActive,
  highlightColors,
}: Props) {
  const barWidth = width / data.length - BAR_SPACING;

  return (
    <React.Fragment>
      {data.map((value, index) => {
        const rawHeight = Math.abs(yScale(value) - yScale(0));
        const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
        const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
        const modifiedYPosition =
          value > 0 ? yScale(0) - MIN_BAR_HEIGHT : yScale(0);
        const yPosition = needsMinHeight
          ? modifiedYPosition
          : yScale(Math.max(0, value));

        const xPosition = x + (barWidth + BAR_SPACING) * index;

        const fillColor = isActive
          ? getColorValue(highlightColors[index])
          : getColorValue(colors[index]);

        return (
          <rect
            className={styles.Bar}
            key={index}
            x={xPosition}
            y={yPosition}
            fill={fillColor}
            width={barWidth}
            height={height}
          />
        );
      })}
    </React.Fragment>
  );
}
