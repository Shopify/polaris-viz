import type {DataSeries} from '../types';

export function isDataSeries(object: any): object is DataSeries {
  if (object.data && object.data.length > 0) {
    const [dataPoint] = object.data;

    return (
      Object.prototype.hasOwnProperty.call(dataPoint, 'value') &&
      Object.prototype.hasOwnProperty.call(dataPoint, 'key')
    );
  }
  return false;
}

export function isDataSeriesArray(array: any[]): array is DataSeries[] {
  if (array.length > 0) {
    const [series] = array;
    return isDataSeries(series);
  }
  return false;
}
