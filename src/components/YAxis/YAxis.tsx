import React from 'react';
import {spacingBase, spacingExtraTight} from '@shopify/polaris-tokens';

import {YAxisTick} from '../../types';
import {FONT_SIZE, DEFAULT_GREY_LABEL} from '../../constants';

interface Props {
  ticks: YAxisTick[];
  fontSize?: number;
  labelColor?: string;
}

function Axis({ticks, fontSize, labelColor = DEFAULT_GREY_LABEL}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
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
