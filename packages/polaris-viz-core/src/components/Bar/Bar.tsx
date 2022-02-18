import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {SpringValue} from '@react-spring/core';

import {usePolarisVizContext} from '../../hooks';

// height can't be any, but to avoid importing SpringValue
// from the web and native packages, we use it to broaden the type
type Height = SpringValue<number> | number | any;

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  value: number | null;
  width: number;
  height?: Height;
  fill: string;
  hasRoundedCorners: boolean;
}

export function Bar({
  x,
  value,
  yScale,
  width,
  height,
  fill,
  hasRoundedCorners,
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

      const arcRadius = hasRoundedCorners ? width / 2 : 0;
      const arcHigherThanHeight = heightValue < arcRadius;
      const arcWidth = arcHigherThanHeight
        ? (heightValue / arcRadius) * width
        : width;
      const barStartY = arcHigherThanHeight ? arcWidth / 2 : arcRadius;
      const arcX = (width - arcWidth) / 2 + arcWidth;

      const moveToStart = `M ${(width - arcWidth) / 2} ${barStartY} `;

      const arc = `A ${arcRadius} ${arcRadius} 0 0 1 ${arcX} ${barStartY} `;

      const moveToEndOfArc = `M ${width} ${barStartY} `;

      const lineRightTopToBottom = !arcHigherThanHeight
        ? `L ${width} ${heightValue} `
        : '';

      const lineBottomRightToLeft = !arcHigherThanHeight
        ? `L 0 ${heightValue} `
        : '';

      const lineLeftFromBottomToStart = `L 0 ${barStartY}`;

      return `${moveToStart}${arc}${moveToEndOfArc}${lineRightTopToBottom}${lineBottomRightToLeft}${lineLeftFromBottomToStart}`;
    };

    if (typeof height === 'number') {
      return calculatePath(height);
    }
    return height.to(calculatePath);
  }, [height, width, hasRoundedCorners]);

  if (value == null || width < 0) {
    return null;
  }

  return <AnimatedPath d={path} transform={style} fill={fill} />;
}
