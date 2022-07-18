import {
  clamp,
  LabelFormatter,
  estimateStringWidth,
  useChartContext,
} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';

import {useHorizontalTicksAndScale} from './useHorizontalTicksAndScale';

interface Props {
  allNumbers: number[];
  isStacked: boolean;
  maxWidth: number;
  stackedMax: number;
  stackedMin: number;
  labelFormatter: LabelFormatter;
}

export function useHorizontalXScale({
  allNumbers,
  isStacked,
  labelFormatter,
  maxWidth,
  stackedMax = 0,
  stackedMin = 0,
}: Props) {
  const {characterWidths} = useChartContext();

  let drawableWidth = maxWidth;
  let chartXPosition = 0;

  const {ticksFormatted: initialTicksFormatted} = useHorizontalTicksAndScale({
    maxWidth,
    allNumbers,
    labelFormatter,
    isStacked,
    stackedMin,
    stackedMax,
  });

  const labelWidth = useMemo(() => {
    const longestLabelWidth = initialTicksFormatted.reduce((prev, cur) => {
      const width = estimateStringWidth(cur, characterWidths);

      if (width > prev) {
        return width;
      }

      return prev;
    }, HORIZONTAL_LABEL_MIN_WIDTH);

    return clamp({
      amount: Math.min(
        maxWidth / initialTicksFormatted.length,
        longestLabelWidth,
      ),
      min: 0,
      max: maxWidth,
    });
  }, [maxWidth, characterWidths, initialTicksFormatted]);

  drawableWidth -= labelWidth;
  chartXPosition += labelWidth / 2;

  const {xScale, ticks, ticksFormatted} = useHorizontalTicksAndScale({
    maxWidth: drawableWidth,
    allNumbers,
    labelFormatter,
    isStacked,
    stackedMin,
    stackedMax,
  });

  return {
    xScale,
    ticks,
    ticksFormatted,
    drawableWidth,
    chartXPosition,
  };
}
