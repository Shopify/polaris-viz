import React from 'react';

import {useTheme} from '../../hooks';
import {LINE_HEIGHT, FONT_SIZE} from '../../constants';
import type {YAxisTick} from '../../types';

interface Props {
  ticks: YAxisTick[];
  textAlign: 'left' | 'right';
  width: number;
  ariaHidden?: boolean;
  theme: string;
}

const PADDING_SIZE = 2;

function Axis({ticks, width, textAlign, theme, ariaHidden = false}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <foreignObject
            key={value}
            aria-hidden={ariaHidden}
            transform={`translate(${selectedTheme.grid.horizontalMargin},${
              yOffset - LINE_HEIGHT / 2
            })`}
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
    </React.Fragment>
  );
}

export const YAxis = React.memo(Axis);
