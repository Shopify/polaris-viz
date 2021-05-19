import React, {useMemo} from 'react';
import {animated, OpaqueInterpolation} from 'react-spring';
import {ScaleLinear} from 'd3-scale';

import {ROUNDED_BAR_RADIUS} from '../../constants';

import styles from './Bar.scss';

interface Props {
  color: string;
  x: number;
  yScale: ScaleLinear<number, number>;
  rawValue: number;
  width: number;
  index: number;
  onFocus: ({index, cx, cy}: {index: number; cx: number; cy: number}) => void;
  ariaLabel?: string;
  tabIndex: number;
  role?: string;
  hasRoundedCorners?: boolean;
  height?: OpaqueInterpolation<any> | number;
  rotateZeroBars: boolean;
}

export function Bar({
  color,
  x,
  rawValue,
  yScale,
  width,
  onFocus,
  index,
  ariaLabel,
  tabIndex,
  role,
  height,
  hasRoundedCorners,
  rotateZeroBars,
}: Props) {
  const zeroScale = yScale(0);
  const treatAsNegative = rawValue < 0 || (rawValue === 0 && rotateZeroBars);
  const rotation = treatAsNegative ? 'rotate(180deg)' : 'rotate(0deg)';
  const xPosition = treatAsNegative ? x + width : x;
  const heightIsNumber = typeof height === 'number';
  const radius = hasRoundedCorners ? ROUNDED_BAR_RADIUS : 0;

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition = (value: number) =>
      treatAsNegative ? zeroScale + value : zeroScale - value;

    if (heightIsNumber) {
      return getYPosition(height);
    }
    return height.interpolate(getYPosition);
  }, [height, heightIsNumber, treatAsNegative, zeroScale]);

  const yPositionIsNumber = typeof yPosition === 'number';

  const handleFocus = () => {
    if (yPosition == null) return;

    const cy = yPositionIsNumber ? yPosition : yPosition.getValue();
    onFocus({index, cx: x, cy});
  };

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
      const radiusOffset = Math.max(0, radius - heightValue);

      return `M${radius} 0
        h${width - radius * 2}
        a${radius} ${radius} 0 0 1 ${radius} ${radius - radiusOffset}
        v${radiusOffset > 0 ? 0 : heightValue - radius}
        H0
        V${radius - radiusOffset}
        a${radius} ${radius} 0 0 1 ${radius} -${radius - radiusOffset}
        Z`;
    };

    if (heightIsNumber) {
      return calculatePath(height);
    }
    return height.interpolate(calculatePath);
  }, [height, heightIsNumber, radius, width]);

  return (
    <animated.path
      d={path}
      fill={color}
      aria-label={ariaLabel}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      role={role}
      style={style}
      className={styles.Bar}
    />
  );
}
