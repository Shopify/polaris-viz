import {memo, Fragment, useCallback, useMemo} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  DataType,
  getRoundedRectPath,
  useTheme,
  usePrevious,
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

export const VerticalBar = memo(function Bar({
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
  const treatAsNegative = rawValue < 0;
  const zeroValue = rawValue === 0;

  const yPosition = useMemo(() => {
    return treatAsNegative ? zeroPosition + height : zeroPosition - height;
  }, [height, treatAsNegative, zeroPosition]);

  const style = useMemo(() => {
    if (yPosition == null) return;

    return {
      transform: `translateX(${treatAsNegative ? x + width : x}px)`,
    };
  }, [yPosition, treatAsNegative, x, width]);

  const getPath = useCallback(
    (height = 0, width = 0) => {
      return getRoundedRectPath({
        height,
        width,
        borderRadius: `${borderRadius} ${borderRadius} 0 0`,
      });
    },
    [borderRadius],
  );

  const springConfig = useBarSpringConfig({animationDelay});
  const rotate = `${treatAsNegative ? 'rotate(180)' : 'rotate(0)'}`;

  const prevValue = usePrevious(rawValue);
  const signIsChanging =
    prevValue == null ? false : Math.sign(prevValue) !== Math.sign(rawValue);

  const {pathD, transform} = useSpring({
    from: {
      pathD: getPath(1, width),
      transform: `translate(0 ${zeroPosition}) ${rotate}`,
    },
    to: signIsChanging
      ? [
          {
            pathD: getPath(0, width),
            transform: `translate(0 ${zeroPosition}) ${rotate}`,
            immediate: true,
          },
          {
            pathD: getPath(height, width),
            transform: `translate(0 ${yPosition}) ${rotate}`,
          },
        ]
      : {
          pathD: getPath(height, width),
          transform: `translate(0 ${yPosition}) ${rotate}`,
        },
    ...springConfig,
  });

  return (
    <Fragment>
      {!zeroValue ? (
        <g aria-hidden="true" style={style}>
          <animated.path
            data-id={`bar-${index}`}
            data-index={index}
            data-type={DataType.Bar}
            d={pathD}
            fill={color}
            aria-label={ariaLabel}
            role={role}
            className={styles.Bar}
            aria-hidden="true"
            transform={transform}
          />
        </g>
      ) : (
        <ZeroValueLine
          x={x + width / 2}
          y={yPosition}
          direction="vertical"
          areAllNegative={areAllNegative}
        />
      )}
    </Fragment>
  );
});
