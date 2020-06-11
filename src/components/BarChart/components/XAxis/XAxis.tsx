import React, {useMemo} from 'react';
import {ScaleBand} from 'd3-scale';
import {colorSky, colorInkLighter, spacingLoose} from '@shopify/polaris-tokens';
import {BarData} from 'components/BarChart/types';

interface Props {
  xScale: ScaleBand<string>;
  data: BarData[];
  dimensions: DOMRect;
}

const TICK_SIZE = 6;
const MIN_LABEL_SPACE = 100;

export function XAxis({xScale, data, dimensions}: Props) {
  const [xScaleMin, xScaleMax] = xScale.range();
  const barWidthOffset = xScale.bandwidth() / 2;

  const ticks = useMemo(() => {
    return data.map(({label}, index) => {
      const pointOffset = xScale(index.toString());
      const xOffset =
        pointOffset == null ? barWidthOffset : barWidthOffset + pointOffset;
      return {
        value: label,
        xOffset,
      };
    });
  }, [dimensions, xScale, data]);

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {ticks.map(({value, xOffset}, index) => {
        if (value == null) {
          return null;
        }

        return (
          <g key={index} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
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
