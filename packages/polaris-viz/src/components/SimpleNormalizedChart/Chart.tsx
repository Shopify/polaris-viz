import { useState } from 'react';
import {sum} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {
  COLOR_VISION_SINGLE_ITEM,
  DataSeries,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {Direction, LabelFormatter} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {
  useColorVisionEvents,
  useTheme,
  useWatchColorVisionEvents,
} from '../../hooks';
import {classNames} from '../../utilities';
import type {LegendPosition, RenderLegendContent} from '../../types';
import {WARN_FOR_DEVELOPMENT} from '../../constants';

import {BarSegment, BarLabel} from './components';
import type {Size} from './types';
import styles from './SimpleNormalizedChart.scss';

export interface ChartProps {
  data: DataSeries[];
  comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
  labelFormatter?: LabelFormatter;
  legendPosition?: LegendPosition;
  direction?: Direction;
  size?: Size;
  showLegend?: boolean;
  renderLegendContent?: RenderLegendContent;
}

export function Chart({
  comparisonMetrics = [],
  data,
  labelFormatter = (value) => `${value}`,
  legendPosition = 'top-left',
  direction = 'horizontal',
  size = 'small',
  showLegend = true,
  renderLegendContent,
}: ChartProps) {
  const flattenedData = data.map(({data}) => data).flat();

  useColorVisionEvents();

  const selectedTheme = useTheme();
  const colors = useThemeSeriesColors(data, selectedTheme);

  const containsNegatives = flattenedData.some(
    ({value}) => value !== null && value < 0,
  );

  const [activeIndex, setActiveIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => setActiveIndex(detail.index),
  });

  if (WARN_FOR_DEVELOPMENT && containsNegatives) {
    // eslint-disable-next-line no-console
    console.warn(
      'This component is not built to handle negatives. Consider using a different component.',
    );
  }

  if (WARN_FOR_DEVELOPMENT && flattenedData.length > 4) {
    throw new Error(
      'This component displays a max of 4 data items. Please modify your data before passing it into this component.',
    );
  }

  const slicedData = flattenedData.slice(0, 4);
  const totalValue = sum(slicedData, ({value}) => value);

  const xScale = scaleLinear().range([0, 100]).domain([0, totalValue]);

  const isVertical = direction === 'vertical';
  const bars = isVertical ? slicedData.reverse() : slicedData;
  const isEmptyValues = slicedData.every(({value}) => !value);

  const isRightLabel = legendPosition.includes('right');
  const isBottomLabel = legendPosition.includes('bottom');
  const isVerticalAndRightLabel = isVertical && isRightLabel;
  const isVerticalAndBottomLabel = isVertical && isBottomLabel;
  const isHorizontalAndRightLabel = !isVertical && isRightLabel;
  const isHorizontalAndBottomLabel = !isVertical && isBottomLabel;

  const legendMarkup = () => {
    if (!showLegend) {
      return null;
    }

    if (renderLegendContent) {
      const colorVisionInteractionMethods = {
        getColorVisionStyles: (index: number) =>
          getColorVisionStylesForActiveIndex({activeIndex, index}),
        getColorVisionEventAttrs: (index: number) =>
          getColorVisionEventAttrs({type: COLOR_VISION_SINGLE_ITEM, index}),
      };

      return (
        <div
          className={classNames(
            isVertical
              ? styles.VerticalLabelContainer
              : styles.HorizontalLabelContainer,
            (isVerticalAndBottomLabel || isHorizontalAndRightLabel) &&
              styles.LabelContainerEndJustify,
          )}
        >
          {renderLegendContent(colorVisionInteractionMethods)}
        </div>
      );
    }

    return (
      <ul
        className={classNames(
          ...(isVertical
            ? [styles.VerticalLabelContainer]
            : [
                styles.HorizontalLabelContainer,
                styles.HorizontalLabelContainerGrid,
              ]),
          (isVerticalAndBottomLabel || isHorizontalAndRightLabel) &&
            styles.LabelContainerEndJustify,
        )}
      >
        {slicedData.map(({key, value}, index) => {
          if (value == null) {
            return null;
          }

          const comparisonMetric = comparisonMetrics.find(
            ({dataIndex}) => index === dataIndex,
          );

          const formattedValue = labelFormatter(value);
          return (
            <BarLabel
              activeIndex={activeIndex}
              index={index}
              key={`${key}-${formattedValue}-${index}`}
              label={`${data[index].name}`}
              value={formattedValue}
              color={colors[index]}
              comparisonMetric={comparisonMetric}
              direction={direction}
              legendPosition={legendPosition}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={classNames(
        styles.Container,
        isVertical ? styles.VerticalContainer : styles.HorizontalContainer,
        isVerticalAndRightLabel && styles.VerticalContainerRightLabel,
        isHorizontalAndBottomLabel && styles.HorizontalContainerBottomLabel,
      )}
    >
      {legendMarkup()}
      <div
        className={classNames(
          styles.BarContainer,
          isVertical
            ? styles.VerticalBarContainer
            : styles.HorizontalBarContainer,
        )}
      >
        {isEmptyValues ? (
          <BarSegment
            activeIndex={-1}
            index={-1}
            direction={direction}
            size={size}
            scale={100}
            key="empty-bar"
            color={selectedTheme.seriesColors.empty}
            roundedCorners={selectedTheme.bar.borderRadius}
          />
        ) : (
          bars.map(({value, key}, index) => {
            if (value == null || value === 0) {
              return null;
            }

            const colorIndex = isVertical ? bars.length - 1 - index : index;

            return (
              <BarSegment
                activeIndex={activeIndex}
                index={colorIndex}
                direction={direction}
                size={size}
                scale={xScale(value)}
                key={`${key}-${index}`}
                color={colors[colorIndex]}
                roundedCorners={selectedTheme.bar.borderRadius}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
