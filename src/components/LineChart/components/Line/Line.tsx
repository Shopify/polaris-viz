import React from 'react';
import {ScaleLinear} from 'd3-scale';

import {Point} from '../../../Point';
import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';

interface Props {
  path: string;
  series: Series;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activePointIndex: number | null;
  setActiveAnnotation: any;
  activeAnnotation: boolean;
  prediction: boolean;
}

export function Line({
  path,
  series,
  xScale,
  yScale,
  activePointIndex,
  setActiveAnnotation,
  activeAnnotation,
  prediction,
}: Props) {
  const {style = {}, data} = series;
  const {color = 'colorPurple', lineStyle = 'solid'} = style;

  return (
    <React.Fragment>
      <path
        d={path}
        fill="none"
        strokeWidth="2px"
        paintOrder="stroke"
        stroke={getColorValue(color)}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={lineStyle === 'dashed' || prediction ? '2 4' : 'unset'}
      />

      {data.map(({rawValue, annotate}, index) => {
        if (annotate) {
          return (
            <Point
              key={index}
              color={'colorPurpleDark'}
              cx={xScale(index)}
              cy={yScale(rawValue) - 12}
              active={true}
              isAnnotation={true}
              setActiveAnnotation={setActiveAnnotation}
              activeAnnotation={activeAnnotation}
            />
          );
        }

        return (
          <Point
            key={index}
            color={color}
            cx={xScale(index)}
            cy={yScale(rawValue)}
            active={index === activePointIndex}
            setActiveAnnotation={setActiveAnnotation}
          />
        );
      })}
    </React.Fragment>
  );
}
