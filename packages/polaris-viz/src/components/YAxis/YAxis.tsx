import React from 'react';

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

function Axis({ticks, width, textAlign, ariaHidden = false, x, y}: Props) {
  const selectedTheme = useTheme();

  return (
    <g transform={`translate(${x},${y})`} aria-hidden="true">
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <foreignObject
            key={value}
            aria-hidden={ariaHidden}
            transform={`translate(0,${yOffset - LINE_HEIGHT / 2})`}
            width={width + PADDING_SIZE * 4}
            height={LINE_HEIGHT}
            style={{
              color: selectedTheme.yAxis.labelColor,
              textAlign,
              fontSize: FONT_SIZE,
              lineHeight: `${LINE_HEIGHT}px`,
            }}
          >
            <span
              style={{
                padding: `0 ${PADDING_SIZE}px`,
                background: selectedTheme.yAxis.backgroundColor,
                whiteSpace: 'nowrap',
                fontFeatureSettings: 'tnum',
              }}
            >
              {formattedValue}
            </span>
          </foreignObject>
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
