import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useContext, useMemo} from 'react';
import {ChartContext, estimateStringWidth} from '@shopify/polaris-viz-core';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';
import {clamp} from '../utilities';

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
  const {characterWidths} = useContext(ChartContext);

  let drawableWidth = maxWidth;
  let chartStartPosition = 0;

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
  chartStartPosition += labelWidth / 2;

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
    chartStartPosition,
  };
}
