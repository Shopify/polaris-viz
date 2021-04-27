import React from 'react';
import {spacingExtraTight, colorSky} from '@shopify/polaris-tokens';

import {FONT_SIZE, DEFAULT_GREY_LABEL, SPACING} from '../../constants';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
  axisMargin: number;
  fontSize?: number;
  showGridLines?: boolean;
  gridColor?: string;
  labelColor?: string;
  labelBackgroundColor?: string;
}

function Axis({
  ticks,
  drawableWidth,
  fontSize = FONT_SIZE,
  gridColor = colorSky,
  showGridLines = true,
  labelColor = DEFAULT_GREY_LABEL,
  labelBackgroundColor,
  axisMargin,
}: Props) {
  const labelWidth = axisMargin - SPACING / 2;
  const labelHeight = fontSize + SPACING / 2;
  const radius = 5;

  const path = `
    m ${radius} 0
    h ${labelWidth - radius * 2}
    a ${radius} ${radius} 0 0 1 ${radius} ${radius}
    v ${labelHeight - radius * 2}
    a ${radius} ${radius} 0 0 1 ${radius * -1} ${radius}
    H${radius}
    a ${radius} ${radius} 0 0 1 ${radius * -1} ${radius * -1}
    V${radius}
    a ${radius} ${radius} 0 0 1 ${radius} ${radius * -1}
    z
  `;

  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            {showGridLines ? (
              <line x2={drawableWidth} stroke={gridColor} />
            ) : null}

            {labelBackgroundColor ? (
              <path
                d={path}
                fill={labelBackgroundColor}
                style={{
                  transform: `translateX(-${labelWidth +
                    SPACING / 4}px) translateY(-${labelHeight / 2}px)`,
                }}
              />
            ) : null}
            <text
              aria-hidden
              style={{
                fontSize: `${fontSize}px`,
                textAnchor: 'middle',
                transform: `translateX(-${axisMargin /
                  2}px) translateY(${spacingExtraTight})`,
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
