import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {animated, OpaqueInterpolation} from 'react-spring';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  rawValue: number;
  width: number;
  height?: OpaqueInterpolation<any> | number;
}

export function Bar({x, rawValue, yScale, width, height}: Props) {
  const zeroScale = yScale(0);
  const isNegative = rawValue < 0;
  const rotation = isNegative ? 'rotate(180deg)' : 'rotate(0deg)';
  const xPosition = isNegative ? x + width : x;

  const heightIsNumber = typeof height === 'number';

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition = (value: number) =>
      isNegative ? zeroScale + value : zeroScale - value;

    if (heightIsNumber) {
      return getYPosition(height);
    }
    return height.interpolate(getYPosition);
  }, [height, heightIsNumber, isNegative, zeroScale]);

  const yPositionIsNumber = typeof yPosition === 'number';

  const style = useMemo(() => {
    if (yPosition == null) return;

    const getStyle = (y: number) =>
      `translate(${xPosition}px, ${y}px) ${rotation}`;

    if (yPositionIsNumber) return {transform: getStyle(yPosition)};

    return {
      transform: yPosition.interpolate(getStyle),
    };
  }, [yPosition, yPositionIsNumber, xPosition, rotation]);

  const path = useMemo(() => {
    if (height == null) return;

    const calculatePath = (heightValue: number) => {
      if (heightValue === 0) {
        return '';
      }

      const arcRadius = width / 2;
      const isArcHeightHigher = heightValue < arcRadius;

      const arcWidth = isArcHeightHigher
        ? (heightValue / arcRadius) * width
        : width;

      const barStartY = isArcHeightHigher ? arcWidth / 2 : arcRadius;

      const move = `M ${(width - arcWidth) / 2} ${barStartY}`;

      const arcX = (width - arcWidth) / 2 + arcWidth;
      const arc = `A ${arcRadius} ${arcRadius} 0 0 1 ${arcX} ${barStartY}`;

      const line =
        heightValue > arcRadius
          ? `L ${width} ${heightValue} L 0 ${heightValue}`
          : '';

      return `${move} ${arc} M ${width} ${barStartY} ${line} L 0 ${barStartY} Z`;
    };

    if (heightIsNumber) {
      return calculatePath(height);
    }
    return height.interpolate(calculatePath);
  }, [height, heightIsNumber, width]);

  return <animated.path d={path} style={style} />;
}
