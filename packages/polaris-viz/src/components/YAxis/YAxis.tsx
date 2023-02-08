import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import {useTheme} from '../../hooks';
import {LINE_HEIGHT, FONT_SIZE} from '../../constants';
import type {YAxisTick} from '../../types';

interface Props {
  ticks: YAxisTick[];
  textAlign: 'left' | 'right';
  width: number;
  x: number;
  y: number;
  ariaHidden?: boolean;
}

const PADDING_SIZE = 2;

export function YAxis({
  ticks,
  width,
  textAlign,
  ariaHidden = false,
  x,
  y,
}: Props) {
  const selectedTheme = useTheme();
  const {characterWidths} = useChartContext();

  return (
    <g transform={`translate(${x},${y})`} aria-hidden="true">
      {ticks.map(({value, formattedValue, yOffset}) => {
        const stringWidth = estimateStringWidth(
          formattedValue,
          characterWidths,
        );

        const x = textAlign === 'right' ? width - stringWidth : 0;

        return (
          <g key={value} transform={`translate(${x},${yOffset})`}>
            <rect
              height={LINE_HEIGHT}
              width={stringWidth + PADDING_SIZE * 2}
              fill={selectedTheme.chartContainer.backgroundColor}
              y={-LINE_HEIGHT / 2}
              x={-PADDING_SIZE}
            />
            <text
              aria-hidden={ariaHidden}
              width={width + PADDING_SIZE * 4}
              height={LINE_HEIGHT}
              fill={selectedTheme.yAxis.labelColor}
              fontSize={FONT_SIZE}
              dominantBaseline="middle"
              style={{
                fontFeatureSettings: 'tnum',
              }}
            >
              {formattedValue}
            </text>
          </g>
        );
      })}
    </g>
  );
}
