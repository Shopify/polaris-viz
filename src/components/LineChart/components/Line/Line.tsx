import React from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';
import {ANIMATION_DELAY} from '../../constants';

import styles from './Line.scss';

interface Props {
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  hasSpline: boolean;
  isAnimated: boolean;
  index: number;
}

export const Line = React.memo(function Shape({
  hasSpline,
  series,
  xScale,
  yScale,
  isAnimated,
  index,
}: Props) {
  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

  if (hasSpline) {
    lineGenerator.curve(curveMonotoneX);
  }

  const path = lineGenerator(series.data);

  if (path == null) {
    return null;
  }

  return (
    <path
      d={path}
      style={{
        /* stylelint-disable-next-line value-keyword-case */
        animationDelay: `${index * ANIMATION_DELAY}ms`,
      }}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={getColorValue(series.color)}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
      className={isAnimated ? styles.Path : null}
    />
  );
});
