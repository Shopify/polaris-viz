import {useCallback, useMemo, useRef} from 'react';
import {ScaleLinear} from 'd3-scale';
import {Line} from 'd3-shape';
import {useSprings, SpringConfig} from 'react-spring';

import {SPRING_CONFIG} from '../constants';
import {Series} from '../types';

export function useLineChartAnimations({
  activeIndex,
  lineGenerator,
  series,
  isAnimated,
}: {
  activeIndex: number | null;
  lineGenerator: Line<{rawValue: number}>;
  series: Required<Series>[];
  isAnimated: boolean;
  xScale: ScaleLinear<number, number> | null;
}) {
  const previousIndex = useRef<number | null>(activeIndex);
  const currentIndex = activeIndex == null ? 0 : activeIndex;
  const immediate = !isAnimated || previousIndex.current === null;

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

      return getPercentage(subPath.length, totalLength);
    });
  }, [immediate, getPercentage, series, subPaths, totalPaths]);

  const getCoordinatesFromPercentage = useCallback(
    (percent: number, path: any, totalLength: number) => {
      if (path === null || totalLength == null) {
        return {x: 0, y: 0};
      }

      const length = (percent * totalLength) / 100;

      return path.getPointAtLength(length);
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
    animatedCoordinates:
      immediate || totalPaths === null
        ? null
        : animatedPercentages.map(({percentage}, index) => {
            return percentage.interpolate((percent: number) => {
              const totalLength = totalPaths[index].length;
              const path = totalPaths[index].element;
              return getCoordinatesFromPercentage(percent, path, totalLength);
            });
          }),
    animatedPercentages,
  };
}
