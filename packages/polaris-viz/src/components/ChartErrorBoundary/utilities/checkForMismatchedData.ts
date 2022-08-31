import type {DataGroup, DataSeries} from '@shopify/polaris-viz-core';
import {isDataGroupArray} from '@shopify/polaris-viz-core/src/utilities/isDataGroup';

export function checkForMismatchedData(data: DataSeries[] | DataGroup[]) {
  if (data == null || data.length === 0) {
    return;
  }

  if (isDataGroupArray(data)) {
    checkDataGroup(data as DataGroup[]);
  } else {
    checkDataSeries(data as DataSeries[]);
  }
}

function checkDataSeries(data: DataSeries[], type = 'DataSeries') {
  const firstSetLength = data[0].data.length;

  const hasMismatchedData = data.some(
    (series) => series.data.length !== firstSetLength,
  );

  if (hasMismatchedData) {
    // eslint-disable-next-line no-console
    console.warn(
      `The ${type}[] provided does not have equal series values.`,
      data,
    );

    return true;
  }
}

function checkDataGroup(group: DataGroup[]) {
  group.some(({series}) => checkDataSeries(series, 'DataGroup'));
}
