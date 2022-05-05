import React, {useRef, useEffect} from 'react';
import type {Dimensions} from '@shopify/polaris-viz-core';
import {
  useTheme,
  changeColorOpacity,
  paddingStringToObject,
  FONT_SIZE,
} from '@shopify/polaris-viz-core';
import {useSprings, animated} from '@react-spring/web';

import {useLabels} from '../Labels/hooks';
import {TextLine} from '../Labels/components/TextLine';

import styles from './ChartSkeleton.scss';

type SkeletonState = 'loading' | 'error';

export interface ChartSkeletonProps {
  theme?: string;
  dimensions: Dimensions;
  state: SkeletonState;
}

export function ChartSkeleton({
  dimensions,
  theme = 'Default',
  state = 'error',
  errorText = 'Could not load the chart',
}) {
  const {width, height} = dimensions;

  if (width === 0) return null;

  const numberOfTicks = 5;
  const {
    chartContainer: {backgroundColor, padding},
    grid: {color: gridColor},
  } = useTheme(theme);

  const {paddingLeft, paddingBottom, paddingTop} =
    paddingStringToObject(padding);

  const semiTransparentBackground = changeColorOpacity(backgroundColor, 0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.style.setProperty('--shimmerSize', `${width}px`);
  }, [width]);

  const drawableHeight = height - paddingBottom - paddingTop;
  const tickHeight = 12;
  const tickWidth = 32;

  const ticks = new Array(numberOfTicks).fill(null).map((_, index) => ({
    y: index * ((drawableHeight - tickHeight) / (numberOfTicks - 1)),
  }));

  const INITIAL_DELAY = 200;

  const lastTickYPosition = ticks[numberOfTicks - 1].y;

  const distanceToFloor = (index) => lastTickYPosition - ticks[index].y;

  const [springs] = useSprings(ticks.length, (index) => ({
    opacity: 1,
    config: {mass: 1, tension: 350, friction: 22, velocity: 0},
    from: {
      transform: 'translate(0px,0px) rotate(0deg)',
    },
    to: async (next) => {
      switch (index) {
        case 0:
          await next({
            delay: INITIAL_DELAY + 300,
            config: {duration: 500},
            transform: `translate(10px,${
              distanceToFloor(index) - tickHeight * 4.6
            }px) rotate(52deg)`,
          });
          await next({
            config: {duration: 150},
            transform: `translate(40px,${
              distanceToFloor(index) - tickHeight * 2
            }px) rotate(52deg)`,
          });
          await next({
            config: {tension: 400, friction: 40},
            transform: `translate(60px,${
              distanceToFloor(index) - tickHeight * -0.1
            }px) rotate(0eg)`,
          });
          break;
        case 1:
          await next({
            delay: INITIAL_DELAY + 100,
            config: {duration: 80},
            transform: `translate(-1px,${
              ticks[2].y - ticks[index].y - tickHeight
            }px) rotate(-3deg)`,
          });
          await next({
            config: {duration: 90},
            transform: `translate(-6px,${
              ticks[2].y - ticks[index].y - tickHeight
            }px) rotate(-13deg)`,
          });
          await next({
            config: {duration: 390},
            transform: `translate(-4px,${
              distanceToFloor(index) - tickHeight * 1.7
            }px) rotate(-23deg)`,
          });
          await next({
            delay: 150,
            config: {tension: 500, friction: 100, velocity: 0.03},
            transform: `translate(-10px,${
              distanceToFloor(index) - tickHeight * 1.1
            }px) rotate(-40deg)`,
          });
          break;
        case 2:
          await next({
            config: {duration: 200},
            delay: INITIAL_DELAY + 150,
            transform: `translate(0px, 0px) rotate(-105deg)`,
          });
          await next({
            config: {duration: 200},
            transform: `translate(-15px,${
              distanceToFloor(index) - tickHeight * 2.5
            }px) rotate(-157deg)`,
          });
          await next({
            delay: 300,
            config: {tension: 500, friction: 40, velocity: 0.03},
            transform: `translate(-3px,${
              distanceToFloor(index) - tickHeight * 2.1
            }px) rotate(-150deg)`,
          });
          break;
        case 3:
          await next({
            config: {duration: 200},
            delay: INITIAL_DELAY,
            transform: `translate(0px, 0px) rotate(105deg)`,
          });
          await next({
            delay: 0,
            config: {tension: 500, friction: 40, velocity: 0.03},
            transform: `translate(8px,${
              distanceToFloor(index) - tickHeight * 2.4
            }px) rotate(138deg)`,
          });
          break;
        default:
          break;
      }
    },
  }));

  const {lines} = useLabels({
    labels: [errorText],
    targetWidth: width,
    chartHeight: height,
  });

  return (
    <div className={styles.Container} ref={ref}>
      {state === 'loading' && (
        <div
          className={styles.Shimmer}
          style={{
            background: `linear-gradient(-40deg,
            ${semiTransparentBackground} 10%,
            ${semiTransparentBackground} 35%,
            ${backgroundColor} 50%,
            ${semiTransparentBackground} 85%,
            ${semiTransparentBackground} 90%)`,
          }}
        />
      )}
      <svg viewBox={`0 0 ${width} ${height}`}>
        {springs.map((style, index) => {
          const y =
            index * ((drawableHeight - tickHeight) / (ticks.length - 1));

          return (
            <g key={index}>
              <animated.rect
                style={{
                  ...style,
                  transformOrigin: `${
                    index === 2 ? tickWidth + paddingLeft : paddingLeft
                  }px ${ticks[index].y + tickHeight}px`,
                }}
                x={paddingLeft}
                y={ticks[index].y}
                width={tickWidth}
                height={tickHeight}
                ry={2}
                rx={2}
                fill={gridColor}
              />
              <rect x={0} y={y + 5} width={width} height={1} fill={gridColor} />
            </g>
          );
        })}
        <g
          style={{
            transform: `translateY(${height / 2 - FONT_SIZE * 2}px)`,
          }}
        >
          <TextLine index={0} theme={theme} line={lines[0]} />
        </g>
      </svg>
    </div>
  );
}
