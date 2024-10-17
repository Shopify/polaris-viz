/* eslint-disable @shopify/strict-component-boundaries */
import type {ColorVisionInteractionMethods, DataSeries} from 'index';
import type {BoundingRect, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  COLOR_VISION_SINGLE_ITEM,
  clamp,
  estimateStringWidth,
  getSeriesColors,
  useChartContext,
  useTheme,
} from '@shopify/polaris-viz-core';
import React, {useMemo, useRef} from 'react';

import {useOverflowLegend} from '../../../LegendContainer/hooks/useOverflowLegend';
import {getTrendIndicatorData} from '../../../../utilities/getTrendIndicatorData';
import {HiddenLegendTooltip} from '../../../LegendContainer/components/HiddenLegendTooltip';
import {useLegend} from '../../../LegendContainer/hooks/useLegend';
import type {RenderHiddenLegendLabel} from '../../../../types';

import styles from './LegendValues.scss';
import {LegendValueItem} from './components/LegendValueItem/LegendValueItem';

const TABLE_LEGEND_PADDING = 50;

interface LegendContentProps {
  data: DataSeries[];
  activeIndex: number;
  dimensions: BoundingRect;
  legendFullWidth: boolean;
  labelFormatter: LabelFormatter;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
  getColorVisionStyles: ColorVisionInteractionMethods['getColorVisionStyles'];
  getColorVisionEventAttrs: ColorVisionInteractionMethods['getColorVisionEventAttrs'];
  seriesNameFormatter: LabelFormatter;
}

export function LegendValues({
  data: allData,
  activeIndex,
  dimensions,
  legendFullWidth,
  labelFormatter,
  renderHiddenLegendLabel = (count) => `+${count} more`,
  getColorVisionStyles,
  getColorVisionEventAttrs,
  seriesNameFormatter,
}: LegendContentProps) {
  const selectedTheme = useTheme();
  const {theme, characterWidths} = useChartContext();

  const legendItemDimensions = useRef([{width: 0, height: 0}]);

  const seriesCount = clamp({
    amount: allData.length,
    min: 1,
  });

  const seriesColors = getSeriesColors(seriesCount, selectedTheme);

  const {legend: legendData, height} = useLegend({
    showLegend: true,
    data: [{series: allData, shape: 'Bar'}],
    colors: seriesColors,
    dimensions,
    seriesNameFormatter,
  });

  const {displayedData, hiddenData} = useOverflowLegend({
    direction: 'vertical',
    data: legendData,
    height,
    legendItemDimensions,
    enableHideOverflow: true,
  });

  const hasHiddenData = displayedData.length < allData.length;

  const maxTrendIndicatorWidth = allData.reduce((maxWidth, {metadata}) => {
    if (!metadata?.trend) {
      return maxWidth;
    }

    const {trendIndicatorWidth} = getTrendIndicatorData(metadata.trend);

    return Math.max(maxWidth, trendIndicatorWidth);
  }, 0);

  const longestLegendNameWidth = useMemo(() => {
    return legendData.reduce((previous, current) => {
      const estimatedLegendNameWidth = estimateStringWidth(
        `${seriesNameFormatter(`${current.name || ''}`)}`,
        characterWidths,
      );

      if (estimatedLegendNameWidth > previous) {
        return estimatedLegendNameWidth;
      }

      return previous;
    }, 0);
  }, [legendData, seriesNameFormatter, characterWidths]);

  const longestLegendValueWidth = useMemo(() => {
    return legendData.reduce((previous, current) => {
      const estimatedLegendValueWidth = estimateStringWidth(
        `${labelFormatter(`${current.value || ''}`)}`,
        characterWidths,
      );

      if (estimatedLegendValueWidth > previous) {
        return estimatedLegendValueWidth;
      }

      return previous;
    }, 0);
  }, [legendData, labelFormatter, characterWidths]);

  const legendTableMaxWidth = useMemo(
    () =>
      longestLegendNameWidth +
      longestLegendValueWidth +
      maxTrendIndicatorWidth +
      TABLE_LEGEND_PADDING,
    [longestLegendNameWidth, longestLegendValueWidth, maxTrendIndicatorWidth],
  );

  return (
    <React.Fragment>
      <table
        className={styles.Table}
        style={{
          maxWidth: legendTableMaxWidth,
          width: legendFullWidth ? 'auto' : '100%',
        }}
      >
        <tbody>
          {displayedData.map(({name, value, trend}, index) => {
            return (
              <LegendValueItem
                key={index}
                name={name}
                value={value}
                trend={trend}
                index={index}
                longestLegendValueWidth={longestLegendValueWidth}
                maxTrendIndicatorWidth={maxTrendIndicatorWidth}
                seriesColors={seriesColors}
                seriesNameFormatter={seriesNameFormatter}
                onDimensionChange={(dimensions) => {
                  if (legendItemDimensions.current) {
                    legendItemDimensions.current[index] = dimensions;
                  }
                }}
                getColorVisionEventAttrs={getColorVisionEventAttrs}
                getColorVisionStyles={getColorVisionStyles}
                labelFormatter={labelFormatter}
              />
            );
          })}
        </tbody>
      </table>

      {hasHiddenData && (
        <HiddenLegendTooltip
          activeIndex={activeIndex}
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={hiddenData}
          theme={theme}
          label={renderHiddenLegendLabel(allData.length - displayedData.length)}
          lastVisibleIndex={allData.length - hiddenData.length}
          setActivatorWidth={() => null}
          dimensions={dimensions}
          seriesNameFormatter={seriesNameFormatter}
        />
      )}
    </React.Fragment>
  );
}
