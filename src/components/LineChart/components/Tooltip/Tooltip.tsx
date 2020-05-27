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
  chartDimensions: DOMRect;
}

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  series,
}: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState<DOMRect | null>(
    null,
  );
  const firstRender = useRef(true);

  const spring = useSpring({
    from: {
      left: 0,
      top: 0,
    },
    to: async (next) => {
      if (tooltipDimensions == null) {
        return;
      }

      const leftOfCursorPosition = currentX - tooltipDimensions.width - 20;
      const rightOfCursorPosition = currentX + 10;

      const shouldRenderImmediate = firstRender.current;
      firstRender.current = false;

      await next({
        top: Math.max(Margin.Top, currentY - tooltipDimensions.height - 10),
        left:
          leftOfCursorPosition < Margin.Left
            ? rightOfCursorPosition
            : leftOfCursorPosition,
        immediate: shouldRenderImmediate,
      });
    },
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
