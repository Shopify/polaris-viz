import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';
import {BarData} from '../types';

const MAX_LABEL_SPACE = 15;

// temporary
function truncateString(str: string) {
  if (str.length > MAX_LABEL_SPACE) {
    let subStr = str.substring(0, MAX_LABEL_SPACE);
    return subStr + '...';
  } else {
    return str;
  }
}

export function useXScale({
  drawableWidth,
  histogram,
  data,
  dimensions,
}: {
  drawableWidth: number;
  histogram?: boolean;
  data: BarData[];
  dimensions: DOMRect;
}) {
  const xScale = scaleBand()
    .rangeRound([0, drawableWidth])
    .padding(histogram ? 0 : 0.1)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return data.map(({label, axisLabel}, index) => {
      const pointOffset = xScale(index.toString());
      const xOffset =
        pointOffset == null ? barWidthOffset : barWidthOffset + pointOffset;

      const labelToUse = axisLabel == null ? label : axisLabel;
      return {
        value: truncateString(labelToUse),
        xOffset,
      };
    });
  }, [dimensions, xScale, data]);

  //actually determine, or slant instead
  const linesOfText = 1;

  return {xScale, linesOfText, xAxisLabels};
}
