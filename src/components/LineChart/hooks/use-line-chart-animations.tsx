import {ScaleLinear} from 'd3-scale';
import {Line} from 'd3-shape';
import {useCallback, useState, useEffect} from 'react';
import {useSpring, useSprings, SpringConfig} from 'react-spring';

import {getPathLength} from '../../../utilities';
import {SPRING_CONFIG} from '../constants';
import {Series} from '../types';

export function useLineChartAnimations({
  activeIndex,
  lineGenerator,
  series,
  isAnimated,
  xScale,
}: {
  activeIndex: number | null;
  lineGenerator: Line<{rawValue: number}>;
  series: Required<Series>[];
  isAnimated: boolean;
  xScale: ScaleLinear<number, number> | null;
}) {
  const [yPositions, setYPositions] = useState<number[]>([]);
  const [percentages, setPercentages] = useState<number[]>([0, 0]);

  const animatedIndex = activeIndex == null ? 0 : activeIndex;

  const {animatedXPosition} = useSpring<{
    config: SpringConfig;
    animatedXPosition: null | number;
  }>({
    config: SPRING_CONFIG,
    animatedXPosition: xScale === null ? null : xScale(animatedIndex),
  });

  const springs = useSprings<
    {
      config: SpringConfig;
      animatedPercentage: number;
    },
    any
  >(
    percentages.length,
    percentages.map((percent) => ({
      animatedPercentage: percent,
      config: SPRING_CONFIG,
    })),
  );

  const getYPositionFromPercentage = useCallback(
    (percent: number, path: any, totalLength: number) => {
      if (path === null || totalLength == null) {
        return {x: 0, y: 0};
      }

      const length = (percent * totalLength) / 100;

      const coordinates = path.getPointAtLength(length);

      return coordinates.y;
    },
    [],
  );

  const createOffScreenPath = useCallback(
    (data) => {
      const offscreenPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );

      offscreenPath.setAttribute('d', lineGenerator(data) || '');
      return offscreenPath;
    },
    [lineGenerator],
  );

  const getLengthAtPoint = useCallback(
    (pointIndex: number, data: any) => {
      if (pointIndex === null) return 0;
      const subpath = data.slice(0, pointIndex + 1);
      const offscreenPath = createOffScreenPath(subpath);

      return getPathLength(offscreenPath);
    },
    [createOffScreenPath],
  );

  const percentageFromSubpath = useCallback(
    (subpathLength: number, totalLength: number) => {
      return (subpathLength / totalLength) * 100;
    },
    [],
  );

  useEffect(() => {
    if (!isAnimated || series.length === 0 || activeIndex === null) return;

    series.forEach(({data}: any, index: any) => {
      if (data.length >= 1000) return;

      const totalLength = getLengthAtPoint(data.length - 1, data);
      const path = createOffScreenPath(data);

      const currentIndex =
        activeIndex === null || activeIndex === undefined ? 0 : activeIndex;

      const subPathLength = getLengthAtPoint(currentIndex, data);

      const percentage = percentageFromSubpath(subPathLength, totalLength);
      percentages[index] = percentage;
      setPercentages(percentages);

      yPositions[index] = springs[index].animatedPercentage.interpolate(
        (percent: number) => {
          const y = getYPositionFromPercentage(percent, path, totalLength);
          return y;
        },
      );

      setYPositions(yPositions);
    });
  }, [
    isAnimated,
    getLengthAtPoint,
    createOffScreenPath,
    activeIndex,
    percentageFromSubpath,
    getYPositionFromPercentage,
    series,
    percentages,
    springs,
    yPositions,
  ]);

  return {
    yPositions,
    animatedXPosition,
  };
}
