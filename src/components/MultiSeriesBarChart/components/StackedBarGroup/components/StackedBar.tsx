import React from 'react';
import {classNames} from '@shopify/css-utilities';
import {useSpring, animated, config} from 'react-spring';

import styles from '../../../shared.scss';

interface Props {
  x: number;
  y: number;
  height: number;
  fillColor: string;
  ariaLabel: string;
  nonUniqueHighlightColor: boolean;
  barWidth: number;
  groupIndex: number;
  isAnimated: boolean;
  start: number;
  end: number;
  barIndex: number;
  ariaEnabledBar: boolean;
  seriesLength: number;
  hasRoundedCorners: boolean;
  handleFocus: () => void;
}

export function StackedBar({
  x,
  y,
  height,
  fillColor,
  ariaLabel,
  barWidth,
  nonUniqueHighlightColor,
  isAnimated,
  groupIndex,
  barIndex,
  ariaEnabledBar,
  handleFocus,
  start,
  end,
  seriesLength,
}: Props) {
  const {height: interpolatedHeight} = useSpring({
    height,
    from: {
      height: 0,
    },
    delay: 300 - groupIndex * 300,
    config: config.gentle,
  });

  const radius = groupIndex === seriesLength - 1 ? 4 : 0;

  const isNegative = end + start < 0;
  const yPosition = isNegative ? y + height : y;
  const rotation = isNegative ? 'rotate(180deg)' : 'rotate(0deg)';
  const xPosition = isNegative ? x + barWidth : x;
  const immediate = !isAnimated;

  const barPath =
    height === 0
      ? ''
      : interpolatedHeight.interpolate((height) => {
          return `M${radius} 0h${barWidth -
            radius *
              2} a${radius} ${radius} 0 01${radius} ${radius} v${(height as number) -
            radius} H0 V${radius} a${radius} ${radius} 0 01${radius}-${radius} z`;
        });

  return (
    <animated.path
      role={groupIndex === 0 ? 'listitem' : undefined}
      aria-hidden={!ariaEnabledBar}
      key={barIndex}
      className={classNames(
        styles.Bar,
        nonUniqueHighlightColor && styles.StackNoOutline,
      )}
      d={barPath}
      width={barWidth}
      fill={fillColor}
      tabIndex={ariaEnabledBar ? 0 : -1}
      onFocus={handleFocus}
      aria-label={ariaEnabledBar ? ariaLabel : undefined}
      style={{
        transform: `translate(${xPosition}px, ${yPosition}px) ${rotation}`,
      }}
    />
  );
}
