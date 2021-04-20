import React, {useMemo} from 'react';

import {useLineChartAnimations} from '../../hooks';
import {Point} from '../../../Point';

export const AnimatedPoints = ({
  series,
  lineGenerator,
  activeIndex,
  xScale,
  isAnimated,
}: any) => {
  const {animatedCoordinates} = useLineChartAnimations({
    series,
    lineGenerator,
    activeIndex,
    xScale,
    isAnimated,
  });

  const longestSeriesIndex = useMemo(
    () =>
      series.reduce((maxIndex: any, currentSeries: any, currentIndex: any) => {
        return series[maxIndex].data.length < currentSeries.data.length
          ? currentIndex
          : maxIndex;
      }, 0),
    [series],
  );

  return (
    <React.Fragment>
      {series.map((singleSeries: any, index: any) => {
        const {data, color} = singleSeries;
        return (
          <Point
            key={index}
            color={color}
            cx={
              animatedCoordinates === null
                ? 0
                : animatedCoordinates[longestSeriesIndex].interpolate(
                    (coord: SVGPoint) => coord.x,
                  )
            }
            cy={
              animatedCoordinates === null
                ? 0
                : animatedCoordinates[index].interpolate(
                    (coord: SVGPoint) => coord.y,
                  )
            }
            active={activeIndex !== null}
            index={index}
            tabIndex={-1}
            isAnimated={isAnimated}
            visuallyHidden={
              !isAnimated ||
              animatedCoordinates === null ||
              activeIndex === null ||
              Number(activeIndex) >= data.length
            }
            ariaHidden
          />
        );
      })}
    </React.Fragment>
  );
};
