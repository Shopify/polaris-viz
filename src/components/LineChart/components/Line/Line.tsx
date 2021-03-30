import React, {useState, useEffect} from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import {Series} from '../../types';

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
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [display, setDisplay] = useState<string>('none');
  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));
  const immediate = !isAnimated || prefersReducedMotion;

  if (hasSpline) {
    lineGenerator.curve(curveMonotoneX);
  }

  const path = lineGenerator(series.data);

  useEffect(() => {
    const timer = setTimeout(() => setDisplay('block'), index * 250);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  if (path == null) {
    return null;
  }

  return (
    <path
      d={path}
      style={{display: immediate ? 'block' : display}}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={getColorValue(series.color)}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
      className={immediate ? null : styles.Path}
    />
  );
});
