import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {colorSky, colorInkLighter, spacingLoose} from '@shopify/polaris-tokens';

interface Props {
  xScale: ScaleLinear<number, number>;
  labels?: string[];
  dimensions: DOMRect;
  drawableHeight: number;
}

const TICK_SIZE = 6;
const MIN_LABEL_SPACE = 100;

export function XAxis({xScale, labels, dimensions, drawableHeight}: Props) {
  const ticks = useMemo(() => {
    if (labels == null) {
      return [];
    }

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
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {ticks.map(({value, xOffset}) => {
        if (value == null) {
          return null;
        }

        return (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <line
              y1="0"
              y2={-drawableHeight}
              stroke={colorSky}
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
    </React.Fragment>
  );
}
