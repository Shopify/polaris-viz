import {Fragment, useState} from 'react';
import type {Interpolation} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';
import {
  LinearGradientWithStops,
  isGradientType,
  DataType,
  getColorVisionStylesForActiveIndex,
  COLOR_VISION_SINGLE_ITEM,
  changeColorOpacity,
  changeGradientOpacity,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../../hooks';
import {Point} from '../../../Point';
import type {AnimatedCoordinate} from '../../../../types';

interface PointsProps {
  activeIndex: number | null;
  animatedCoordinates: AnimatedCoordinate[] | null;
  data: LineChartDataSeriesWithDefaults[];
  gradientId: string;
  longestSeriesIndex: number;
  tooltipId: string;
  getXPosition: ({isCrosshair}: {isCrosshair: boolean}) =>
    | number
    | Interpolation<
        | DOMPoint
        | {
            x: number;
            y: number;
          },
        number
      >;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  hiddenIndexes?: number[];
}

export function Points({
  activeIndex,
  animatedCoordinates,
  data,
  getXPosition,
  gradientId,
  hiddenIndexes = [],
  longestSeriesIndex,
  tooltipId,
  xScale,
  yScale,
}: PointsProps) {
  const {shouldAnimate, comparisonIndexes} = useChartContext();

  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

  return (
    <Fragment>
      {data.map((singleSeries, seriesIndex) => {
        if (singleSeries?.metadata?.isVisuallyHidden === true) {
          return null;
        }

        const index = singleSeries.metadata?.relatedIndex ?? seriesIndex;

        if (
          hiddenIndexes.includes(index) ||
          comparisonIndexes.includes(index)
        ) {
          return null;
        }

        const {data: singleData, name, color} = singleSeries;
        const isLongestLine = index === longestSeriesIndex;
        const pointGradientId = `${gradientId}-point-${index}`;
        const animatedYPosition =
          animatedCoordinates == null || animatedCoordinates[index] == null
            ? 0
            : animatedCoordinates[index].to((coord) => coord.y);

        const hasValidData =
          activeIndex == null
            ? false
            : singleData[activeIndex ?? -1]?.value != null;

        const isLineActive =
          activeLineIndex !== -1 && activeLineIndex !== index;

        const isPointVisuallyHidden =
          !hasValidData || animatedCoordinates == null || isLineActive;

        const isPointActive = hasValidData && activeIndex != null;

        const pointColor = isGradientType(color)
          ? `url(#${pointGradientId})`
          : changeColorOpacity(color);

        return (
          <Fragment key={`${name}-${index}`}>
            {isGradientType(color) ? (
              <defs>
                <LinearGradientWithStops
                  id={pointGradientId}
                  gradient={changeGradientOpacity(color)}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
            ) : null}
            {shouldAnimate ? (
              <Point
                color={pointColor}
                cx={getXPosition({isCrosshair: false})}
                cy={animatedYPosition}
                active={isPointActive}
                index={index}
                tabIndex={-1}
                isAnimated={shouldAnimate}
                visuallyHidden={isPointVisuallyHidden}
                ariaHidden
              />
            ) : null}

            {singleData.map(({value}, dataIndex) => {
              if (value == null) {
                return null;
              }

              return (
                <g
                  key={`${name}-${index}-${dataIndex}`}
                  style={getColorVisionStylesForActiveIndex({
                    activeIndex: activeLineIndex,
                    index,
                    fadedOpacity: 0,
                  })}
                >
                  <Point
                    dataType={DataType.Point}
                    color={pointColor}
                    cx={xScale(dataIndex)}
                    cy={yScale(value)}
                    active={activeIndex === dataIndex}
                    index={dataIndex}
                    tabIndex={isLongestLine ? 0 : -1}
                    ariaLabelledby={tooltipId}
                    isAnimated={false}
                    ariaHidden={false}
                    visuallyHidden={shouldAnimate}
                  />
                </g>
              );
            })}
          </Fragment>
        );
      })}
    </Fragment>
  );
}
