import React, {useMemo} from 'react';
import {arc} from 'd3-shape';
import {
  ARC_LOAD_ANIMATION_CONFIG,
  ARC_DATA_CHANGE_ANIMATION_CONFIG,
  isGradientType,
  uniqueId,
  useComponentDidMount,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  COLOR_VISION_SINGLE_ITEM,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';
import {useSpring, animated, to} from '@react-spring/web';

import {ConicGradientWithStops} from '../../../';
import {classNames} from '../../../../utilities';
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
  index?: number;
  isAnimated: boolean;
  activeIndex?: number;
}

export function Arc({
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
  const gradient = isGradientType(color)
    ? color
    : [
        {color, offset: 0},
        {color, offset: 1},
      ];

  const mounted = useComponentDidMount();
  const getDelay = () => {
    if (isAnimated) {
      return mounted ? 0 : index * 100;
    }
    return 0;
  };

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
    },
    config: mounted
      ? ARC_DATA_CHANGE_ANIMATION_CONFIG
      : ARC_LOAD_ANIMATION_CONFIG,
    delay: getDelay(),
    default: {
      immediate: !isAnimated,
    },
  });

  return (
    <React.Fragment>
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
        {...getColorVisionEventAttrs({
          type: COLOR_VISION_SINGLE_ITEM,
          index,
        })}
        clipPath={`url(#${gradientId})`}
      >
        <ConicGradientWithStops
          x={width / -2 - ANIMATION_SIZE_BUFFER}
          y={height / -2 - ANIMATION_SIZE_BUFFER}
          height={radius * 4}
          width={radius * 4}
          gradient={gradient}
        />
      </g>
    </React.Fragment>
  );
}
