import React, {useEffect, useRef, useState} from 'react';
import {useSpring, animated} from 'react-spring';

import {Margin} from '../../constants';
import {Series} from '../../types';
import {LinePreview} from '../LinePreview';

import styles from './Tooltip.scss';

interface Props {
  activePointIndex: number;
  currentX: number;
  currentY: number;
  formatYAxisValue(value: number): string;
  series: Series[];
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  series,
}: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState(new DOMRect());

  const leftOfCursorPosition = currentX - tooltipDimensions.width - 20;
  const rightOfCursorPosition = currentX + 10;

  const spring = useSpring({
    config: {
      duration: 0,
    },
    top: Math.max(Margin.Top, currentY - tooltipDimensions.height - 10),
    left:
      leftOfCursorPosition < Margin.Left
        ? rightOfCursorPosition
        : leftOfCursorPosition,
  });

  useEffect(() => {
    if (tooltipRef.current == null) {
      return;
    }

    setTooltipDimensions(tooltipRef.current.getBoundingClientRect());
  }, [activePointIndex]);

  return (
    <animated.div
      className={styles.Container}
      style={{
        top: spring.top,
        left: spring.left,
      }}
      ref={tooltipRef}
    >
      {series.map(({name, data, formatY, style = {}}) => {
        const point = data[activePointIndex];

        if (point == null) {
          return null;
        }

        const {color = 'colorPurple', lineStyle = 'solid'} = style;
        const formattedYValue =
          formatY == null ? formatYAxisValue(point.y) : formatY(point.y);

        return (
          <React.Fragment key={name}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.SeriesName}>{name}</p>
            <p className={styles.Value}>{formattedYValue}</p>
          </React.Fragment>
        );
      })}
    </animated.div>
  );
}
