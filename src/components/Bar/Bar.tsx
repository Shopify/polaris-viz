import React, {useMemo} from 'react';
import {animated, OpaqueInterpolation} from 'react-spring';
import {Color} from 'types';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../utilities';
import {ROUNDED_BAR_RADIUS} from '../../constants';

import styles from './Bar.scss';

interface Props {
  color: Color;
  highlightColor: Color;
  isSelected: boolean;
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
  height: OpaqueInterpolation<any> | number | undefined;
}

export function Bar({
  color,
  highlightColor,
  isSelected,
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
  const currentColor = isSelected
    ? getColorValue(highlightColor)
    : getColorValue(color);

  const yPosition = useMemo(() => {
    if (height == null) return;

    const getYPosition = (value: number) =>
      isNegative ? zeroScale + value : zeroScale - value;

    if (typeof height === 'number') {
      return getYPosition(height);
    }
    return height.interpolate(getYPosition);
  }, [height, isNegative, zeroScale]);

  const handleFocus = () => {
    if (yPosition == null) return;

    const cy = typeof yPosition === 'number' ? yPosition : yPosition.getValue();
    onFocus({index, cx: x, cy});
  };

  const style = useMemo(() => {
    if (yPosition == null) return;

    const getStyle = (y: number) =>
      `translate(${xPosition}px, ${y}px) ${rotation}`;

    if (typeof yPosition === 'number') return {transform: getStyle(yPosition)};

    return {
      transform: yPosition.interpolate(getStyle),
    };
  }, [yPosition, xPosition, rotation]);

  const path = useMemo(() => {
    if (height == null) return;

    const calculatePath = (heightValue: number) =>
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

    if (typeof height === 'number') {
      return calculatePath(height);
    }
    return height.interpolate(calculatePath);
  }, [height, radius, rawValue, width]);

  return (
    <animated.path
      d={path}
      fill={currentColor}
      aria-label={ariaLabel}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      role={role}
      style={style}
      className={styles.BarNoOutline}
    />
  );
}
