import React, {useMemo} from 'react';
import {DataSeries, useTheme} from '@shopify/polaris-viz-core';

import {shouldRotateZeroBars} from '../../../../utilities';
import type {YAxisOptions} from '../../../../types';
import {StackedBarGroups} from '../StackedBarGroups';
import {BarGroup} from '../BarGroup';

interface Props {
  activeBarGroup: number;
  data: DataSeries[];
  drawableHeight: number;
  gapWidth: number;
  id: string;
  labels: string[];
  sortedData: any;
  stackedValues: any;
  xScale: any;
  yAxisOptions: Required<YAxisOptions>;
  yScale: any;
  isAnimated?: boolean;
  theme?: string;
}

export function VerticalBarGroups({
  activeBarGroup,
  data,
  drawableHeight,
  gapWidth,
  id,
  isAnimated = true,
  labels,
  sortedData,
  stackedValues,
  theme,
  xScale,
  yAxisOptions,
  yScale,
}: Props) {
  const selectedTheme = useTheme(theme);

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

  const rotateZeroBars = useMemo(
    () =>
      selectedTheme.bar.zeroAsMinHeight &&
      data.every(({data}) => shouldRotateZeroBars(data)),
    [selectedTheme.bar.zeroAsMinHeight, data],
  );

  // const barColors = data.map(({color}) => color!);

  const barColors = data.map(() => 'grey');

  return (
    <React.Fragment>
      {stackedValues != null ? (
        <StackedBarGroups
          accessibilityData={accessibilityData}
          activeBarGroup={activeBarGroup}
          colors={barColors}
          drawableHeight={drawableHeight}
          gapWidth={gapWidth}
          id={id}
          labels={labels}
          stackedValues={stackedValues}
          theme={theme}
          xScale={xScale}
          yScale={yScale}
        />
      ) : (
        sortedData.map((item, index) => {
          const xPosition = xScale(index.toString());
          return (
            <BarGroup
              isAnimated={isAnimated}
              gapWidth={gapWidth}
              key={index}
              x={xPosition == null ? 0 : xPosition}
              yScale={yScale}
              data={item}
              width={xScale.bandwidth()}
              height={drawableHeight}
              colors={barColors}
              barGroupIndex={index}
              hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
              rotateZeroBars={rotateZeroBars}
              zeroAsMinHeight={selectedTheme.bar.zeroAsMinHeight}
              accessibilityData={accessibilityData}
              activeBarGroup={activeBarGroup}
            />
          );
        })
      )}
    </React.Fragment>
  );
}
