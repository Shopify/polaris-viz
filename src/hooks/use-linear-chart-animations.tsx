import {useCallback, useMemo} from 'react';
import type {Line} from 'd3-shape';
import {useSprings} from '@react-spring/web';

import {getPathLength, getPointAtLength} from '../utilities';
import type {DataPoint, DataSeries} from '../types';

export const SPRING_CONFIG = {
  friction: 5,
  clamp: true,
  mass: 1,
  tension: 190,
};

export function useLinearChartAnimations({
  activeIndex,
  lineGenerator,
  data,
  isAnimated,
}: {
  activeIndex: number | null;
  lineGenerator: Line<DataPoint>;
  data: DataSeries[];
  isAnimated: boolean;
}) {
  const currentIndex = activeIndex == null ? 0 : activeIndex;
  const immediate = !isAnimated || data.length === 0 || activeIndex == null;

  // Create off screen paths used for sub path and total path length calculations
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

  // Get total lengths of paths for all data
  const totalPaths = useMemo(() => {
    if (immediate) return null;

    return data.map(({data}) => {
      const offscreenPath = createOffScreenPath(data);
      return {
        element: offscreenPath,
        length: getPathLength(offscreenPath),
      };
    });
  }, [immediate, createOffScreenPath, data]);

  // Get length of subpaths at current index for all data
  const subPaths = useMemo(() => {
    if (immediate) return null;

    return data.map(({data}) => {
      const path = createOffScreenPath(data.slice(0, currentIndex + 1));

      return {
        element: path,
        length: getPathLength(path),
      };
    });
  }, [immediate, createOffScreenPath, currentIndex, data]);

  // Get percentage of subpath compared to total length
  const getPercentage = useCallback(
    (subpathLength: number, totalLength: number) => {
      if (totalLength === 0) {
        return 0;
      }

      return (subpathLength / totalLength) * 100;
    },
    [],
  );

  // Calculate percentage for subpath compared to total length of all data
  const percentages = useMemo(() => {
    if (immediate || !totalPaths || !subPaths) return null;

    return data.map((_, index: number) => {
      const totalLength = totalPaths[index].length;
      const subPath = subPaths[index];

      return getPercentage(subPath.length, totalLength);
    });
  }, [immediate, totalPaths, subPaths, data, getPercentage]);

  // Using the percentage, get the length to calculate the coordinates at the current index
  const getCoordinatesFromPercentage = useCallback(
    (percent: number, path: SVGPathElement, totalLength: number) => {
      if (path == null || totalLength == null || totalLength === 0) {
        return {x: 0, y: 0};
      }

      const length = (percent * totalLength) / 100;

      return getPointAtLength(path, length);
    },
    [],
  );

  // Create a spring with the same config for each series
  const animatedPercentages = useSprings(
    percentages == null ? 0 : percentages.length,
    percentages == null
      ? []
      : percentages.map((percentage) => ({
          percentage,
          config: SPRING_CONFIG,
          default: {immediate},
        })),
  );

  // Return animated coordinates by interpolating the percentage
  return {
    animatedCoordinates:
      immediate || totalPaths == null
        ? null
        : animatedPercentages.map(({percentage}, index) => {
            return percentage.to((percent: number) => {
              const totalLength = totalPaths[index].length;
              const path = totalPaths[index].element;
              return getCoordinatesFromPercentage(percent, path, totalLength);
            });
          }),
  };
}
