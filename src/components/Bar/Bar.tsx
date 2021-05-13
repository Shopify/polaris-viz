import React, {useMemo} from 'react';
import {animated, SpringValue} from '@react-spring/web';
import {ScaleLinear} from 'd3-scale';

import {ROUNDED_BAR_RADIUS} from '../../constants';
import {isNumber} from '../../utilities';
import {PathInterpolator, NumberInterpolator} from '../../types';

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
}: Props) {
  const radius = hasRoundedCorners ? ROUNDED_BAR_RADIUS : 0;
  const zeroScale = yScale(0);
  const isNegative = rawValue < 0;
  const rotation = isNegative ? 'rotate(180deg)' : 'rotate(0deg)';
  const xPosition = isNegative ? x + width : x;

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition: NumberInterpolator = (value: number) =>
      isNegative ? zeroScale + value : zeroScale - value;

    if (isNumber(height)) {
      return getYPosition(height);
    }
    return height.to(getYPosition);
  }, [height, isNegative, zeroScale]);

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

    const calculatePath: PathInterpolator = (heightValue: number) =>
      rawValue === 0
        ? ''
        : `M${radius} 0
        h${width - radius * 2}
        a${radius} ${radius} 0 01${radius} ${radius}
        v${heightValue - radius}
        H0
        V${radius}
        a${radius} ${radius} 0 01${radius}-${radius}
        Z`;

    if (isNumber(height)) {
      return calculatePath(height);
    }
    return height.to(calculatePath);
  }, [height, radius, rawValue, width]);

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
