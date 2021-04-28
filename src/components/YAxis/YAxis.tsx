import React from 'react';
import {
  spacingBase,
  spacingExtraTight,
  colorSky,
} from '@shopify/polaris-tokens';

import {FONT_SIZE, DEFAULT_GREY_LABEL} from '../../constants';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
  fontSize?: number;
  showGridLines?: boolean;
  gridColor?: string;
  labelColor?: string;
  axisMargin?: number;
  overflowStyle?: boolean;
}

function Axis({
  ticks,
  drawableWidth,
  fontSize,
  gridColor = colorSky,
  showGridLines = true,
  labelColor = DEFAULT_GREY_LABEL,
  axisMargin = 0,
  overflowStyle = false,
}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <React.Fragment key={value}>
            <g
              transform={`translate(${
                overflowStyle ? 0 : axisMargin
              },${yOffset})`}
            >
              {showGridLines ? (
                <line x2={drawableWidth} stroke={gridColor} />
              ) : null}
            </g>
            <g transform={`translate(${axisMargin},${yOffset})`}>
              <text
                aria-hidden
                style={{
                  fontSize: `${fontSize ? fontSize : FONT_SIZE}px`,
                  textAnchor: 'end',
                  transform: `translateX(-${spacingBase}) translateY(${spacingExtraTight})`,
                  fill: labelColor,
                }}
              >
                {formattedValue}
              </text>
            </g>
          </React.Fragment>
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
