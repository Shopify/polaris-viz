import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {
  colorSkyDark,
  colorInkLighter,
  spacingLoose,
} from '@shopify/polaris-tokens';

import {Margin} from '../../constants';

interface Props {
  xScale: ScaleLinear<number, number>;
  labels: string[];
  dimensions: DOMRect;
}

const TICK_SIZE = 6;
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

  const [xScaleMin, xScaleMax] = xScale.range();

  return (
    <g transform={`translate(${Margin.Left},0)`}>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSkyDark}
      />

      {ticks.map(({value, xOffset}) => {
        if (value == null) {
          return null;
        }

        return (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSkyDark} />
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
                transform: `translateY(${spacingLoose})`,
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
