import React from 'react';
import {
  useTheme,
  useUniqueId,
  BORDER_RADIUS,
  changeColorOpacity,
  ChartState,
  FONT_SIZE,
} from '@shopify/polaris-viz-core';

import {useLabels} from '../../../Labels/hooks';
import {TextLine} from '../../../TextLine';
import type {ChartSkeletonProps} from '../../ChartSkeleton';
import {Bar} from '../../../shared';

const TEXT_DROP_SHADOW_SIZE = 3;

export function FunnelSkeleton({
  dimensions,
  state,
  errorText,
}: Omit<Required<ChartSkeletonProps>, 'type'>) {
  const {width, height} = dimensions;

  const {
    chartContainer: {backgroundColor},
    grid: {color: gridColor},
  } = useTheme();
  const barsQuantity = 4;
  const gap = width * 0.05;
  const innerWidth = width - gap;
  const segmentWidth = innerWidth / barsQuantity;
  const barWidth = segmentWidth / 2;
  const id = useUniqueId('loadingFunnel');
  const heightGap = (height * 1.3) / barsQuantity;

  const {lines} = useLabels({
    labels: [errorText],
    targetWidth: width,
    chartHeight: height,
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {state === ChartState.Loading &&
        Array(barsQuantity)
          .fill(null)
          .map((_, index) => {
            const barHeight = height - heightGap * index;
            const nextBarHeight = height - heightGap * (index + 1);
            const connector = {
              height,
              startX: (segmentWidth / 2) * index,
              startY: height - barHeight,
              nextX: (segmentWidth / 2) * (index + 1),
              nextY: height - nextBarHeight,
            };

            return (
              <React.Fragment key={`${id}${index}`}>
                <Bar
                  borderRadius={BORDER_RADIUS.Top}
                  color={gridColor}
                  x={segmentWidth * index}
                  y={height - barHeight}
                  height={barHeight}
                  width={barWidth}
                />
                {index !== barsQuantity - 1 && (
                  <path
                    style={{
                      transform: `translateX(${
                        (segmentWidth / 2) * (index + 1)
                      }px)`,
                    }}
                    fill={changeColorOpacity(gridColor, 0.2)}
                    d={`M${connector.startX} ${connector.startY}
                    L ${connector.nextX} ${connector.nextY}
                    V ${connector.height} H ${connector.startX} Z`}
                  />
                )}
              </React.Fragment>
            );
          })}
      {state === ChartState.Error && (
        <g
          style={{
            transform: `translateY(${height / 2 - FONT_SIZE * 2}px)`,
            filter: `
                drop-shadow( ${TEXT_DROP_SHADOW_SIZE}px 0px 1px ${backgroundColor})
                drop-shadow( -${TEXT_DROP_SHADOW_SIZE}px  0px 1px ${backgroundColor})
                drop-shadow( 0px ${TEXT_DROP_SHADOW_SIZE}px 1px ${backgroundColor})
                drop-shadow( 0px -${TEXT_DROP_SHADOW_SIZE}px 1px ${backgroundColor})
              `,
          }}
        >
          <TextLine index={0} line={lines[0]} />
        </g>
      )}
    </svg>
  );
}
