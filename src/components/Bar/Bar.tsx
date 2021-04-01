import React, {useRef, useState} from 'react';
import {ScaleLinear} from 'd3-scale';
import {animated, useSpring, config} from 'react-spring';
import tokens from '@shopify/polaris-tokens';

import {GradientColor, Color} from '../../types';
import {LinearGradient} from '../LinearGradient';
import {
  uniqueId,
  getGradientStops,
  GradientPosition,
  isGradientType,
  getColorValue,
} from '../../utilities';
import {ROUNDED_BAR_RADIUS, MIN_BAR_HEIGHT} from '../../constants';

import styles from './Bar.scss';

const MAX_DELAY = tokens.durationSlow;

interface Props {
  color: Color | GradientColor;
  highlightColor: Color | GradientColor;
  isSelected: boolean;
  x: number;
  yScale: ScaleLinear<number, number>;
  rawValue: number;
  width: number;
  index: number;
  onFocus: ({index, cx, cy}: {index: number; cx: number; cy: number}) => void;
  numberOfBars: number;
  isAnimated: boolean;
  ariaLabel?: string;
  tabIndex: number;
  role?: string;
  hasRoundedCorners?: boolean;
  startingValue?: number;
  lastBarTreatment?: boolean;
  useHardCodedGradient?: boolean;
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
  hasRoundedCorners,
  startingValue = 0,
  lastBarTreatment,
  useHardCodedGradient,
  numberOfBars,
  isAnimated,
}: Props) {
  const gradientColorId = useRef(uniqueId('gradient'));
  const rawHeight = Math.abs(yScale(rawValue) - yScale(0));

  const startingScale = yScale(startingValue);
  const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
  const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
  const radius = hasRoundedCorners ? ROUNDED_BAR_RADIUS : 0;

  const handleFocus = () => {
    onFocus({index, cx: x, cy: yPosition});
  };

  const isNegative = rawValue < 0;
  const yPosition = isNegative
    ? startingScale + height
    : startingScale - height;
  const rotation = isNegative ? 'rotate(180deg)' : 'rotate(0deg)';
  const xPosition = isNegative ? x + width : x;
  const immediate = !isAnimated;

  const {height: animatedHeight, yPosition: animatedYPosition} = useSpring({
    height,
    yPosition,
    from: {height: 0, yPosition: startingScale},
    delay: immediate ? 0 : (MAX_DELAY / numberOfBars) * index,
    config: config.gentle,
    immediate,
  });

  const barPath =
    rawValue === 0
      ? ''
      : animatedHeight.interpolate((height) => {
          return `M${radius} 0h${width -
            radius *
              2} a${radius} ${radius} 0 01${radius} ${radius} v${(height as number) -
            radius} H0 V${radius} a${radius} ${radius} 0 01${radius}-${radius} z`;
        });

  const isGradientBar = isGradientType(color) || isGradientType(highlightColor);

  let fill = `url(#${gradientColorId.current})`;
  let gradientMarkup = null;

  if (isGradientBar) {
    const gradientStartColor = isSelected
      ? getGradientStops(highlightColor, GradientPosition.Start)
      : getGradientStops(color, GradientPosition.Start);

    const gradientEndColor = isSelected
      ? getGradientStops(highlightColor, GradientPosition.End)
      : getGradientStops(color, GradientPosition.End);

    gradientMarkup = (
      <LinearGradient
        id={gradientColorId.current}
        startColor={gradientStartColor}
        endColor={gradientEndColor}
        transition="ease 0.3s"
      />
    );
  } else {
    const currentColor = isSelected
      ? getColorValue(highlightColor)
      : getColorValue(color);

    fill = currentColor;
  }

  const barColor = lastBarTreatment
    ? 'url(#bar-gradient)'
    : useHardCodedGradient
    ? 'url(#bar-gradient2)'
    : fill;

  return (
    <React.Fragment>
      {gradientMarkup}

      <path
        className={styles.Bar}
        d={barPath}
        fill={barColor}
        aria-label={ariaLabel}
        onFocus={handleFocus}
        tabIndex={tabIndex}
        role={role}
        style={{
          /* stylelint-disable */
          transform: animatedYPosition.interpolate(
            (y) => `translate(${xPosition}px, ${y}px) ${rotation}`,
          ),
          /* stylelint-enable */
        }}
      />
    </React.Fragment>
  );
}
