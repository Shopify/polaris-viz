import React, {useMemo} from 'react';
import {animated, SpringValue} from '@react-spring/web';
import type {ScaleLinear} from 'd3-scale';

import {ROUNDED_BAR_RADIUS} from '../../constants';
import {isNumber} from '../../utilities';
import type {PathInterpolator, NumberInterpolator} from '../../types';

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
  height?: SpringValue | number;
  rotateZeroBars: boolean;
}

export const Bar = React.memo(function Bar({
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
  const radius = hasRoundedCorners
    ? Math.min(ROUNDED_BAR_RADIUS, width / 2)
    : 0;

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition: NumberInterpolator = (value: number) =>
      treatAsNegative ? zeroScale + value : zeroScale - value;

    if (isNumber(height)) {
      return getYPosition(height);
    }
    return height.to(getYPosition);
  }, [height, treatAsNegative, zeroScale]);

  const handleFocus = () => {
    if (yPosition == null) return;

    const cy = isNumber(yPosition) ? yPosition : yPosition.get();
    onFocus({index, cx: x, cy});
  };

  const style = useMemo(() => {
    if (yPosition == null) return;

    const getStyle = (y: number) =>
      `translate(${xPosition}px, ${y}px) ${rotation}`;

    if (isNumber(yPosition)) return {transform: getStyle(yPosition)};

    return {
      transform: yPosition.to(getStyle),
    };
  }, [yPosition, xPosition, rotation]);

  const path = useMemo(() => {
    if (height == null) return;

    const calculatePath: PathInterpolator = (heightValue: number) => {
      const radiusOffset = Math.max(0, radius - heightValue);

      return heightValue === 0
        ? ''
        : `M${radius} 0
        h${width - radius * 2}
        a${radius} ${radius} 0 0 1 ${radius} ${radius - radiusOffset}
        v${radiusOffset > 0 ? 0 : heightValue - radius}
        H0
        V${radius - radiusOffset}
        a${radius} ${radius} 0 0 1 ${radius} -${radius - radiusOffset}
        Z`;
    };

    if (isNumber(height)) {
      return calculatePath(height);
    }
    return height.to(calculatePath);
  }, [height, radius, width]);

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
});
