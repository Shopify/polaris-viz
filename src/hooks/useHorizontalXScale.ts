import {useContext, useMemo} from 'react';

import {ChartContext} from '../components';
import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';
import type {LabelFormatter} from '../types';
import {clamp, estimateStringWidth} from '../utilities';

import {useGetHorizontalXScales} from './useGetHorizontalXScales';

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

  const {ticksFormatted: initialTicksFormatted} = useGetHorizontalXScales({
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
      // Make the starting point 1px wider than the
      // minimum so we skip the diagonal line logic
    }, HORIZONTAL_LABEL_MIN_WIDTH + 1);

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

  const {xScale, ticks, ticksFormatted} = useGetHorizontalXScales({
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
