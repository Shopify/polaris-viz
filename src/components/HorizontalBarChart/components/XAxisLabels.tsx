import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {LABEL_HEIGHT} from '../constants';
import {getTextWidth} from '../../../utilities';
import {FONT_SIZE} from '../../../constants';
import type {XAxisOptions} from '../types';

interface XAxisLabelsProps {
  bandwidth: number;
  chartHeight: number;
  color: string;
  labelFormatter: XAxisOptions['labelFormatter'];
  ticks: number[];
  xScale: ScaleLinear<number, number>;
}

export const XAxisLabels = ({
  bandwidth,
  chartHeight,
  color,
  labelFormatter,
  ticks,
  xScale,
}: XAxisLabelsProps) => {
  return (
    <g transform={`translate(0,${chartHeight - FONT_SIZE})`} aria-hidden="true">
      {ticks.map((value, index) => {
        const label = labelFormatter(value);
        const textWidth = getTextWidth({text: label, fontSize: FONT_SIZE});
        const isLastItem = index === ticks.length - 1;
        const textOffset = isLastItem ? textWidth : textWidth / 2;

        return (
          <foreignObject
            transform={`translate(${
              index === 0 ? 0 : xScale(value) - textOffset
            },0)`}
            height={LABEL_HEIGHT}
            width={bandwidth}
            key={index}
          >
            <div
              style={{
                fontSize: `${FONT_SIZE}px`,
                color,
              }}
            >
              {label}
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};
