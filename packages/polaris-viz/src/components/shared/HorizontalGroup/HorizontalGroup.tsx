import React, {useMemo, useState} from 'react';
import {animated, SpringValue} from '@react-spring/web';
import {
  DataType,
  getColorVisionEventAttrs,
  COLOR_VISION_GROUP_ITEM,
  getColorVisionStylesForActiveIndex,
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
  animationDelay: number;
  areAllNegative: boolean;
  ariaLabel: string;
  barHeight: number;
  containerWidth: number;
  data: DataSeries[];
  groupHeight: number;
  id: string;
  index: number;
  isAnimated: boolean;
  isSimple: boolean;
  isStacked: boolean;
  name: string;
  opacity: SpringValue<number>;
  stackedValues: FormattedStackedSeries[];
  theme: string;
  transform: SpringValue<string>;
  xAxisOptions: Required<XAxisOptions>;
  xScale: ScaleLinear<number, number>;
  yAxisOptions: Required<YAxisOptions>;
  zeroPosition: number;
}

export function HorizontalGroup({
  animationDelay,
  areAllNegative,
  ariaLabel,
  barHeight,
  containerWidth,
  data,
  groupHeight,
  id,
  index,
  isAnimated,
  isSimple,
  isStacked,
  name,
  opacity,
  stackedValues,
  theme,
  transform,
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

  return (
    <animated.g
      key={`group-${name}`}
      style={{
        opacity,
        transform,
      }}
    >
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
          theme={theme}
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
            isAnimated={isAnimated}
            name={name}
            stackedValues={stackedValues}
            theme={theme}
            xScale={xScale}
          />
        ) : (
          <HorizontalBars
            activeGroupIndex={activeGroupIndex}
            animationDelay={animationDelay}
            barHeight={barHeight}
            data={data}
            groupIndex={index}
            id={id}
            isAnimated={isAnimated}
            isSimple={isSimple}
            labelFormatter={xAxisOptions.labelFormatter}
            name={name}
            theme={theme}
            xScale={xScale}
            zeroPosition={zeroPosition}
          />
        )}
      </g>
    </animated.g>
  );
}
