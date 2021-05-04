import React from 'react';

import {DEFAULT_GREY_LABEL} from '../../constants';

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
  axisMargin?: number;
  overflowStyle?: boolean;
}

const textHeight = 15;

function Axis({
  ticks,
  fontSize,
  labelColor = DEFAULT_GREY_LABEL,
  axisMargin = 0,
  overflowStyle = false,
}: Props) {
  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <React.Fragment key={value}>
            <g
              transform={`translate(${
                overflowStyle ? 0 : axisMargin
              },${yOffset})`}
            />
            <g transform={`translate(${0},${yOffset - textHeight / 2})`}>
              <foreignObject
                width={axisMargin}
                height={textHeight}
                style={{
                  color: labelColor,
                  fontSize,
                  textAlign: overflowStyle ? 'left' : 'right',
                }}
              >
                <span
                  style={{
                    background: 'white',
                    padding: '4px',
                    borderRadius: '8px',
                    margin: '-4px',
                  }}
                >
                  {formattedValue}
                </span>
              </foreignObject>
            </g>
          </React.Fragment>
        );
      })}
    </g>
  );
}

export const YAxis = React.memo(Axis);
