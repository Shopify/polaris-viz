import {useMemo, useState} from 'react';
import {
  DataType,
  getColorVisionEventAttrs,
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

import {
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import {useWatchColorVisionEvents} from '../../../hooks';
import type {FormattedStackedSeries} from '../../../types';
import {GroupLabel} from '../GroupLabel';
import {HorizontalStackedBars} from '../HorizontalStackedBars';
import {HorizontalBars} from '../HorizontalBars';

import style from './HorizontalGroup.scss';

export interface HorizontalGroupProps {
  areAllNegative: boolean;
  ariaLabel: string;
  barHeight: number;
  containerWidth: number;
  data: DataSeries[];
  groupHeight: number;
  id: string;
  index: number;
  isSimple: boolean;
  isStacked: boolean;
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
  yAxisOptions,
  xScale,
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

  const rowHeight = useMemo(() => {
    const barPlusSpaceHeight = barHeight + HORIZONTAL_SPACE_BETWEEN_SINGLE;

    if (isStacked) {
      return HORIZONTAL_GROUP_LABEL_HEIGHT + barPlusSpaceHeight;
    }

    return HORIZONTAL_GROUP_LABEL_HEIGHT + barPlusSpaceHeight * data.length;
  }, [barHeight, data.length, isStacked]);

  const animationDelay =
    index * (LOAD_ANIMATION_DURATION / data[0].data.length);

  return (
    <g
      style={getColorVisionStylesForActiveIndex({
        activeIndex: activeGroupIndex,
        index,
      })}
      {...getColorVisionEventAttrs({
        type: COLOR_VISION_GROUP_ITEM,
        index,
      })}
      data-type={DataType.BarGroup}
      data-index={index}
      aria-hidden="false"
      aria-label={ariaLabel}
      role="list"
      className={style.Group}
    >
      <rect
        fill="transparent"
        height={groupHeight}
        width={containerWidth}
        y={-(groupHeight - rowHeight) / 2}
      />

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
          dataKeys={dataKeys}
          groupIndex={index}
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
          data={data}
          groupIndex={index}
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
