import React from 'react';
import {curveStepRounded, DataPoint} from '@shopify/polaris-viz-core';
import {area as areaShape} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';

import type {LineChartRelationalDataSeries} from '../types';

interface RelatedAreaProps {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: LineChartRelationalDataSeries[];
}

export function RelatedArea({yScale, xScale, data}: RelatedAreaProps) {
  function getAreaGenerator(series) {
    const {relatedIndex} = series.metadata;

    const areaGenerator = areaShape<DataPoint>()
      .x((_: DataPoint, index: number) => {
        return xScale(index);
      })
      .y0(({value}) => {
        return yScale(value ?? 0);
      })
      .y1((_, index) => {
        if (data[relatedIndex] == null) {
          return yScale(0);
        }

        return yScale(data[relatedIndex].data[index].value ?? 0);
      })
      .defined(({value}) => value != null)
      .curve(curveStepRounded);

    return areaGenerator(series.data);
  }

  const relatedData = data.filter((series) => {
    return series.metadata?.relatedIndex != null;
  });

  return (
    <React.Fragment>
      {relatedData.map((series, index) => {
        const areaD = getAreaGenerator(series);

        if (areaD == null) {
          return null;
        }

        return (
          <path
            d={areaD}
            fill={series.metadata?.areaColor}
            fillOpacity={0.5}
            key={index}
          />
        );
      })}
    </React.Fragment>
  );
}
