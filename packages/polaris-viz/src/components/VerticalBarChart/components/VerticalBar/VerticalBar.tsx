import React, {useMemo} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  DataType,
  getRoundedRectPath,
  useTheme,
} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../../hooks/useBarSpringConfig';
import {ZeroValueLine} from '../../../shared/ZeroValueLine';

import styles from './VerticalBar.scss';

export interface VerticalBarProps {
  color: string;
  height: number;
  index: number;
  rawValue: number;
  width: number;
  x: number;
  zeroPosition: number;
  animationDelay?: number;
  ariaLabel?: string;
  role?: string;
  areAllNegative?: boolean;
}

export const VerticalBar = React.memo(function Bar({
  animationDelay = 0,
  ariaLabel,
  color,
  height,
  index,
  rawValue,
  role,
  width,
  x,
  zeroPosition,
  areAllNegative,
}: VerticalBarProps) {
  const selectedTheme = useTheme();
  const borderRadius = selectedTheme.bar.borderRadius;
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
    borderRadius: `${borderRadius} ${borderRadius} 0 0`,
    height,
    width,
  });

  const springConfig = useBarSpringConfig({animationDelay});

  const {transform} = useSpring({
    from: {transform: 'scaleY(0) translateZ(0)'},
    to: {transform: 'scaleY(1) translateZ(0)'},
    ...springConfig,
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
