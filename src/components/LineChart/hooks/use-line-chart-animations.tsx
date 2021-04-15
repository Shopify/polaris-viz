import {useCallback, useMemo, useRef} from 'react';
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
  const previousIndex = useRef<number | null>(activeIndex);
  const currentIndex = activeIndex == null ? 0 : activeIndex;
  const immediate =
    !isAnimated ||
    previousIndex.current === null ||
    series.some(({data}) => data.length >= 1000);

  const {animatedXPosition} = useSpring<{
    config: SpringConfig;
    animatedXPosition: null | number;
  }>({
    config: SPRING_CONFIG,
    animatedXPosition: xScale === null ? null : xScale(currentIndex),
    immediate,
  });

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

  const totalPaths = useMemo(() => {
    if (immediate) return null;

    return series.map(({data}) => {
      const offscreenPath = createOffScreenPath(data);
      return {
        element: offscreenPath,
        length: offscreenPath.getTotalLength(),
      };
    });
  }, [immediate, createOffScreenPath, series]);

  const subPaths = useMemo(() => {
    if (immediate) return null;

    return series.map(({data}) => {
      if (currentIndex >= data.length) {
        return null;
      }

      const path = createOffScreenPath(data.slice(0, currentIndex + 1));

      return {
        element: path,
        length: path.getTotalLength(),
      };
    });
  }, [immediate, createOffScreenPath, currentIndex, series]);

  const getPercentage = useCallback(
    (subpathLength: number, totalLength: number) => {
      return (subpathLength / totalLength) * 100;
    },
    [],
  );

  const percentages = useMemo(() => {
    if (immediate || !totalPaths || !subPaths) return null;

    return series.map((_, index: any) => {
      const totalLength = totalPaths[index].length;
      const subPath = subPaths[index];

      if (subPath === null) {
        return 101;
      }

      return getPercentage(subPath.length, totalLength);
    });
  }, [immediate, getPercentage, series, subPaths, totalPaths]);

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

  const animatedPercentages = useSprings<
    {
      config: SpringConfig;
      percentage: number;
    },
    any
  >(
    percentages === null ? 0 : percentages.length,
    percentages === null
      ? []
      : percentages.map((percentage) => ({
          percentage,
          config: SPRING_CONFIG,
          immediate,
        })),
  );

  previousIndex.current = activeIndex;

  return {
    animatedYPositions:
      immediate || totalPaths === null
        ? null
        : animatedPercentages.map(({percentage}, index) => {
            if (percentage.getValue() > 100) return null;

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
