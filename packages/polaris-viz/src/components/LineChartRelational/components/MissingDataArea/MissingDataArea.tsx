import {Fragment, memo, useRef} from 'react';
import type {LineChartSlotProps} from 'types';
import {uniqueId, useTheme} from '@shopify/polaris-viz-core';

import type {LineChartRelationalDataSeries} from '../../types';

export interface Props extends LineChartSlotProps {
  data: LineChartRelationalDataSeries[];
}

function MissingDataAreaRaw({
  data,
  drawableHeight,
  drawableWidth,
  xScale,
}: Props) {
  const selectedTheme = useTheme();
  const patternID = useRef(uniqueId('missingDataPattern'));

  let largestLength = 0;
  let smallestLength = Infinity;

  data.forEach(({data}) => {
    if (data.length > largestLength) {
      largestLength = data.length;
    }

    if (data.length < smallestLength) {
      smallestLength = data.length;
    }
  });

  const lengthDiff = largestLength - smallestLength;

  if (lengthDiff === largestLength) {
    return null;
  }

  const width = xScale(lengthDiff);

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
      <rect
        x={drawableWidth - width}
        y={0}
        height={drawableHeight}
        width={width}
        fill={`url(#${patternID.current})`}
      />
    </Fragment>
  );
}

export const MissingDataArea = memo(MissingDataAreaRaw);
