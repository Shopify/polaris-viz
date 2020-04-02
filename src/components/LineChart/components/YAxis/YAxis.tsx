import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {
  colorSkyDark,
  colorInkLighter,
  colorInkLightest,
} from '@shopify/polaris-tokens';

import {Margin} from '../../constants';
import {ChartDimensions} from '../../types';

interface Props {
  yScale: ScaleLinear<number, number>;
  formatYAxisValue(value: number): string;
  dimensions: ChartDimensions;
}

const MIN_LABEL_SPACE = 80;

export function YAxis({yScale, formatYAxisValue, dimensions}: Props) {
  const ticks = useMemo(() => {
    const maxTicks = Math.max(
      1,
      Math.floor(dimensions.height / MIN_LABEL_SPACE),
    );

    return yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYAxisValue(value),
      yOffset: yScale(value),
    }));
  }, [dimensions.height, formatYAxisValue, yScale]);

  return (
    <g>
      {ticks.map(({value, formattedValue, yOffset}) => {
        return (
          <g key={value} transform={`translate(0,${yOffset})`}>
            <line
              x2={`${dimensions.width - Margin.Left - Margin.Right}`}
              stroke={value === 0 ? colorInkLightest : colorSkyDark}
            />
            <text
              fill={colorInkLighter}
              style={{
                fontSize: '12px',
                textAnchor: 'end',
                transform: 'translateX(-10px)',
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
