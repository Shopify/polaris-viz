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
  lineWidth: number;
  useGradientLine: boolean;
  isAnimated: boolean;
  index: number;
}

export const Line = React.memo(function Shape({
  hasSpline,
  series,
  xScale,
  yScale,
  lineWidth,
  useGradientLine,
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
    <React.Fragment>
      {useGradientLine ? (
        <defs>
          <linearGradient id="carysgradient1" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(75, 181, 145, 0.85)" />
            <stop offset="100%" stopColor="rgba(143, 104, 255, 0.85)" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d={path}
        style={{display: immediate ? 'block' : display}}
        className={immediate ? null : styles.Path}
        fill="none"
        strokeWidth={`${lineWidth}px`}
        paintOrder="stroke"
        stroke={
          series.lineStyle === 'dashed'
            ? getColorValue(series.color)
            : useGradientLine
            ? 'url(#carysgradient1)'
            : getColorValue(series.color)
        }
        strokeLinejoin="round"
        strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
        {...(series.lineStyle === 'dashed'
          ? {
              ...{
                strokeLinecap: 'round',
                strokeDasharray: '0.1, 8',
              },
            }
          : undefined)}
      />
    </React.Fragment>
  );
});
