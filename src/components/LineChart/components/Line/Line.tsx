import React, {useRef, useState, useEffect, useCallback} from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';
import {useSpring} from 'react-spring';

import {getColorValue} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import {Series} from '../../types';
import {Point} from '../../../Point';

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
  activeIndex?: number | null;
  animatedXPosition?: any;
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
  activeIndex,
  animatedXPosition,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const pathRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

  const getCoordinateFromPercentage = useCallback(
    (p: number) => {
      if (
        !pathRef.current ||
        pathRef.current === null ||
        path == null ||
        totalLength == null
      ) {
        return {x: 0, y: 0};
      }

      const percentage = (p * totalLength) / 100;
      const pt = pathRef.current.getPointAtLength(percentage);

      return {
        x: pt.x,
        y: pt.y,
      };
    },
    [path, totalLength],
  );

  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));
  const immediate = !isAnimated || prefersReducedMotion;

  if (hasSpline) {
    lineGenerator.curve(curveMonotoneX);
  }

  const path = lineGenerator(series.data);

  const getLengthAtPoint = useCallback(
    (pointIndex: number) => {
      if (pointIndex === null) return 0;

      const offscreenPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      const filteredPath = series.data.slice(0, pointIndex + 1);

      offscreenPath.setAttribute('d', lineGenerator(filteredPath) || '');
      return offscreenPath.getTotalLength();
    },
    [lineGenerator, series.data],
  );

  const totalLength = getLengthAtPoint(13);

  const percentageFromSubLength = useCallback(
    (partialLength: number) => {
      const percentage = (partialLength / totalLength) * 100;
      return percentage;
    },
    [totalLength],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const subPathLength = getLengthAtPoint(activeIndex);
    const percentage = percentageFromSubLength(subPathLength);
    setPercentage(percentage);

    if (index === 0) {
      const xPos = animatedPercentage.interpolate((p) => {
        return getCoordinateFromPercentage(p).x;
      });

      animatedXPosition.current = xPos;
    }
  }, [
    activeIndex,
    animatedPercentage,
    animatedXPosition,
    getCoordinateFromPercentage,
    getLengthAtPoint,
    index,
    percentageFromSubLength,
    setPercentage,
  ]);

  const {animatedPercentage} = useSpring({
    animatedPercentage: percentage,
    config: {
      friction: 5,
      clamp: true,
      mass: 1,
      tension: 190,
    },
  });

  if (path == null) {
    return null;
  }

  return (
    <React.Fragment>
      {useGradientLine ? (
        <defs>
          <linearGradient id="carysgradient1" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(75, 181, 145, 0.85)" />
            <stop offset="85%" stopColor="rgba(92, 105, 208, 0.85)" />
            <stop offset="100%" stopColor="rgba(92, 105, 208, 0.85)" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        ref={pathRef}
        d={path}
        style={{
          /* stylelint-disable-next-line value-keyword-case */
          animationDelay: `${index * 250}ms`,
        }}
        className={immediate ? null : styles.Path}
        fill="none"
        strokeWidth={
          series.lineStyle === 'dashed' ? `${lineWidth}px` : `${lineWidth}px`
        }
        paintOrder="stroke"
        stroke={
          series.lineStyle === 'dashed'
            ? getColorValue(series.color)
            : useGradientLine
            ? 'url(#carysgradient1)'
            : getColorValue(series.color)
        }
        strokeLinejoin="round"
        {...(series.lineStyle === 'dashed'
          ? {
              ...{
                strokeLinecap: 'round',
                strokeDasharray: '0.1, 6',
              },
            }
          : undefined)}
      />
      {activeIndex !== null && (
        <Point
          useGradientLine={useGradientLine}
          color={series.color}
          cx={animatedXPosition.current}
          cy={animatedPercentage.interpolate(
            (p) => getCoordinateFromPercentage(p).y,
          )}
          active
          // onFocus={handleFocus}
          index={index}
          tabIndex={-1}
          // ariaLabelledby={tooltipId.current}
          isAnimated={isAnimated}
        />
      )}
    </React.Fragment>
  );
});
