import React from 'react';
import {
  useTheme,
  useUniqueId,
  changeColorOpacity,
  ChartState,
} from '@shopify/polaris-viz-core';

import type {ChartSkeletonProps} from '../../ChartSkeleton';
import {Bar} from '../../../shared';
import {ErrorText} from '../ErrorText';

export function FunnelSkeleton({
  dimensions,
  state,
  errorText,
}: Omit<Required<ChartSkeletonProps>, 'type' | 'theme'>) {
  const {width, height} = dimensions;

  const {
    grid: {color: gridColor},
  } = useTheme();
  const barsQuantity = 4;
  const gap = width * 0.05;
  const innerWidth = width - gap;
  const segmentWidth = innerWidth / barsQuantity;
  const barWidth = segmentWidth / 2;
  const id = useUniqueId('loadingFunnel');
  const heightGap = (height * 1.3) / barsQuantity;

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
        <ErrorText errorText={errorText} width={width} height={height} />
      )}
    </svg>
  );
}
