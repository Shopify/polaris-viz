import {useState} from 'react';
import type {DataPoint} from '@shopify/polaris-viz-core';
import {useChartContext, curveStepRounded} from '@shopify/polaris-viz-core';
import {area as areaShape} from 'd3-shape';
import type {LineChartSlotProps} from 'types';

import {useExternalHideEvents, useWatchActiveSeries} from '../../../../hooks';
import type {LineChartRelationalDataSeries} from '../../types';
import {Area} from '../Area';

export interface RelatedAreaProps extends LineChartSlotProps {
  data: LineChartRelationalDataSeries[];
}

export function RelatedAreas({yScale, xScale, data}: RelatedAreaProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const percentileIndex = data.findIndex(
    (series) => series.metadata?.relatedIndex != null,
  );

  const {hiddenIndexes} = useExternalHideEvents();
  const {id} = useChartContext();

  useWatchActiveSeries(id ?? '', ({detail: {index}}) => {
    setActiveIndex(index);
  });

  function getAreaGenerator(series: LineChartRelationalDataSeries) {
    const relatedIndex = series.metadata?.relatedIndex!;

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

  return (
    <g>
      {data.map((series, index) => {
        if (
          series.metadata?.relatedIndex == null ||
          series.metadata?.areaColor == null
        ) {
          return null;
        }

        return (
          <Area
            activeIndex={activeIndex}
            fill={series.metadata?.areaColor}
            getAreaGenerator={getAreaGenerator}
            hiddenIndexes={hiddenIndexes}
            index={percentileIndex}
            key={index}
            series={series}
            shouldAnimate={false}
          />
        );
      })}
    </g>
  );
}
