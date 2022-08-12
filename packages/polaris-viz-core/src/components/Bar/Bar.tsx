import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {SpringValue} from '@react-spring/core';

import {getRoundedRectPath} from '../../utilities/getRoundedRectPath';
import {usePolarisVizContext} from '../../hooks';

// height can't be any, but to avoid importing SpringValue
// from the web and native packages, we use it to broaden the type
type Height = SpringValue<number> | number | any;

export interface Props {
  fill: string;
  value: number | null;
  width: number;
  x: number;
  yScale: ScaleLinear<number, number>;
  borderRadius?: number;
  height?: Height;
}

export function Bar({
  borderRadius = 0,
  fill,
  height,
  value,
  width,
  x,
  yScale,
}: Props) {
  const {
    components: {Path},
    animated,
  } = usePolarisVizContext();

  const AnimatedPath = animated(Path);

  const zeroScale = yScale(0);
  const isNegative = value != null && value < 0;
  const rotation = isNegative ? 180 : 0;
  const xPosition = isNegative ? x + width : x;

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition = (value: number) =>
      isNegative ? zeroScale + value : zeroScale - value;

    if (typeof height === 'number') {
      return getYPosition(height);
    }
    return height.to(getYPosition);
  }, [height, isNegative, zeroScale]);

  const style = useMemo(() => {
    if (yPosition == null) return;

    const getStyle = (y: number) =>
      `translate(${xPosition} ${y}), rotate(${rotation})`;

    if (typeof yPosition === 'number') return getStyle(yPosition);

    return yPosition.to(getStyle);
  }, [yPosition, xPosition, rotation]);

  const path = useMemo(() => {
    if (height == null) return;

    const calculatePath = (heightValue: number) => {
      if (heightValue === 0) {
        return '';
      }

      return getRoundedRectPath({
        height: heightValue,
        width,
        borderRadius: `${borderRadius} ${borderRadius} 0 0`,
      });
    };

    if (typeof height === 'number') {
      return calculatePath(height);
    }
    return height.to(calculatePath);
  }, [borderRadius, height, width]);

  if (value == null || width < 0) {
    return null;
  }

  return <AnimatedPath d={path} transform={style} fill={fill} />;
}
