import React, {useMemo, useState} from 'react';
import {animated, SpringValue} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';

import {
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../../../constants';
import {
  getColorBlindEventAttrs,
  getOpacityForActive,
  useWatchColorBlindEvents,
} from '../../../hooks';
import {
  DataSeries,
  DataType,
  FormattedStackedSeries,
  LabelFormatter,
} from '../../../types';
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
  id: string;
  index: number;
  isAnimated: boolean;
  isSimple: boolean;
  isStacked: boolean;
  labelFormatter: LabelFormatter;
  name: string;
  opacity: SpringValue<number>;
  stackedValues: FormattedStackedSeries[];
  transform: SpringValue<string>;
  xScale: ScaleLinear<number, number>;
  zeroPosition: number;
  theme?: string;
}

export function HorizontalGroup({
  animationDelay,
  areAllNegative,
  ariaLabel,
  barHeight,
  containerWidth,
  data,
  id,
  index,
  isAnimated,
  isSimple,
  isStacked,
  labelFormatter,
  name,
  opacity,
  stackedValues,
  theme,
  transform,
  xScale,
  zeroPosition,
}: HorizontalGroupProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(-1);

  useWatchColorBlindEvents({
    type: 'group',
    onIndexChange: ({detail}) => {
      setActiveGroupIndex(detail.index);
    },
  });

  const dataKeys = useMemo(() => {
    return data.map(({name}) => name ?? '');
  }, [data]);

  const hitAreaHeight = useMemo(() => {
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
        style={{opacity: getOpacityForActive(activeGroupIndex, index)}}
        {...getColorBlindEventAttrs({
          type: 'group',
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
          height={hitAreaHeight}
          width={containerWidth}
        />
        <GroupLabel
          areAllNegative={areAllNegative}
          containerWidth={containerWidth}
          label={name}
          theme={theme}
          zeroPosition={zeroPosition}
        />
        {isStacked ? (
          <HorizontalStackedBars
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
            animationDelay={animationDelay}
            barHeight={barHeight}
            data={data}
            groupIndex={index}
            id={id}
            isAnimated={isAnimated}
            isSimple={isSimple}
            labelFormatter={labelFormatter}
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
