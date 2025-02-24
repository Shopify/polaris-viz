import {
  COLOR_VISION_GROUP_ITEM,
  DataType,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  StackedValues,
  YAxisOptions,
  Color,
  DataSeries,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import {Fragment, useMemo, useState} from 'react';

import {getLoadAnimationDelay} from '../../../../utilities/getLoadAnimationDelay';
import {getChartId} from '../../../../utilities/getChartId';
import {applyColorVisionToDomElement} from '../../../../utilities/applyColorVisionToDomElement';
import type {SortedBarChartData} from '../../../../types';
import {useWatchColorVisionEvents} from '../../../../hooks';
import {BarGroup} from '../BarGroup';
import {StackedBarGroups} from '../StackedBarGroups';

interface VerticalBarGroupProps {
  colors: Color[];
  chartXPosition: number;
  chartYPosition: number;
  data: DataSeries[];
  drawableHeight: number;
  gapWidth: number;
  id: string;
  labels: string[];
  sortedData: SortedBarChartData;
  stackedValues: StackedValues | null;
  xScale: ScaleBand<string>;
  yAxisOptions: Required<YAxisOptions>;
  yScale: ScaleLinear<number, number>;
  indexOffset?: number;
  areAllNegative?: boolean;
}

export function VerticalBarGroup({
  areAllNegative,
  chartXPosition,
  chartYPosition,
  colors,
  data,
  drawableHeight,
  gapWidth,
  id,
  indexOffset = 0,
  labels,
  sortedData,
  stackedValues,
  xScale,
  yAxisOptions,
  yScale,
}: VerticalBarGroupProps) {
  const {id: chartId, isPerformanceImpacted} = useChartContext();

  const [activeBarGroup, setActiveBarGroup] = useState<number>(-1);

  const groupElements = useMemo(() => {
    const chart = document.getElementById(getChartId(chartId));

    if (chart == null) {
      return [];
    }

    return chart.querySelectorAll<SVGGElement>(
      `[data-type="${DataType.BarGroup}"]`,
    );
    // We want this to run whenever colors change so we
    // get all the groups again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData]);

  useWatchColorVisionEvents({
    type: COLOR_VISION_GROUP_ITEM,
    onIndexChange: ({detail}) => {
      setActiveBarGroup(detail.index);

      groupElements.forEach((element) => {
        applyColorVisionToDomElement({
          element,
          activeIndex: detail.index,
          isPerformanceImpacted,
        });
      });
    },
  });

  const accessibilityData = useMemo(
    () =>
      labels.map((title, index) => {
        const content = data.map(({data, name}) => {
          return {
            label: name ?? '',
            value: yAxisOptions.labelFormatter(data[index].value ?? 0),
          };
        });
        return {title, data: content};
      }),
    [data, labels, yAxisOptions],
  );

  if (stackedValues != null) {
    return (
      <StackedBarGroups
        accessibilityData={accessibilityData}
        activeBarGroup={activeBarGroup}
        chartXPosition={chartXPosition}
        chartYPosition={chartYPosition}
        colors={colors}
        data={data}
        drawableHeight={drawableHeight}
        gapWidth={gapWidth}
        id={id}
        labels={labels}
        stackedValues={stackedValues}
        xScale={xScale}
        yScale={yScale}
      />
    );
  }

  return (
    <Fragment>
      {sortedData.map((item, index) => {
        const xPosition = xScale(index.toString());
        const animationDelay = getLoadAnimationDelay(index, sortedData.length);

        return (
          <BarGroup
            accessibilityData={accessibilityData}
            activeBarGroup={activeBarGroup}
            animationDelay={animationDelay}
            areAllNegative={areAllNegative}
            barGroupIndex={index}
            chartXPosition={chartXPosition}
            chartYPosition={chartYPosition}
            colors={colors}
            data={item}
            drawableHeight={drawableHeight}
            gapWidth={gapWidth}
            indexOffset={indexOffset}
            key={index}
            width={xScale.bandwidth()}
            x={xPosition == null ? 0 : xPosition}
            yScale={yScale}
          />
        );
      })}
    </Fragment>
  );
}
