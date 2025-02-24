import {useMemo, useState} from 'react';
import {
  DataType,
  COLOR_VISION_GROUP_ITEM,
  getColorVisionStylesForActiveIndex,
  LOAD_ANIMATION_DURATION,
} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';
import type {
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../hooks';
import type {FormattedStackedSeries, LongestLabel} from '../../../types';
import {GroupLabel} from '../GroupLabel';
import {HorizontalStackedBars} from '../HorizontalStackedBars';
import {HorizontalBars} from '../HorizontalBars';

import style from './HorizontalGroup.scss';

export interface HorizontalGroupProps {
  areAllNegative: boolean;
  ariaLabel: string;
  barHeight: number;
  chartXPosition: number;
  chartYPosition: number;
  containerWidth: number;
  data: DataSeries[];
  groupHeight: number;
  highestValueForSeries: number[];
  id: string;
  index: number;
  isSimple: boolean;
  isStacked: boolean;
  longestLabel: LongestLabel;
  name: string;
  stackedValues: FormattedStackedSeries[];
  xAxisOptions: Required<XAxisOptions>;
  xScale: ScaleLinear<number, number>;
  yAxisOptions: Required<YAxisOptions>;
  zeroPosition: number;
}

export function HorizontalGroup({
  areAllNegative,
  ariaLabel,
  barHeight,
  chartXPosition,
  chartYPosition,
  containerWidth,
  data,
  groupHeight,
  id,
  index,
  isSimple,
  isStacked,
  name,
  stackedValues,
  xAxisOptions,
  xScale,
  yAxisOptions,
  zeroPosition,
}: HorizontalGroupProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_GROUP_ITEM,
    onIndexChange: ({detail}) => {
      setActiveGroupIndex(detail.index);
    },
  });

  const dataKeys = useMemo(() => {
    return data.map(({name}) => name ?? '');
  }, [data]);

  const animationDelay =
    index * (LOAD_ANIMATION_DURATION / data[0].data.length);

  return (
    <g
      style={getColorVisionStylesForActiveIndex({
        activeIndex: activeGroupIndex,
        index,
      })}
      data-type={DataType.BarGroup}
      data-index={index}
      aria-hidden="false"
      aria-label={ariaLabel}
      role="list"
      className={style.Group}
    >
      <GroupLabel
        areAllNegative={areAllNegative}
        containerWidth={containerWidth}
        label={yAxisOptions.labelFormatter(name)}
        zeroPosition={zeroPosition}
      />

      {isStacked ? (
        <HorizontalStackedBars
          activeGroupIndex={activeGroupIndex}
          animationDelay={animationDelay}
          ariaLabel={ariaLabel}
          barHeight={barHeight}
          chartYPosition={chartYPosition}
          chartXPosition={chartXPosition}
          containerWidth={containerWidth}
          dataKeys={dataKeys}
          groupIndex={index}
          groupHeight={groupHeight}
          id={id}
          name={name}
          stackedValues={stackedValues}
          xScale={xScale}
          areAllNegative={areAllNegative}
          labelFormatter={xAxisOptions.labelFormatter}
          isSimple={isSimple}
        />
      ) : (
        <HorizontalBars
          animationDelay={animationDelay}
          activeGroupIndex={activeGroupIndex}
          barHeight={barHeight}
          chartYPosition={chartYPosition}
          chartXPosition={chartXPosition}
          data={data}
          groupIndex={index}
          groupHeight={groupHeight}
          id={id}
          isSimple={isSimple}
          labelFormatter={xAxisOptions.labelFormatter}
          name={name}
          xScale={xScale}
          zeroPosition={zeroPosition}
          containerWidth={containerWidth}
          areAllNegative={areAllNegative}
        />
      )}
    </g>
  );
}
