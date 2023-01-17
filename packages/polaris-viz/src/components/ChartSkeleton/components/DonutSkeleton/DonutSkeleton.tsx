/* eslint-disable node/callback-return */
import React, {useEffect} from 'react';
import {ChartState, Dimensions} from '@shopify/polaris-viz-core';
import {useSprings, animated, config, easings} from '@react-spring/web';

import {Arc} from '../../../Arc/';
import {useTheme} from '../../../../hooks';

import styles from './DonutSkeleton.scss';

const ERROR_ANIMATION_PADDING = 30;
const FULL_CIRCLE = Math.PI * 2;
const INITIAL_DELAY = 700;
const RADIUS_PADDING = 20;
const SECONDARY_DELAY = 200;

interface Props {
  dimensions: Dimensions;
  state: ChartState;
  errorText: string;
}

export function DonutSkeleton({
  dimensions: {height, width},
  state,
  errorText,
}: Props) {
  const diameter = Math.min(width, height);
  const radius = diameter / 2;

  const selectedTheme = useTheme();
  const arcThickness = selectedTheme.arc.thickness;

  const arcs = [
    {
      startAngle: 0,
      endAngle: FULL_CIRCLE * 0.25,
    },
    {
      startAngle: FULL_CIRCLE * 0.25,
      endAngle: FULL_CIRCLE * 0.45,
    },
    {
      startAngle: FULL_CIRCLE * 0.45,
      endAngle: FULL_CIRCLE * 0.6,
    },
    {
      startAngle: FULL_CIRCLE * 0.6,
      endAngle: FULL_CIRCLE,
    },
  ];

  const [springs, animation] = useSprings(arcs.length, () => ({
    from: {
      transform: 'translate(0px,0px) rotate(0deg)',
    },
    config: config.stiff,
  }));

  useEffect(() => {
    const baseDistance = 82;

    const floor = {
      x: baseDistance * -0.1,
      y: baseDistance * 0.11,
    };

    const firstFrame = {
      delay: INITIAL_DELAY,
      config: {
        duration: 600,
        easing: easings.easeOutBounce,
      },
      transform: `translate(
        ${floor.x}px,
        ${floor.y}px)
        rotate(12deg)`,
    };

    if (state === ChartState.Error) {
      animation.start((index) => ({
        to: async (next) => {
          switch (index) {
            case 0:
              await next(firstFrame);
              await next({
                config: {
                  duration: 400,
                  easing: easings.easeInExpo,
                },
                delay: SECONDARY_DELAY,
                transform: `translate(
                  ${baseDistance * 0.28}px,
                  ${baseDistance * 1.49}px) rotate(-48deg)`,
              });
              break;
            case 1:
              await next(firstFrame);
              await next({
                config: {
                  duration: 140,
                  easing: easings.easeOutExpo,
                },
                delay: SECONDARY_DELAY + 200,
                transform: `translate(
                  ${baseDistance * 0.62}px,
                  ${baseDistance * 0.17}px) rotate(55deg)`,
              });
              break;
            case 2:
              await next(firstFrame);
              await next({
                config: {
                  duration: 190,
                  easing: easings.easeInExpo,
                },
                delay: SECONDARY_DELAY,
                transform: `translate(
                  ${baseDistance * -0.5}px,
                  ${baseDistance * 0.12}px) rotate(-10deg)`,
              });
              break;
            case 3:
              await next(firstFrame);
              await next({
                config: {
                  duration: 590,
                  easing: easings.easeInExpo,
                },
                delay: SECONDARY_DELAY * 2,
                transform: `translate(
                  ${0}px,
                  ${0}px) rotate(-12deg)`,
              });
              break;
            default:
              break;
          }
        },
      }));
    }
  }, [animation, height, radius, state]);

  const minX = -(40 + ERROR_ANIMATION_PADDING);
  const minY = -40;
  const viewBoxDimensions = {
    height: diameter + RADIUS_PADDING,
    width: diameter + RADIUS_PADDING - minX,
  };

  const center = (radius + RADIUS_PADDING) / 2;

  const transformOrigin = `${center}px ${RADIUS_PADDING * 2}px`;

  return (
    <div className={styles.DonutWrapper}>
      <div className={styles.Donut}>
        <svg
          viewBox={`${minX} ${minY} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
          height={diameter}
          width={diameter}
        >
          <g className={styles.DonutChart}>
            {springs.map((style, index) => {
              return (
                <animated.g
                  style={{
                    ...style,
                    transformOrigin,
                  }}
                  key={`DonutSkeleton-${index}`}
                >
                  <Arc
                    isAnimated={false}
                    width={diameter}
                    height={diameter}
                    radius={radius}
                    startAngle={arcs[index].startAngle}
                    endAngle={arcs[index].endAngle}
                    color={selectedTheme.grid.color}
                    cornerRadius={selectedTheme.arc.cornerRadius}
                    thickness={arcThickness}
                  />
                </animated.g>
              );
            })}
          </g>
        </svg>
        {state === ChartState.Error && (
          <div className={styles.ContentWrapper}>
            <span style={{color: selectedTheme.xAxis.labelColor}}>
              {errorText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
