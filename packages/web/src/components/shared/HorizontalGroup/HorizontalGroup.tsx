import React from 'react';
import {animated, SpringValue} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';

import {DataSeries, DataType, LabelFormatter} from '../../../types';
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
  transform: SpringValue<string>;
  xScale: ScaleLinear<number, number>;
  xScaleStacked: ScaleLinear<number, number> | null;
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
  theme,
  transform,
  xScale,
  xScaleStacked,
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

      {isStacked && xScaleStacked ? (
        <HorizontalStackedBars
          animationDelay={animationDelay}
          ariaLabel={ariaLabel}
          barHeight={barHeight}
          data={data}
          groupIndex={index}
          id={id}
          isAnimated={isAnimated}
          name={name}
          theme={theme}
          xScale={xScaleStacked}
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
