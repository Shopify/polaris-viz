import {
  COLOR_VISION_GROUP_ITEM,
  LOAD_ANIMATION_DURATION,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {
  StackedValues,
  YAxisOptions,
  Color,
  DataSeries,
} from '@shopify/polaris-viz-core';
import type {ScaleBand, ScaleLinear} from 'd3-scale';
import React, {useMemo, useState} from 'react';

import {useWatchColorVisionEvents} from '../../../../hooks';
import {BarGroup} from '../BarGroup';
import {StackedBarGroups} from '../StackedBarGroups';

interface VerticalBarGroupProps {
  colors: Color[];
  data: DataSeries[];
  drawableHeight: number;
  gapWidth: number;
  id: string;
  isAnimated: boolean;
  labels: string[];
  sortedData: number[][];
  stackedValues: StackedValues | null;
  theme: string;
  xScale: ScaleBand<string>;
  yAxisOptions: Required<YAxisOptions>;
  yScale: ScaleLinear<number, number>;
  indexOffset?: number;
}

export function VerticalBarGroup({
  colors,
  data,
  drawableHeight,
  gapWidth,
  id,
  indexOffset = 0,
  isAnimated,
  labels,
  sortedData,
  stackedValues,
  theme,
  xScale,
  yScale,
  yAxisOptions,
}: VerticalBarGroupProps) {
  const selectedTheme = useTheme(theme);

  const [activeBarGroup, setActiveBarGroup] = useState<number>(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_GROUP_ITEM,
    onIndexChange: ({detail}) => {
      setActiveBarGroup(detail.index);
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
        colors={colors}
        drawableHeight={drawableHeight}
        gapWidth={gapWidth}
        id={id}
        labels={labels}
        stackedValues={stackedValues}
        theme={theme}
        xScale={xScale}
        yScale={yScale}
      />
    );
  }

  return (
    <React.Fragment>
      {sortedData.map((item, index) => {
        const xPosition = xScale(index.toString());
        const animationDelay =
          index * (LOAD_ANIMATION_DURATION / sortedData.length);

        return (
          <BarGroup
            accessibilityData={accessibilityData}
            activeBarGroup={activeBarGroup}
            animationDelay={animationDelay}
            barGroupIndex={index}
            colors={colors}
            data={item}
            gapWidth={gapWidth}
            hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
            height={drawableHeight}
            indexOffset={indexOffset}
            isAnimated={isAnimated}
            key={index}
            width={xScale.bandwidth()}
            x={xPosition == null ? 0 : xPosition}
            yScale={yScale}
            zeroAsMinHeight={selectedTheme.bar.zeroAsMinHeight}
          />
        );
      })}
    </React.Fragment>
  );
}
