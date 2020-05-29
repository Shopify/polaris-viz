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

// The space between the cursor and the tooltip
const TOOLTIP_MARGIN = 10;

export function Tooltip({
  activePointIndex,
  currentX,
  currentY,
  formatYAxisValue,
  series,
  chartDimensions,
}: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState<DOMRect | null>(
    null,
  );
  const firstRender = useRef(true);

  const spring: any = useSpring({
    from: {
      translate: [0, 0, 0],
      opacity: 0,
    },
    to: async (next: any) => {
      if (tooltipDimensions == null) {
        return;
      }

      const chartLeftBound = Margin.Left;
      const chartRightBound = chartDimensions.width - Margin.Right;

      const naturalLeftBound =
        currentX - tooltipDimensions.width - TOOLTIP_MARGIN;
      const hasSpaceToLeft = naturalLeftBound > chartLeftBound;

      const naturalRightBound =
        currentX + tooltipDimensions.width + TOOLTIP_MARGIN;
      const hasSpaceToRight = naturalRightBound < chartRightBound;

      let xTranslation = 0;

      if (hasSpaceToLeft) {
        xTranslation = naturalLeftBound;
      } else if (hasSpaceToRight) {
        xTranslation = currentX + TOOLTIP_MARGIN;
      } else {
        const centeredLeftBound = currentX - tooltipDimensions.width / 2;
        const centeredRightBound = currentX + tooltipDimensions.width / 2;

        if (centeredRightBound > chartRightBound) {
          xTranslation = chartRightBound - tooltipDimensions.width;
        } else if (centeredLeftBound < chartLeftBound) {
          xTranslation = chartLeftBound;
        } else {
          xTranslation = centeredLeftBound;
        }
      }

      const shouldRenderImmediate = firstRender.current;
      firstRender.current = false;

      // react-spring docs do not return the `next` callback
      // eslint-disable-next-line callback-return
      await next({
        translate: [
          xTranslation,
          Math.max(
            Margin.Top,
            currentY - tooltipDimensions.height - TOOLTIP_MARGIN,
          ),
          0,
        ],
        opacity: 1,
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
        top: 0,
        left: 0,
        opacity: spring.opacity,
        transform: spring.translate.interpolate(
          // eslint-disable-next-line id-length
          (x: number, y: number, z: number) =>
            `translate3d(${x}px, ${y}px, ${z}px)`,
        ),
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
