import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {colorSkyDark, colorInkLighter} from '@shopify/polaris-tokens';

import {Margin} from '../../constants';
import {ChartDimensions} from '../../types';

interface Props {
  xScale: ScaleLinear<number, number>;
  labels: string[];
  dimensions: ChartDimensions;
}

const MIN_LABEL_SPACE = 75;

export function XAxis({xScale, labels, dimensions}: Props) {
  const ticks = useMemo(() => {
    const maxTicks = Math.max(
      1,
      Math.floor(dimensions.width / MIN_LABEL_SPACE),
    );

    const numberOfTicks = Math.min(labels.length - 1, maxTicks);

    return xScale.ticks(numberOfTicks).map((value) => {
      return {
        value: labels[value],
        xOffset: xScale(value),
      };
    });
  }, [dimensions, xScale, labels]);

  return (
    <g transform={`translate(${Margin.Left},0)`}>
      <path
        d={`M ${xScale.range()[0]} ${6} v ${-6} H ${xScale.range()[1]} v ${6}`}
        fill="none"
        stroke={colorSkyDark}
      />

      {ticks.map(({value, xOffset}) => {
        return (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line y2="6" stroke={colorSkyDark} />
            <line
              y1="0"
              y2={-(dimensions.height - Margin.Bottom - Margin.Top)}
              stroke={colorSkyDark}
              strokeDasharray="3 2"
            />
            <text
              fill={colorInkLighter}
              style={{
                fontSize: '12px',
                textAnchor: 'middle',
                transform: 'translateY(20px)',
              }}
            >
              {value}
            </text>
          </g>
        );
      })}
    </g>
  );
}
