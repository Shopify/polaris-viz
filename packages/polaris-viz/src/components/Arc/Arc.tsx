import {Fragment, useMemo} from 'react';
import {arc} from 'd3-shape';
import {
  ARC_LOAD_ANIMATION_CONFIG,
  ARC_DATA_CHANGE_ANIMATION_CONFIG,
  getGradientFromColor,
  uniqueId,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  COLOR_VISION_SINGLE_ITEM,
  useSpringConfig,
  DataType,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';
import {useSpring, animated, to} from '@react-spring/web';

import {ConicGradientWithStops} from '..';
import {classNames} from '../../utilities';
import {ARC_PAD_ANGLE} from '../../constants';

import styles from './Arc.scss';

const ANIMATION_SIZE_BUFFER = 30;
export interface ArcProps {
  radius: number;
  height: number;
  width: number;
  startAngle: number;
  endAngle: number;
  color: Color;
  cornerRadius: number;
  thickness: number;
  animationDelay?: number;
  index?: number;
  isAnimated: boolean;
  activeIndex?: number;
}

export function Arc({
  animationDelay = 100,
  radius,
  width,
  height,
  startAngle,
  endAngle,
  color,
  cornerRadius,
  thickness,
  index = 0,
  isAnimated,
  activeIndex = 0,
}: ArcProps) {
  const gradientId = useMemo(() => uniqueId('DonutChart'), []);
  const createArc = arc().cornerRadius(cornerRadius);
  const gradient = getGradientFromColor(color);

  const springConfig = useSpringConfig({
    animationDelay: index * animationDelay,
    shouldAnimate: isAnimated,
    mountedSpringConfig: ARC_DATA_CHANGE_ANIMATION_CONFIG,
    unmountedSpringConfig: ARC_LOAD_ANIMATION_CONFIG,
  });

  const {
    animatedInnerRadius,
    animatedOuterRadius,
    animatedStartAngle,
    animatedEndAngle,
    animatedPadAngle,
  } = useSpring<{
    animatedInnerRadius: number;
    animatedOuterRadius: number;
    animatedStartAngle: number;
    animatedEndAngle: number;
    animatedPadAngle: number;
  }>({
    animatedInnerRadius: radius - thickness,
    animatedOuterRadius: radius,
    animatedStartAngle: startAngle,
    animatedEndAngle: endAngle,
    animatedPadAngle: ARC_PAD_ANGLE,
    from: {
      animatedOuterRadius: radius - thickness,
      animatedInnerRadius: radius - thickness,
    },
    ...springConfig,
  });

  return (
    <Fragment>
      <clipPath
        id={gradientId}
        transform={`translate(${width / 2 - ANIMATION_SIZE_BUFFER} ${
          height / 2 - ANIMATION_SIZE_BUFFER
        })`}
      >
        <animated.path
          className={classNames(styles.Arc)}
          d={to(
            [
              animatedInnerRadius,
              animatedOuterRadius,
              animatedStartAngle,
              animatedEndAngle,
              animatedPadAngle,
            ],
            (
              animatedInnerRadius,
              animatedOuterRadius,
              animatedStartAngle,
              animatedEndAngle,
              animatedPadAngle,
            ) => {
              return createArc({
                innerRadius: animatedInnerRadius,
                outerRadius: animatedOuterRadius,
                startAngle: animatedStartAngle,
                endAngle: animatedEndAngle,
                padAngle: animatedPadAngle,
              });
            },
          )}
        />
      </clipPath>
      <g
        style={{
          ...getColorVisionStylesForActiveIndex({
            activeIndex,
            index,
          }),
        }}
        className={classNames(styles.Arc)}
        {...getColorVisionEventAttrs({
          type: COLOR_VISION_SINGLE_ITEM,
          index,
        })}
        clipPath={`url(#${gradientId})`}
        data-type={DataType.Arc}
        data-index={index}
        aria-hidden={false}
        data-start-angle={startAngle}
        data-end-angle={endAngle}
      >
        <ConicGradientWithStops
          x={width / -2 - ANIMATION_SIZE_BUFFER}
          y={height / -2 - ANIMATION_SIZE_BUFFER}
          height={radius * 4}
          width={radius * 4}
          gradient={gradient}
        />
      </g>
    </Fragment>
  );
}
