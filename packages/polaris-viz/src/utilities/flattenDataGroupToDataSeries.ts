import type {DataGroup, DataSeries} from '@shopify/polaris-viz-core';

export function flattenDataGroupToDataSeries(data: DataGroup[]) {
  return data.reduce<DataSeries[]>((previous, {series}) => {
    return previous.concat(series);
  }, []);
}
