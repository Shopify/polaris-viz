import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';

import {
  FONT_SIZE,
  DEFAULT_GREY_LABEL,
  SPACING,
  SPACING_EXTRA_TIGHT,
  LABEL_RADIUS,
} from '../../constants';

interface Props {
  ticks: {
    value: number;
    formattedValue: string;
    yOffset: number;
  }[];
  drawableWidth: number;
  axisMargin?: number;
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
  axisMargin = 0,
}: Props) {
  const labelWidth = axisMargin - SPACING / 2;
  const labelHeight = fontSize + SPACING / 2;

  const textTransform =
    labelBackgroundColor == null
      ? `translateX(-${SPACING}px) translateY(${SPACING_EXTRA_TIGHT}px)`
      : `translateX(-${axisMargin / 2}px) translateY(${SPACING_EXTRA_TIGHT}px)`;

  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            {showGridLines ? (
              <line x2={drawableWidth} stroke={gridColor} />
            ) : null}

            {labelBackgroundColor ? (
              <rect
                width={labelWidth}
                height={labelHeight}
                rx={LABEL_RADIUS}
                fill={labelBackgroundColor}
                transform={`translate(-${(axisMargin + labelWidth) /
                  2},-${labelHeight / 2})`}
              />
            ) : null}
            <text
              aria-hidden
              style={{
                fontSize: `${fontSize}px`,
                textAnchor: labelBackgroundColor == null ? 'end' : 'middle',
                transform: textTransform,
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
