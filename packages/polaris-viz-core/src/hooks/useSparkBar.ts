import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {useCallback, useMemo} from 'react';

import {isGradientType} from '../utilities';
import type {Color, DataPoint, DataSeries} from '../types';

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
  dataOffsetLeft,
  dataOffsetRight,
  width,
  seriesColor,
}: {
  data: DataSeries[];
  height: number;
  dataOffsetLeft: number;
  dataOffsetRight: number;
  width: number;
  seriesColor: Color;
}) {
  const [defaultData, comparisonData] = useMemo(() => {
    const defaultData = data.find(({isComparison}) => isComparison !== true);
    const comparisonData = data.find(({isComparison}) => isComparison === true);

    return [defaultData, comparisonData];
  }, [data]);

  const dataForChart = defaultData ?? comparisonData ?? {data: []};

  const filteredData = removeNullValues(defaultData);
  const filteredComparisonData = removeNullValues(comparisonData);

  const yScale = scaleLinear()
    .range(calculateRange(dataForChart.data, height))
    .domain([
      Math.min(...filteredData, ...filteredComparisonData, 0),
      Math.max(...filteredData, ...filteredComparisonData, 0),
    ]);

  const xScale = scaleBand()
    .range([dataOffsetLeft, width - dataOffsetRight])
    .paddingInner(BAR_PADDING)
    .domain(dataForChart.data.map((_, index) => index.toString()));

  const xScaleLinear = scaleLinear()
    .range([0, width])
    .domain([0, dataForChart.data.length - 1]);

  const lineGenerator = line<any>()
    .x(({key}) => xScaleLinear(key))
    .y(({value}) => yScale(value));

  const lineShape = comparisonData ? lineGenerator(comparisonData.data) : null;

  const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);
  const barGap = useMemo(
    () => xScale.step() * xScale.paddingInner() + STROKE_WIDTH,
    [xScale],
  );

  const strokeDashoffset =
    dataOffsetLeft == null
      ? -(STROKE_WIDTH / 2)
      : -(STROKE_WIDTH / 2) - dataOffsetLeft;
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

  const radius = Math.floor(barWidth / 2);
  const borderRadius = `${radius} ${radius} 0 0`;

  return {
    dataWithIndex,
    color,
    strokeDasharray,
    strokeDashoffset,
    comparisonData,
    barWidth,
    lineShape,
    getBarHeight,
    xScale,
    yScale,
    borderRadius,
  };
}
