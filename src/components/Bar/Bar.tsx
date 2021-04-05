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
          return `
            M${radius} 0
            h${width - radius * 2}
            a${radius} ${radius} 0 01${radius} ${radius}
            v${(height as number) - radius}
            H0
            V${radius}
            a${radius} ${radius} 0 01${radius}-${radius}
            z
          `;
        });

  const isGradientBar = isGradientType(color) || isGradientType(highlightColor);

  let fill = `url(#${gradientColorId.current})`;
  let gradientMarkup = null;

  const chartId = Math.floor(Math.random() * 10000);

  if (isGradientBar) {
    const gradientStartColor = isSelected
      ? getGradientStops(highlightColor, GradientPosition.Start)
      : getGradientStops(color, GradientPosition.Start);

    const gradientEndColor = isSelected
      ? getGradientStops(highlightColor, GradientPosition.End)
      : getGradientStops(color, GradientPosition.End);

    gradientMarkup = useHardCodedGradient ? (
      <linearGradient
        id={`bar-gradient-${chartId}-${index}`}
        x1="0"
        y1="0"
        x2="0"
        y2="221"
        gradientUnits="userSpaceOnUse"
        gradientTransform={`translate(0,-${yPosition})`}
      >
        <stop stopColor="#4BFCE0" offset="21%" />
        <stop stopColor="#4EADFB" offset="62%" />
        <stop stopColor="#801AFD" offset="109%" />
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
    ? 'url(#bar-gradient)'
    : useHardCodedGradient
    ? `url(#bar-gradient-${chartId}-${index})`
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
          transform: animatedYPosition.interpolate(
            (y) => `translate(${xPosition}px, ${y}px) ${rotation}`,
          ),
          /* stylelint-enable */
        }}
      />
    </React.Fragment>
  );
}
