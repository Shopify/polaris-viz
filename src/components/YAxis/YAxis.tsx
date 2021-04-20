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
}

function Axis({
  ticks,
  drawableWidth,
  fontSize,
  gridColor = colorSky,
  showGridLines = true,
  labelColor = DEFAULT_GREY_LABEL,
}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            {showGridLines ? (
              <line x2={drawableWidth} stroke={gridColor} />
            ) : null}
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
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
