import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {LINEAR_LABELS_INNER_PADDING, clamp} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../utilities/estimateStringWidthWithOffset';
import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';
import {getFontSize} from '../utilities/getFontSize';

import {useLinearXScale} from './useLinearXScale';
import {useReducedLabelIndexes} from './useReducedLabelIndexes';

const MAX_LINEAR_LABEL_WIDTH = 90;

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
  const fontSize = getFontSize();

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
        const width = estimateStringWidthWithOffset(cur, fontSize);

        if (width > prev) {
          return width;
        }

        return prev;
      }, HORIZONTAL_LABEL_MIN_WIDTH) + LINEAR_LABELS_INNER_PADDING;

    return clamp({
      amount: longestLabelWidth,
      min: 0,
      max: MAX_LINEAR_LABEL_WIDTH,
    });
  }, [labels, fontSize]);

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

  const drawableWidth = initialDrawableWidth;

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
