import React, {useRef} from 'react';
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
  drawableHeight: number;
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
  drawableHeight,
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

  const {scale} = useSpring({
    scale: 1,
    from: {scale: 0},
    delay: immediate ? 0 : (MAX_DELAY / numberOfBars) * index,
    config: config.gentle,
    immediate,
  });

  const barPath =
    rawValue === 0
      ? ''
      : `
        M${radius + xPosition} ${yPosition}
        h${width - radius * 2}
        a${radius} ${radius} 0 01${radius} ${radius}
        v${height - radius}
        H${xPosition}
        V${radius + yPosition}
        a${radius} ${radius} 0 01${radius}-${radius}
        Z
      `;

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

    gradientMarkup = lastBarTreatment ? (
      <linearGradient
        id="last-bar-gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D7DDE8" offset="0%" />
        <stop stopColor="#757F9A" offset="100%" />
      </linearGradient>
    ) : (
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

  // eslint-disable-next-line no-nested-ternary
  const barColor = lastBarTreatment
    ? 'url(#last-bar-gradient)'
    : useHardCodedGradient
    ? `url(#bar-gradient)`
    : fill;

  return (
    <React.Fragment>
      {gradientMarkup}

      <animated.path
        className={styles.Bar}
        d={barPath}
        fill={barColor}
        aria-label={ariaLabel}
        onFocus={handleFocus}
        tabIndex={tabIndex}
        role={role}
        style={{
          /* stylelint-disable */
          transform: scale.interpolate(
            (scaleY) => `scaleY(${scaleY}) ${rotation}`,
          ),
          transformOrigin: `center ${drawableHeight}px`,
          /* stylelint-enable */
        }}
      />
    </React.Fragment>
  );
}
