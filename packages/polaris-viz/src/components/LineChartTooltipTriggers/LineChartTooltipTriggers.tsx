import type {BoundingRect} from '@shopify/polaris-viz-core';
import {Fragment} from 'react';

import {getTooltipDataAttr} from '../TooltipWrapper';

export interface Props {
  chartXPosition: number;
  chartYPosition: number;
  containerBounds: BoundingRect;
  drawableHeight: number;
  drawableWidth: number;
  longestSeriesLength: number;
}

export function LineChartTooltipTriggers({
  chartXPosition,
  chartYPosition,
  containerBounds,
  drawableHeight,
  drawableWidth,
  longestSeriesLength,
}: Props) {
  if (longestSeriesLength === 0) {
    return null;
  }

  return (
    <Fragment>
      {[...Array(longestSeriesLength + 1).keys()].map((_, index) => {
        const x =
          index * (drawableWidth / longestSeriesLength) -
          drawableWidth / longestSeriesLength / 2;
        const width = drawableWidth / longestSeriesLength;

        return (
          <rect
            key={`${index}-tooltip-area`}
            {...getTooltipDataAttr({
              index,
              x: containerBounds.x + chartXPosition + x + width,
              y: containerBounds.y + chartYPosition,
            })}
            height={drawableHeight}
            width={width}
            x={x}
          />
        );
      })}
    </Fragment>
  );
}
