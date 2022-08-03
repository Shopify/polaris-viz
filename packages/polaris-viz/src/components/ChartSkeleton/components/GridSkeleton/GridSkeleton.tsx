/* eslint-disable node/callback-return */
import React, {useEffect} from 'react';
import {
  Dimensions,
  useTheme,
  paddingStringToObject,
  ChartState,
} from '@shopify/polaris-viz-core';
import {useSprings, animated} from '@react-spring/web';

import {ErrorText} from '../ErrorText';

const BRICK_HEIGHT = 12;
const BRICK_WIDTH = 32;
const INITIAL_DELAY = 200;
const NUMBER_OF_BRICKS = 5;

export interface ChartSkeletonProps {
  dimensions?: Dimensions;
  state?: ChartState;
  errorText?: string;
}

export function GridSkeleton({
  dimensions,
  state,
  errorText,
}: Required<ChartSkeletonProps>) {
  const {width, height} = dimensions;

  const {
    chartContainer: {padding},
    grid: {color: gridColor},
  } = useTheme();

  const {paddingLeft, paddingBottom, paddingTop} =
    paddingStringToObject(padding);

  const drawableHeight = height - paddingBottom - paddingTop;

  const ticks = new Array(NUMBER_OF_BRICKS).fill(null).map((_, index) => ({
    y: index * ((drawableHeight - BRICK_HEIGHT) / (NUMBER_OF_BRICKS - 1)),
  }));

  const [springs, animation] = useSprings(ticks.length, () => ({
    opacity: 1,
    config: {mass: 1, tension: 350, friction: 22, velocity: 0},
    default: {
      immediate: false,
    },
    from: {
      transform: 'translate(0px,0px) rotate(0deg)',
    },
  }));

  useEffect(() => {
    const lastTickYPosition = ticks[NUMBER_OF_BRICKS - 1].y;
    const distanceToFloor = (index) => lastTickYPosition - ticks[index].y;

    if (state === ChartState.Error) {
      animation.start((index) => ({
        to: async (next) => {
          switch (index) {
            case 0:
              await next({
                delay: INITIAL_DELAY + 300,
                config: {duration: 500},
                transform: `translate(10px,${
                  distanceToFloor(index) - BRICK_HEIGHT * 4.6
                }px) rotate(52deg)`,
              });
              await next({
                config: {duration: 150},
                transform: `translate(40px,${
                  distanceToFloor(index) - BRICK_HEIGHT * 2
                }px) rotate(52deg)`,
              });
              await next({
                config: {tension: 400, friction: 40},
                transform: `translate(60px,${
                  distanceToFloor(index) - BRICK_HEIGHT * -0.1
                }px) rotate(0eg)`,
              });
              break;
            case 1:
              await next({
                delay: INITIAL_DELAY + 100,
                config: {duration: 80},
                transform: `translate(-1px,${
                  ticks[2].y - ticks[index].y - BRICK_HEIGHT
                }px) rotate(-3deg)`,
              });
              await next({
                config: {duration: 90},
                transform: `translate(-6px,${
                  ticks[2].y - ticks[index].y - BRICK_HEIGHT
                }px) rotate(-13deg)`,
              });
              await next({
                config: {duration: 390},
                transform: `translate(-4px,${
                  distanceToFloor(index) - BRICK_HEIGHT * 1.7
                }px) rotate(-23deg)`,
              });
              await next({
                delay: 150,
                config: {tension: 500, friction: 100, velocity: 0.03},
                transform: `translate(-10px,${
                  distanceToFloor(index) - BRICK_HEIGHT * 1.1
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
                  distanceToFloor(index) - BRICK_HEIGHT * 2.5
                }px) rotate(-157deg)`,
              });
              await next({
                delay: 300,
                config: {tension: 500, friction: 40, velocity: 0.03},
                transform: `translate(-3px,${
                  distanceToFloor(index) - BRICK_HEIGHT * 2.1
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
                  distanceToFloor(index) - BRICK_HEIGHT * 2.4
                }px) rotate(138deg)`,
              });
              break;
            default:
              break;
          }
        },
      }));
    }
  }, [animation, state, ticks]);

  return (
    <React.Fragment>
      <svg viewBox={`0 0 ${width} ${height}`}>
        {springs.map((style, index) => {
          const y = ticks[index].y;

          return (
            <g key={index}>
              <animated.rect
                style={{
                  ...style,
                  transformOrigin: `${
                    index === 2 ? BRICK_WIDTH + paddingLeft : paddingLeft
                  }px ${ticks[index].y + BRICK_HEIGHT}px`,
                }}
                x={paddingLeft}
                y={ticks[index].y}
                width={BRICK_WIDTH}
                height={BRICK_HEIGHT}
                ry={2}
                rx={2}
                fill={gridColor}
              />
              <rect x={0} y={y + 5} width={width} height={1} fill={gridColor} />
            </g>
          );
        })}
        {state === ChartState.Error && (
          <ErrorText errorText={errorText} width={width} height={height} />
        )}
      </svg>
    </React.Fragment>
  );
}
