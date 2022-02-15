import React from 'react';

import {useTheme} from '../../hooks';
import {LINE_HEIGHT, FONT_SIZE} from '../../constants';
import type {YAxisTick} from '../../types';

interface Props {
  ticks: YAxisTick[];
  textAlign: 'left' | 'right';
  width: number;

  fontSize?: number;
  theme?: string;
}

const PADDING_SIZE = 1;

function Axis({ticks, fontSize = FONT_SIZE, width, textAlign, theme}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <foreignObject
            key={value}
            transform={`translate(${selectedTheme.grid.horizontalMargin},${
              yOffset - LINE_HEIGHT / 2
            })`}
            width={width}
            height={LINE_HEIGHT}
            style={{
              color: selectedTheme.yAxis.labelColor,
              textAlign,
              fontSize,
              lineHeight: `${LINE_HEIGHT}px`,
            }}
          >
            <span
              style={{
                background: selectedTheme.yAxis.backgroundColor,
                padding: PADDING_SIZE,
                whiteSpace: 'nowrap',
                fontFeatureSettings: 'tnum',
              }}
            >
              {formattedValue}
            </span>
          </foreignObject>
        );
      })}
    </React.Fragment>
  );
}

export const YAxis = React.memo(Axis);
