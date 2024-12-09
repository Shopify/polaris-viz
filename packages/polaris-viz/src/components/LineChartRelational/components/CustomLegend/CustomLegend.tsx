/* eslint-disable @shopify/strict-component-boundaries */
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  COLOR_VISION_SINGLE_ITEM,
  useChartContext,
} from '@shopify/polaris-viz-core';
import {useCallback, useState} from 'react';

import {useOverflowLegend} from '../../../../components/LegendContainer/hooks/useOverflowLegend';
import {HiddenLegendTooltip} from '../../../../components/LegendContainer/components/HiddenLegendTooltip';
import type {
  ColorVisionInteractionMethods,
  RenderHiddenLegendLabel,
} from '../../../../types';
import type {LegendItemDimension} from '../../../../components/Legend';
import {LegendItem} from '../../../../components/Legend';

import styles from './CustomLegend.scss';

export interface Props extends ColorVisionInteractionMethods {
  data: DataSeries[];
  seriesNameFormatter: LabelFormatter;
  theme: string;
  activeIndex: number;
  legendItemDimensions: React.RefObject<LegendItemDimension[]>;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
}

const HORIZONTAL_MARGIN = 16;
const LEFT_MARGIN = 12;
export function CustomLegend({
  data,
  getColorVisionEventAttrs,
  getColorVisionStyles,
  seriesNameFormatter,
  theme,
  activeIndex,
  legendItemDimensions,
  renderHiddenLegendLabel = (count) => `+${count} more`,
}: Props) {
  const {containerBounds} = useChartContext();
  const deduplicatedData = deduplicateByRelatedIndex(data);
  const [activatorWidth, setActivatorWidth] = useState(0);

  const overflowLegendProps = {
    direction: 'horizontal' as const,
    data: deduplicatedData,
    enableHideOverflow: true,
    legendItemDimensions,
    width: containerBounds.width,
    activatorWidth,
    leftMargin: LEFT_MARGIN,
    horizontalMargin: HORIZONTAL_MARGIN,
  };

  const {displayedData, hiddenData} = useOverflowLegend(overflowLegendProps);

  const lineSeries = data.filter(
    (series) => series?.metadata?.relatedIndex == null,
  );

  const percentileItems = data.filter(
    (series) => series?.metadata?.relatedIndex != null,
  );

  const percentileIndex = lineSeries.length + 1;

  const hasHiddenData = displayedData.length < deduplicatedData.length;
  const visibleSeries = hasHiddenData ? displayedData : lineSeries;
  const formattedHiddenData = hiddenData.map((series) => ({
    color: series.color!,
    name: seriesNameFormatter(series?.metadata?.legendLabel ?? series.name),
    shape: series.styleOverride?.tooltip?.shape ?? 'Line',
    lineStyle: series.metadata?.lineStyle,
  }));

  const onDimensionChange = useCallback(
    (index, dimensions: LegendItemDimension) => {
      if (legendItemDimensions?.current) {
        legendItemDimensions.current[index] = dimensions;
      }
    },
    [legendItemDimensions],
  );

  return (
    <ul className={styles.Container}>
      {visibleSeries.map((series) => {
        const {color, name, isComparison, metadata, styleOverride} = series;
        if (metadata?.isPredictive) {
          return null;
        }

        const index = data.findIndex((series) => series.name === name);

        return (
          <li
            key={index}
            style={{
              ...getColorVisionStyles(index),
            }}
            {...getColorVisionEventAttrs(index)}
          >
            <LegendItem
              color={color!}
              index={index}
              isComparison={isComparison}
              name={seriesNameFormatter(metadata?.legendLabel ?? name)}
              shape={styleOverride?.tooltip?.shape ?? 'Line'}
              lineStyle={metadata?.lineStyle}
              theme={theme}
              onDimensionChange={onDimensionChange}
            />
          </li>
        );
      })}

      {!hasHiddenData && percentileItems.length > 0 && (
        <li
          key={percentileIndex}
          style={{
            ...getColorVisionStyles(percentileIndex),
          }}
          {...getColorVisionEventAttrs(percentileIndex)}
        >
          <LegendItem
            color={
              percentileItems[0].color ??
              percentileItems[0]?.metadata?.areaColor
            }
            index={percentileIndex}
            name={seriesNameFormatter(
              percentileItems[0]?.metadata?.legendLabel,
            )}
            shape="Bar"
            lineStyle="dashed"
            theme={theme}
            onDimensionChange={onDimensionChange}
          />
        </li>
      )}

      {hasHiddenData && (
        <HiddenLegendTooltip
          activeIndex={activeIndex}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={formattedHiddenData}
          theme={theme}
          label={renderHiddenLegendLabel(hiddenData.length)}
          lastVisibleIndex={deduplicatedData.length - hiddenData.length}
          setActivatorWidth={setActivatorWidth}
        />
      )}
    </ul>
  );
}

const deduplicateByRelatedIndex = (data: any[]) => {
  const existingRelatedIndex = new Set();
  return data.filter((item) => {
    const relatedIndex = item.metadata?.relatedIndex;
    if (!relatedIndex) return true;
    if (existingRelatedIndex.has(relatedIndex)) return false;
    existingRelatedIndex.add(relatedIndex);
    return true;
  });
};
