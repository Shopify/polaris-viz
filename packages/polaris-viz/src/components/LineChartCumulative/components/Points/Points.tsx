import {Fragment} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {
  isGradientType,
  DataType,
  changeColorOpacity,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';

import {Point} from '../../../Point';

interface PointsProps {
  activeIndex: number | null;
  data: LineChartDataSeriesWithDefaults[];
  gradientId: string;
  longestSeriesIndex: number;
  tooltipId: string;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export function Points({
  activeIndex,
  data,
  gradientId,
  longestSeriesIndex,
  tooltipId,
  xScale,
  yScale,
}: PointsProps) {
  const {shouldAnimate} = useChartContext();

  return (
    <Fragment>
      {data.map((singleSeries, seriesIndex) => {
        if (singleSeries?.metadata?.isVisuallyHidden === true) {
          return null;
        }

        const index = singleSeries.metadata?.relatedIndex ?? seriesIndex;

        const {data: singleData, name, color} = singleSeries;
        const isLongestLine = index === longestSeriesIndex;
        const pointGradientId = `${gradientId}-point-${index}`;

        const pointColor = isGradientType(color)
          ? `url(#${pointGradientId})`
          : changeColorOpacity(color);

        return (
          <Fragment key={`${name}-${index}`}>
            {singleData.map(({value}, dataIndex) => {
              if (value == null) {
                return null;
              }

              return (
                <g key={`${name}-${index}-${dataIndex}`}>
                  <Point
                    dataType={DataType.Point}
                    color={pointColor}
                    cx={xScale(dataIndex)}
                    cy={yScale(value)}
                    active={activeIndex === dataIndex}
                    index={dataIndex}
                    tabIndex={isLongestLine ? 0 : -1}
                    ariaLabelledby={tooltipId}
                    isAnimated={false}
                    ariaHidden={false}
                    visuallyHidden={shouldAnimate}
                  />
                </g>
              );
            })}
          </Fragment>
        );
      })}
    </Fragment>
  );
}
