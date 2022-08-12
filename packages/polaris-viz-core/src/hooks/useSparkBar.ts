import {scaleBand, scaleLinear} from 'd3-scale';
import {useCallback, useMemo} from 'react';

import {isGradientType} from '../utilities';
import type {Color, DataPoint, DataSeries, TargetLine} from '../types';

const STROKE_WIDTH = 1.5;
const BAR_PADDING = 0.3;
const MARGIN = 8;
const BAR_MIN_HEIGHT_RATIO = 0.5;

function calculateRange(data: DataPoint[], height: number) {
  let hasNegatives;
  let hasPositives;
  for (const {value} of data) {
    if (value != null && value < 0) hasNegatives = true;
    else if (value != null && value > 0) hasPositives = true;

    if (hasNegatives && hasPositives) break;
  }

  let range = [height, MARGIN];

  if (hasNegatives && hasPositives) {
    range = [height - MARGIN, MARGIN];
  } else if (hasNegatives) {
    range = [height - MARGIN, 0];
  }

  return range;
}

function removeNullValues(data: DataSeries | undefined) {
  if (data == null) {
    return [];
  }

  return data.data
    .filter(({value}) => typeof value === 'number')
    .map(({value}) => value) as number[];
}

export function useSparkBar({
  data,
  height,
  width,
  seriesColor,
  targetLine = {offsetLeft: 0, offsetRight: 0, value: 0},
}: {
  data: DataSeries[];
  height: number;
  width: number;
  seriesColor: Color;
  targetLine?: TargetLine;
}) {
  const {
    offsetLeft: rawOffsetLeft = 0,
    offsetRight: rawOffsetRight = 0,
    value: targetValue = 0,
  } = targetLine;

  const offsetLeft = Math.abs(rawOffsetLeft);
  const offsetRight = Math.abs(rawOffsetRight);

  const filteredData = removeNullValues(data[0]);
  const [defaultData] = data;

  const yScale = scaleLinear()
    .range(calculateRange(defaultData.data, height))
    .domain([
      Math.min(...filteredData, targetValue, 0),
      Math.max(...filteredData, targetValue, 0),
    ]);

  const targetLineYPosition = yScale(targetValue);

  const xScale = scaleBand()
    .range([offsetLeft, width - offsetRight])
    .paddingInner(BAR_PADDING)
    .domain(defaultData.data.map((_, index) => index.toString()));

  const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);
  const barGap = useMemo(
    () => xScale.step() * xScale.paddingInner() + STROKE_WIDTH,
    [xScale],
  );

  const strokeDashoffset =
    offsetLeft == null ? -(STROKE_WIDTH / 2) : -(STROKE_WIDTH / 2) - offsetLeft;
  const strokeDasharray = `${barWidth - STROKE_WIDTH} ${barGap}`;

  const getBarHeight = useCallback(
    (value: number) => {
      const height = Math.abs(yScale(value) - yScale(0));
      return Math.max(height, BAR_MIN_HEIGHT_RATIO * barWidth);
    },
    [barWidth, yScale],
  );

  const dataWithIndex = defaultData
    ? defaultData.data.map((value, index) => ({
        value,
        index,
      }))
    : [];

  const colorToUse = defaultData?.color ?? seriesColor;

  const color = isGradientType(colorToUse)
    ? colorToUse
    : [
        {
          color: colorToUse,
          offset: 0,
        },
      ];

  return {
    dataWithIndex,
    color,
    strokeDasharray,
    strokeDashoffset,
    barWidth,
    getBarHeight,
    xScale,
    yScale,
    targetLineYPosition,
    targetLineX1: 0 - offsetLeft,
    targetLineX2: width + offsetRight,
  };
}
