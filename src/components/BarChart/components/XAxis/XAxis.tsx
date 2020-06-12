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
const MAX_LABEL_SPACE = 15;

function truncateString(str: string) {
  if (str.length > MAX_LABEL_SPACE) {
    let subStr = str.substring(0, MAX_LABEL_SPACE);
    return subStr + '...';
  } else {
    return str;
  }
}

export function XAxis({xScale, data, dimensions}: Props) {
  const [xScaleMin, xScaleMax] = xScale.range();
  const barWidthOffset = xScale.bandwidth() / 2;

  //to do:
  // truncate strings if they are longer than bar width
  // OR only show some bar labels if there are many of them

  const ticks = useMemo(() => {
    return data.map(({label}, index) => {
      const pointOffset = xScale(index.toString());
      const xOffset =
        pointOffset == null ? barWidthOffset : barWidthOffset + pointOffset;
      return {
        value: truncateString(label),
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
