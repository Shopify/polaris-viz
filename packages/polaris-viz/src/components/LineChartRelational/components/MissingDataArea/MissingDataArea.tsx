import {Fragment, memo, useRef} from 'react';
import type {LineChartSlotProps} from 'types';
import {uniqueId, useTheme} from '@shopify/polaris-viz-core';

import type {LineChartRelationalDataSeries} from '../../types';

import {groupNumbersIntoRuns} from './utilities/groupNumbersIntoRuns';

export interface Props extends LineChartSlotProps {
  data: LineChartRelationalDataSeries[];
}

function MissingDataAreaRaw({data, drawableHeight, xScale}: Props) {
  const selectedTheme = useTheme();
  const patternID = useRef(uniqueId('missingDataPattern'));
  const dataSeriesHasNulls = useRef(false);

  const dataLength = data[0].data.length - 1;

  const indexesWithData: Set<number> = new Set([]);

  for (const series of data) {
    const hasAnyNulls = series.data.some(({value}) => value == null);

    if (!hasAnyNulls) {
      continue;
    }

    for (const [index, {value}] of series.data.entries()) {
      if (value != null) {
        indexesWithData.add(index);
      } else {
        dataSeriesHasNulls.current = true;
      }
    }
  }

  if (indexesWithData.size === 0 || dataSeriesHasNulls.current === false) {
    return null;
  }

  const sortedIndexes = [...indexesWithData].sort(
    (current, next) => current - next,
  );

  const groups = groupNumbersIntoRuns(sortedIndexes);

  return (
    <Fragment>
      <defs>
        <pattern
          id={patternID.current}
          patternUnits="userSpaceOnUse"
          width="12"
          height="12"
          patternTransform="rotate(135)"
        >
          <line
            x1="0"
            y="0"
            x2="0"
            y2="12"
            stroke={selectedTheme.missingData.lineColor}
            strokeWidth="12"
            opacity="0.2"
          />
        </pattern>
        <mask id={`${patternID.current}-clip`}>
          <rect
            x={xScale(0)}
            y={0}
            height={drawableHeight}
            width={xScale(dataLength)}
            fill="white"
          />
          {groups.map((indexes, index) => {
            const startIndex = Math.min(...indexes);
            const endIndex = Math.max(...indexes);
            const width = xScale(endIndex - startIndex);

            return (
              <rect
                key={index}
                x={xScale(startIndex)}
                y={0}
                height={drawableHeight}
                width={width}
                fill="black"
              />
            );
          })}
        </mask>
      </defs>
      <rect
        x={xScale(0)}
        y={0}
        height={drawableHeight}
        width={xScale(dataLength)}
        fill={`url(#${patternID.current})`}
        mask={`url(#${patternID.current}-clip)`}
      />
    </Fragment>
  );
}

export const MissingDataArea = memo(MissingDataAreaRaw);
