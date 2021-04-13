import {useCallback, useState, useEffect, useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {Line} from 'd3-shape';
import {useSpring, useSprings, SpringConfig} from 'react-spring';

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
  const currentIndex = activeIndex == null ? 0 : activeIndex;

  const {animatedXPosition} = useSpring<{
    config: SpringConfig;
    animatedXPosition: null | number;
  }>({
    config: SPRING_CONFIG,
    animatedXPosition: xScale === null ? null : xScale(currentIndex),
  });

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

  const getPercentage = useCallback(
    (subpathLength: number, totalLength: number) => {
      return (subpathLength / totalLength) * 100;
    },
    [],
  );

  const totalPaths = useMemo(() => {
    return series.map(({data}) => {
      const offscreenPath = createOffScreenPath(data);
      return {
        element: offscreenPath,
        length: offscreenPath.getTotalLength(),
      };
    });
  }, [createOffScreenPath, series]);

  const subPaths = useMemo(() => {
    return series.map(({data}: any) => {
      const path = createOffScreenPath(data.slice(0, currentIndex + 1));

      return {
        element: path,
        length: path.getTotalLength(),
      };
    });
  }, [createOffScreenPath, currentIndex, series]);

  const percentages = useMemo(() => {
    return series.map((_, index: any) => {
      const totalLength = totalPaths[index].length;
      const subPath = subPaths[index];

      return getPercentage(subPath.length, totalLength);
    });
  }, [getPercentage, series, subPaths, totalPaths]);

  const animatedPercentages = useSprings<
    {
      config: SpringConfig;
      percentage: number;
    },
    any
  >(
    percentages.length,
    percentages.map((percentage) => ({
      percentage,
      config: SPRING_CONFIG,
    })),
  );
  return {
    animatedYPositions: animatedPercentages.map(({percentage}, index) => {
      return percentage.interpolate((percent: number) => {
        const totalLength = totalPaths[index].length;
        const path = totalPaths[index].element;
        return getYPositionFromPercentage(percent, path, totalLength);
      });
    }),
    animatedXPosition,
    animatedPercentages,
  };
}
