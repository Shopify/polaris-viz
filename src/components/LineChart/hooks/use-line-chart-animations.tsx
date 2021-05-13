import {useCallback, useMemo} from 'react';
import {Line} from 'd3-shape';
import {useSprings} from '@react-spring/web';

import {SPRING_CONFIG} from '../constants';
import {SeriesWithDefaults} from '../types';
import {getPathLength, getPointAtLength} from '../../../utilities';

export function useLineChartAnimations({
  activeIndex,
  lineGenerator,
  series,
  isAnimated,
}: {
  activeIndex: number | null;
  lineGenerator: Line<{rawValue: number}>;
  series: SeriesWithDefaults[];
  isAnimated: boolean;
}) {
  const currentIndex = activeIndex == null ? 0 : activeIndex;
  const immediate = !isAnimated || series.length === 0 || activeIndex == null;

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

  // Get total lengths of paths for all series
  const totalPaths = useMemo(() => {
    if (immediate) return null;

    return series.map(({data}) => {
      const offscreenPath = createOffScreenPath(data);
      return {
        element: offscreenPath,
        length: getPathLength(offscreenPath),
      };
    });
  }, [immediate, createOffScreenPath, series]);

  // Get length of subpaths at current index for all series
  const subPaths = useMemo(() => {
    if (immediate) return null;

    return series.map(({data}) => {
      const path = createOffScreenPath(data.slice(0, currentIndex + 1));

      return {
        element: path,
        length: getPathLength(path),
      };
    });
  }, [immediate, createOffScreenPath, currentIndex, series]);

  // Get percentage of subpath compared to total length
  const getPercentage = useCallback(
    (subpathLength: number, totalLength: number) => {
      return (subpathLength / totalLength) * 100;
    },
    [],
  );

  // Calculate percentage for subpath compared to total length of all series
  const percentages = useMemo(() => {
    if (immediate || !totalPaths || !subPaths) return null;

    return series.map((_, index: number) => {
      const totalLength = totalPaths[index].length;
      const subPath = subPaths[index];

      return getPercentage(subPath.length, totalLength);
    });
  }, [immediate, totalPaths, subPaths, series, getPercentage]);

  // Using the percentage, get the length to calculate the coordinates at the current index
  const getCoordinatesFromPercentage = useCallback(
    (percent: number, path: SVGPathElement, totalLength: number) => {
      if (path == null || totalLength == null) {
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
