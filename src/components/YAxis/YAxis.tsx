import React from 'react';

import {DEFAULT_GREY_LABEL, LINE_HEIGHT, FONT_SIZE} from '../../constants';
import {YAxisTick} from '../../types';

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
  const lineHeightInPx = LINE_HEIGHT * fontSize;

  return (
    <React.Fragment>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <foreignObject
            key={value}
            transform={`translate(${outerMargin},${yOffset -
              lineHeightInPx / 2})`}
            width={width + PADDING_SIZE * 2}
            height={lineHeightInPx}
            style={{
              color: labelColor,
              textAlign,
              fontSize,
              lineHeight: `${lineHeightInPx}px`,
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
