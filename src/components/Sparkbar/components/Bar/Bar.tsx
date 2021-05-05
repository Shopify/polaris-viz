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

  const radius = width * 0.75;

  const path = useMemo(() => {
    if (height == null) return;

    const calculatePath = (heightValue: number) => {
      if (heightValue === 0) {
        return '';
      }

      return `M 0 0 C 0 -${radius} ${width} -${radius} ${width} 0 L ${width} ${heightValue} L 0 ${heightValue} Z`;
    };

    if (heightIsNumber) {
      return calculatePath(height);
    }
    return height.interpolate(calculatePath);
  }, [height, heightIsNumber, radius, width]);

  return <animated.path d={path} style={style} />;
}
