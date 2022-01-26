import React from 'react';
import {animated, SpringValue} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';

import {
  DataSeries,
  DataType,
  FormattedStackedSeries,
  LabelFormatter,
} from '../../../types';
import {GroupLabel} from '../GroupLabel';
import {HorizontalStackedBars} from '../HorizontalStackedBars';
import {HorizontalBars} from '../HorizontalBars';

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
  return (
    <animated.g
      key={`group-${name}`}
      data-type={DataType.BarGroup}
      data-id={`${DataType.BarGroup}-${index}`}
      style={{
        opacity,
        transform,
      }}
    >
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
          data={data}
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
          ariaLabel={ariaLabel}
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
    </animated.g>
  );
}
