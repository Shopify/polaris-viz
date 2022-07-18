import type {DataGroup} from '../types';
import {
  TOO_MANY_DATA_POINTS_THRESHOLD,
  TOO_MANY_DATA_SERIES_THRESHOLD,
} from '../constants';

import {isDataGroupArray} from './isDataGroup';
import {isDataSeriesArray} from './isDataSeries';

const hasTooManyDataPoints = (seriesArray: DataGroup['series']) => {
  return seriesArray.some((series) => {
    return series.data.length > TOO_MANY_DATA_POINTS_THRESHOLD;
  });
};

export function isLargeDataSet(data) {
  let isLargeDataSet = false;

  if (isDataSeriesArray(data)) {
    isLargeDataSet = hasTooManyDataPoints(data);
  }

  if (isDataGroupArray(data)) {
    isLargeDataSet = data.some((dataGroup) => {
      return hasTooManyDataPoints(dataGroup.series);
    });
  }

  const hasManySeries = data.length > TOO_MANY_DATA_SERIES_THRESHOLD;

  return isLargeDataSet || hasManySeries;
}
