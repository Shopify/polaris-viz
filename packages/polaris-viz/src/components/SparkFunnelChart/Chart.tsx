import {Fragment} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import {useChartContext} from '@shopify/polaris-viz-core';

import {useFunnelBarScaling} from '../../hooks';
import {FunnelChartConnectorGradient} from '../shared/FunnelChartConnector';
import {FunnelChartConnector, FunnelChartSegment} from '../shared';
import {ChartElements} from '../ChartElements';

import type {SparkFunnelChartProps} from './SparkFunnelChart';
import styles from './SparkFunnelChart.scss';

const LINE_OFFSET = 1;
const GAP = 1;
const SEGMENT_WIDTH_RATIO = 0.75;

export function Chart({data, accessibilityLabel}: SparkFunnelChartProps) {
  const {containerBounds} = useChartContext();

  const dataSeries = data[0].data;
  const xValues = dataSeries.map(({key}) => key) as string[];
  const yValues = dataSeries.map(({value}) => value) as [number, number];

  const {width: drawableWidth, height: drawableHeight} = containerBounds ?? {
    width: 0,
    height: 0,
  };

  const totalStepWidth = drawableWidth / xValues.length;
  const connectorWidth = totalStepWidth * (1 - SEGMENT_WIDTH_RATIO);
  const drawableWidthWithLastConnector = drawableWidth + connectorWidth;

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, drawableWidthWithLastConnector]);

  const yScale = scaleLinear()
    .range([0, drawableHeight])
    .domain([0, Math.max(...yValues)]);

  const {getBarHeight, shouldApplyScaling} = useFunnelBarScaling({
    yScale,
    values: yValues,
  });

  const sectionWidth = xScale.bandwidth();
  const barWidth = sectionWidth * SEGMENT_WIDTH_RATIO;

  return (
    <Fragment>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <ChartElements.Svg height={drawableHeight} width={drawableWidth}>
        <FunnelChartConnectorGradient />

        {dataSeries.map((dataPoint, index: number) => {
          const nextPoint = dataSeries[index + 1];
          const xPosition = xScale(dataPoint.key as string);
          const x = xPosition == null ? 0 : xPosition;
          const nextBarHeight = getBarHeight(nextPoint?.value || 0);

          const barHeight = getBarHeight(dataPoint.value || 0);
          const isLast = index === dataSeries.length - 1;

          return (
            <Fragment key={dataPoint.key}>
              <g key={dataPoint.key} role="listitem">
                <FunnelChartSegment
                  ariaLabel={`${dataPoint.key}: ${dataPoint.value}`}
                  barHeight={barHeight}
                  barWidth={barWidth}
                  index={index}
                  isLast={isLast}
                  x={x}
                  shouldApplyScaling={shouldApplyScaling}
                >
                  {!isLast && (
                    <FunnelChartConnector
                      drawableHeight={drawableHeight}
                      height={drawableHeight}
                      index={index}
                      nextX={
                        (xScale(nextPoint?.key as string) ?? 0) - LINE_OFFSET
                      }
                      nextY={drawableHeight - nextBarHeight}
                      startX={x + barWidth + GAP}
                      startY={drawableHeight - barHeight}
                    />
                  )}
                </FunnelChartSegment>
              </g>
            </Fragment>
          );
        })}
      </ChartElements.Svg>
    </Fragment>
  );
}
