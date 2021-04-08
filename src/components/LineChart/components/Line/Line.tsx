import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';
import {useSpring, SpringConfig} from 'react-spring';

import {getColorValue, getPathLength} from '../../../../utilities';
import {Series} from '../../types';
import {ANIMATION_DELAY, SPRING_CONFIG} from '../../constants';
import {AnimationValues} from '../../Chart';

import styles from './Line.scss';

interface Props {
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  hasSpline: boolean;
  isAnimated: boolean;
  index: number;
  activeIndex?: number | null;
  animationValues?: MutableRefObject<AnimationValues>;
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
      const length = getPathLength(pathRef.current);
      setTotalLength(length);
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
      return getPathLength(offscreenPath);
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
    if (activeIndex === null || !isAnimated) {
      return;
    }

    const subPathLength = getLengthAtPoint(
      activeIndex === null || activeIndex === undefined ? 0 : activeIndex,
    );

    const percentage = percentageFromSubpath(subPathLength);
    setPointPercentage(percentage);
  }, [
    activeIndex,
    getLengthAtPoint,
    isAnimated,
    percentageFromSubpath,
    setPointPercentage,
  ]);

  const {animatedPercentage} = useSpring<{
    config: SpringConfig;
    animatedPercentage: number;
  }>({
    config: SPRING_CONFIG,
    animatedPercentage: pointPercentage,
  });

  useEffect(() => {
    if (
      !isAnimated ||
      animatedPercentage === null ||
      animationValues === undefined ||
      animationValues.current === null
    ) {
      return;
    }

    animationValues.current.points[index] = {
      cx: animatedPercentage.interpolate(
        (percent: number) => getCoordinateFromPercentage(percent).x,
      ),
      cy: animatedPercentage.interpolate(
        (percent: number) => getCoordinateFromPercentage(percent).y,
      ),
    };
  }, [
    isAnimated,
    animatedPercentage,
    animationValues,
    getCoordinateFromPercentage,
    index,
  ]);

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
    </React.Fragment>
  );
});
