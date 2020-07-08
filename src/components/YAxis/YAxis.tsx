import React from 'react';
import {
  colorSky,
  colorSkyDark,
  colorInkLighter,
  spacingBase,
  spacingExtraTight,
} from '@shopify/polaris-tokens';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
}

export function YAxis({ticks, drawableWidth}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            <line
              x2={drawableWidth}
              stroke={value === 0 ? colorSkyDark : colorSky}
            />
            <text
              fill={colorInkLighter}
              style={{
                fontSize: '12px',
                textAnchor: 'end',
                transform: `translateX(-${spacingBase}) translateY(${spacingExtraTight})`,
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
