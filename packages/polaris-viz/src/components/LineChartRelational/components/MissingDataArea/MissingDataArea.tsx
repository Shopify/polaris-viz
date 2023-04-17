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

  const nullIndexes: Set<number> = new Set([]);

  data.forEach((series) => {
    series.data.forEach(({value}, index) => {
      if (value == null) {
        nullIndexes.add(index);
      }

      const nextSeries = series.data[index + 1];
      const previousSeries = series.data[index - 1];

      if (value == null && nextSeries && nextSeries.value != null) {
        nullIndexes.add(index + 1);
      }

      if (value == null && previousSeries && previousSeries.value != null) {
        nullIndexes.add(index - 1);
      }
    });
  });

  if (nullIndexes.size === 0) {
    return null;
  }

  const sortedIndexes = [...nullIndexes].sort(
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
      </defs>
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
            fill={`url(#${patternID.current})`}
          />
        );
      })}
    </Fragment>
  );
}

export const MissingDataArea = memo(MissingDataAreaRaw);
