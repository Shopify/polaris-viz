import React from 'react';

import {DEFAULT_GREY_LABEL, LINE_HEIGHT, FONT_SIZE} from '../../constants';
import type {YAxisTick} from '../../types';

interface Props {
  ticks: YAxisTick[];
  fontSize?: number;
  labelColor?: string;
  textAlign: 'left' | 'right';
  width: number;
  backgroundColor?: string;
  outerMargin?: number;
}

const PADDING_SIZE = 1;

function Axis({
  ticks,
  fontSize = FONT_SIZE,
  width,
  textAlign,
  outerMargin = 0,
  labelColor = DEFAULT_GREY_LABEL,
  backgroundColor = 'transparent',
}: Props) {
  return (
    <React.Fragment>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <foreignObject
            key={value}
            transform={`translate(${outerMargin},${yOffset - LINE_HEIGHT / 2})`}
            width={width + PADDING_SIZE * 2}
            height={LINE_HEIGHT}
            style={{
              color: labelColor,
              textAlign,
              fontSize,
              lineHeight: `${LINE_HEIGHT}px`,
            }}
          >
            <span
              style={{
                background: backgroundColor,
                padding: PADDING_SIZE,
                whiteSpace: 'nowrap',
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
