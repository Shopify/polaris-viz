import {Fragment, useState} from 'react';
import type {Series} from 'd3-shape';
import type {Color} from '@shopify/polaris-viz-core';
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
import type {ScaleLinear} from 'd3-scale';

import {Point} from '../../../';
import type {AnimatedCoordinate, GetXPosition} from '../../../../types';
import {useWatchColorVisionEvents} from '../../../../hooks';

interface PointsProps {
  activePointIndex: number | null;
  animatedCoordinates: AnimatedCoordinate[] | null;
  colors: Color[];
  getXPosition: GetXPosition;

  stackedValues: Series<
    {
      [key: string]: number;
    },
    string
  >[];
  tooltipId: string;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export function Points({
  activePointIndex,
  animatedCoordinates,
  colors,
  getXPosition,
  stackedValues,
  tooltipId,
  xScale,
  yScale,
}: PointsProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const {shouldAnimate} = useChartContext();

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      setActiveLineIndex(detail.index);
    },
  });

  return (
    <Fragment>
      {stackedValues.map((stack, stackIndex) => {
        if (activePointIndex == null) {
          return null;
        }

        const [_, y] = stack[activePointIndex];

        const id = `${tooltipId}-point-${stackIndex}`;
        const color = colors[stackIndex];

        const animatedYPostion =
          animatedCoordinates == null || animatedCoordinates[stackIndex] == null
            ? yScale(y)
            : animatedCoordinates[stackIndex].to((coord) => coord.y);

        const pointColor = isGradientType(color)
          ? `url(#${id})`
          : changeColorOpacity(color);

        return (
          <g
            key={stackIndex}
            style={getColorVisionStylesForActiveIndex({
              activeIndex: activeLineIndex,
              index: stackIndex,
              fadedOpacity: 0,
            })}
          >
            {isGradientType(color) && (
              <defs>
                <LinearGradientWithStops
                  id={id}
                  gradient={changeGradientOpacity(color)}
                  gradientUnits="userSpaceOnUse"
                  y1="100%"
                  y2="0%"
                />
              </defs>
            )}
            <Point
              color={pointColor}
              cx={getXPosition({isCrosshair: false, index: stackIndex})}
              cy={animatedYPostion}
              active
              index={stackIndex}
              tabIndex={stackIndex === 0 ? 0 : -1}
              isAnimated={shouldAnimate}
            />
          </g>
        );
      })}
      {stackedValues[0].map(([x, y], dataIndex) => {
        // These are the points used for tabbing and
        // a11y. We only render a single series otherwise
        // the tabbing would loop through each set of points
        // for each series.
        return (
          <Point
            dataType={DataType.Point}
            key={`point-${dataIndex}-${x}}`}
            color="white"
            cx={xScale(dataIndex)}
            cy={yScale(y)}
            active
            index={dataIndex}
            tabIndex={0}
            ariaLabelledby={tooltipId}
            isAnimated={false}
            ariaHidden={false}
            visuallyHidden
          />
        );
      })}
    </Fragment>
  );
}
