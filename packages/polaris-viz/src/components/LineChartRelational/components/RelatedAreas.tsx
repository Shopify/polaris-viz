import {useState} from 'react';
import type {DataPoint} from '@shopify/polaris-viz-core';
import {
  BASE_ANIMATION_DURATION,
  useSpringConfig,
  useChartContext,
  curveStepRounded,
} from '@shopify/polaris-viz-core';
import {area as areaShape} from 'd3-shape';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {useExternalHideEvents, useWatchActiveSeries} from '../../../hooks';
import type {LineChartRelationalDataSeries} from '../types';

import {Area} from './Area';

interface RelatedAreaProps {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: LineChartRelationalDataSeries[];
}

export function RelatedAreas({yScale, xScale, data}: RelatedAreaProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const {hiddenIndexes} = useExternalHideEvents();
  const {shouldAnimate, id} = useChartContext();

  const springConfig = useSpringConfig({
    animationDelay: shouldAnimate
      ? BASE_ANIMATION_DURATION * (data.length + 1)
      : 0,
  });

  const {opacity} = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    immediate: !shouldAnimate,
    ...springConfig,
  });

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
    <animated.g style={{opacity}}>
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
            index={index}
            key={index}
            series={series}
            shouldAnimate={shouldAnimate}
          />
        );
      })}
    </animated.g>
  );
}
