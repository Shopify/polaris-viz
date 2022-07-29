import type {DataGroup, InternalChartType} from '../types';
import {
  TOO_MANY_DATA_POINTS_THRESHOLD,
  TOO_MANY_DATA_SERIES_THRESHOLD,
} from '../constants';

import {isDataGroupArray} from './isDataGroup';
import {isDataSeriesArray} from './isDataSeries';

const hasTooManyDataPoints = (
  seriesArray: DataGroup['series'],
  threshold: number,
) => {
  return seriesArray.some((series) => {
    return series.data.length > threshold;
  });
};

export function isLargeDataSet(data, chartType?: InternalChartType) {
  let isLargeDataSet = false;

  if (chartType == null) {
    return false;
  }

  const thresholdForChart = TOO_MANY_DATA_POINTS_THRESHOLD[chartType];

  if (thresholdForChart == null) {
    return false;
  }

  if (isDataSeriesArray(data)) {
    isLargeDataSet = hasTooManyDataPoints(data, thresholdForChart);
  }

  if (isDataGroupArray(data)) {
    isLargeDataSet = data.some((dataGroup) => {
      return hasTooManyDataPoints(dataGroup.series, thresholdForChart);
    });
  }

  const hasManySeries = data.length > TOO_MANY_DATA_SERIES_THRESHOLD;

  return isLargeDataSet || hasManySeries;
}
