import React, {useRef, useState, useEffect, useCallback} from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';
import {useSpring} from 'react-spring';

import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';
import {ANIMATION_DELAY} from '../../constants';
import {Point} from '../../../Point';

import styles from './Line.scss';

interface Props {
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  hasSpline: boolean;
  isAnimated: boolean;
  index: number;
  activeIndex?: number | null;
  animationValues: any;
}

export const Line = React.memo(function Shape({
  hasSpline,
  series,
  xScale,
  yScale,
  isAnimated,
  index,
  activeIndex,
  animationValues,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pointPercentage, setPointPercentage] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);

  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

  if (hasSpline) {
    lineGenerator.curve(curveMonotoneX);
  }

  const path = lineGenerator(series.data);

  useEffect(() => {
    if (pathRef && pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [setTotalLength, pathRef]);

  const getCoordinateFromPercentage = useCallback(
    (percent: number) => {
      if (
        !pathRef.current ||
        pathRef.current === null ||
        path == null ||
        totalLength == null
      ) {
        return {x: 0, y: 0};
      }

      const percentage = (percent * totalLength) / 100;
      const coordinates = pathRef.current.getPointAtLength(percentage);

      return {
        x: coordinates.x,
        y: coordinates.y,
      };
    },
    [path, totalLength],
  );

  const getLengthAtPoint = useCallback(
    (pointIndex: number) => {
      if (pointIndex === null) return 0;

      const offscreenPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      const subpath = series.data.slice(0, pointIndex + 1);

      offscreenPath.setAttribute('d', lineGenerator(subpath) || '');
      return offscreenPath.getTotalLength();
    },
    [lineGenerator, series.data],
  );

  const percentageFromSubpath = useCallback(
    (subpathLength: number) => {
      return (subpathLength / totalLength) * 100;
    },
    [totalLength],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const subPathLength = getLengthAtPoint(activeIndex ?? 0);
    const percentage = percentageFromSubpath(subPathLength);
    setPointPercentage(percentage);
  }, [
    activeIndex,
    getLengthAtPoint,
    percentageFromSubpath,
    setPointPercentage,
  ]);

  const {animatedPercentage} = useSpring({
    animatedPercentage: pointPercentage,
  });

  useEffect(() => {
    if (animatedPercentage == null || animationValues.current == null) return;
    animationValues.current.dots[index] = {
      cx: animatedPercentage.interpolate(
        (percent) => getCoordinateFromPercentage(percent as number).x,
      ),
      cy: animatedPercentage.interpolate(
        (percent) => getCoordinateFromPercentage(percent as number).y,
      ),
    };
  }, [animatedPercentage, animationValues, getCoordinateFromPercentage, index]);

  if (path == null) {
    return null;
  }

  return (
    <React.Fragment>
      <path
        d={path}
        ref={pathRef}
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
      {/* {activeIndex !== null && (
        <Point
          color={series.color}
          cx={animatedPercentage.interpolate((percent) => {
            return getCoordinateFromPercentage(percent as number).x;
          })}
          cy={animatedPercentage.interpolate(
            (percent) => getCoordinateFromPercentage(percent as number).y,
          )}
          active
          index={index}
          tabIndex={-1}
          isAnimated={isAnimated}
          ariaHidden
        />
      )} */}
    </React.Fragment>
  );
});
