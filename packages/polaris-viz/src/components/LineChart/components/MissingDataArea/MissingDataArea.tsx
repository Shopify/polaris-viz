import {Fragment, memo, useRef} from 'react';
import type {LineChartSlotProps} from 'types';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {uniqueId, useTheme} from '@shopify/polaris-viz-core';

import {useIndexForLabels} from '../../../../hooks/useIndexForLabels';

import {Pill} from './components/';

export interface Props extends LineChartSlotProps {
  data: DataSeries[];
  missingData: any;
}

function MissingDataAreaRaw({
  data,
  drawableHeight,
  missingData,
  xScale,
}: Props) {
  const selectedTheme = useTheme();
  const patternID = useRef(uniqueId('missingDataPattern'));
  const indexForLabels = useIndexForLabels(data);

  let fromIndex = -1;
  let toIndex = -1;

  data[indexForLabels].data.forEach(({key}, index) => {
    if (key === missingData.to) {
      toIndex = index;
    }

    if (key === missingData.from) {
      fromIndex = index;
    }
  });

  const width = xScale(toIndex - fromIndex);

  const xPosition = xScale(fromIndex);

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

      <line
        x1={xPosition}
        x2={xPosition}
        y1="0"
        y2={drawableHeight}
        stroke={selectedTheme.missingData.lineColor}
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      <line
        x1={xPosition + width}
        x2={xPosition + width}
        y1="0"
        y2={drawableHeight}
        stroke={selectedTheme.missingData.lineColor}
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      <rect
        x={xPosition}
        y={0}
        height={drawableHeight}
        width={width}
        fill={`url(#${patternID.current})`}
      />

      <Pill
        containerWidth={width}
        description={missingData.description}
        label={missingData.label}
        x={xPosition}
      />
    </Fragment>
  );
}

export const MissingDataArea = memo(MissingDataAreaRaw);
