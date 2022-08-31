import {useMemo} from 'react';
import {
  DataSeries,
  LINEAR_LABELS_INNER_PADDING,
  estimateStringWidth,
  clamp,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';

import {useLinearXScale} from './useLinearXScale';
import {useReducedLabelIndexes} from './useReducedLabelIndexes';

interface Props {
  data: DataSeries[];
  drawableWidth: number;
  hideXAxis: boolean;
  labels: string[];
  longestSeriesLength: number;
}

export function useLinearLabelsAndDimensions({
  data,
  drawableWidth: initialDrawableWidth,
  hideXAxis,
  labels,
  longestSeriesLength,
}: Props) {
  const {characterWidths} = useChartContext();

  const longestSeriesLastIndex = useMemo(
    () =>
      data.reduce(
        (max, currentSeries) => Math.max(max, currentSeries.data.length),
        0,
      ),
    [data],
  );

  const longestLabelWidth = useMemo(() => {
    const longestLabelWidth =
      labels.reduce((prev, cur) => {
        const width = estimateStringWidth(cur, characterWidths);

        if (width > prev) {
          return width;
        }

        return prev;
      }, HORIZONTAL_LABEL_MIN_WIDTH) + LINEAR_LABELS_INNER_PADDING;

    return clamp({
      amount: longestLabelWidth,
      min: 0,
      max: 75,
    });
  }, [labels, characterWidths]);

  const numberOfLabelsThatFit = Math.floor(
    initialDrawableWidth / longestLabelWidth,
  );
  const skipEveryNthLabel = Math.ceil(labels.length / numberOfLabelsThatFit);

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: longestSeriesLastIndex,
    skipEveryNthLabel,
  });

  const visibleLabelsCount =
    reducedLabelIndexes.length > 0 ? reducedLabelIndexes.length : labels.length;

  const labelWidth = useMemo(() => {
    if (visibleLabelsCount === 0 || hideXAxis) {
      return 0;
    }

    return clamp({
      amount: Math.min(
        initialDrawableWidth / visibleLabelsCount - LINEAR_LABELS_INNER_PADDING,
        longestLabelWidth,
      ),
      min: 0,
      max: initialDrawableWidth,
    });
  }, [initialDrawableWidth, visibleLabelsCount, hideXAxis, longestLabelWidth]);

  const drawableWidth = initialDrawableWidth - labelWidth;

  const {xScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  return {
    labels,
    xScale,
    xAxisDetails: {
      labelWidth,
      reducedLabelIndexes,
    },
  };
}
