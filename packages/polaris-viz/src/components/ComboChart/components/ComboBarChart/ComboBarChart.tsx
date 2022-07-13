import type {ScaleLinear} from 'd3-scale';
import React, {useMemo} from 'react';
import {uniqueId} from '@shopify/polaris-viz-core';
import type {Color, DataGroup} from '@shopify/polaris-viz-core';

import {getYAxisOptionsWithDefaults} from '../../../../utilities';
import {useVerticalBarChart, VerticalBarGroup} from '../../../VerticalBarChart';

interface ComboBarChartProps {
  colors: Color[];
  data: DataGroup;
  drawableHeight: number;
  drawableWidth: number;
  indexOffset: number;
  labels: string[];
  theme: string;
  yScale: ScaleLinear<number, number>;
}

export function ComboBarChart({
  colors,
  data,
  drawableHeight,
  drawableWidth,
  indexOffset,
  labels,
  theme,
  yScale,
}: ComboBarChartProps) {
  const id = useMemo(() => uniqueId('ComboBarChart'), []);

  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(
    data.yAxisOptions,
  );

  const {sortedData, xScale, gapWidth} = useVerticalBarChart({
    data: data.series,
    drawableWidth,
    labels,
    theme,
  });

  return (
    <VerticalBarGroup
      colors={colors}
      data={data.series}
      drawableHeight={drawableHeight}
      gapWidth={gapWidth}
      id={id}
      indexOffset={indexOffset}
      labels={labels}
      sortedData={sortedData}
      stackedValues={null}
      theme={theme}
      xScale={xScale}
      yAxisOptions={yAxisOptionsWithDefaults}
      yScale={yScale}
    />
  );
}
