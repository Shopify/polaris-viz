import React, {useMemo} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  DataType,
  getRoundedRectPath,
  useTheme,
} from '@shopify/polaris-viz-core';

import {ZeroValueLine} from '../../../shared/ZeroValueLine';
import {BARS_TRANSITION_CONFIG} from '../../../../constants';

import styles from './Bar.scss';

interface Props {
  color: string;
  height: number;
  index: number;
  rawValue: number;
  width: number;
  x: number;
  zeroPosition: number;
  animationDelay?: number;
  ariaLabel?: string;
  isAnimated?: boolean;
  role?: string;
  areAllNegative?: boolean;
}

export const Bar = React.memo(function Bar({
  animationDelay = 0,
  ariaLabel,
  color,
  height,
  index,
  isAnimated = true,
  rawValue,
  role,
  width,
  x,
  zeroPosition,
  areAllNegative,
}: Props) {
  const selectedTheme = useTheme();
  const selectedBorderRadius = selectedTheme.bar.borderRadius;
  const treatAsNegative = rawValue < 0 || rawValue === 0;
  const zeroValue = rawValue === 0;

  const yPosition = useMemo(() => {
    return treatAsNegative ? zeroPosition + height : zeroPosition - height;
  }, [height, treatAsNegative, zeroPosition]);

  const style = useMemo(() => {
    if (yPosition == null) return;

    const translate = `translate(${
      treatAsNegative ? x + width : x
    }px, ${yPosition}px)`;

    const rotate = `rotate(${treatAsNegative ? 180 : 0}deg)`;

    return {
      transform: ` ${translate} ${rotate}`,
    };
  }, [yPosition, treatAsNegative, x, width]);

  const path = getRoundedRectPath({
    borderRadius: `${selectedBorderRadius} ${selectedBorderRadius} 0 0`,
    height,
    width,
  });

  const {transform} = useSpring({
    from: {transform: 'scaleY(0) translateZ(0)'},
    to: {transform: 'scaleY(1) translateZ(0)'},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g
      style={{
        transform,
        transformOrigin: `0px ${zeroPosition}px`,
      }}
      aria-hidden="true"
    >
      {!zeroValue ? (
        <path
          data-id={`bar-${index}`}
          data-index={index}
          data-type={DataType.Bar}
          d={path}
          fill={color}
          aria-label={ariaLabel}
          role={role}
          style={style}
          className={styles.Bar}
          aria-hidden="true"
        />
      ) : (
        <ZeroValueLine
          x={x + width / 2}
          y={yPosition}
          direction="vertical"
          areAllNegative={areAllNegative}
        />
      )}
    </animated.g>
  );
});
