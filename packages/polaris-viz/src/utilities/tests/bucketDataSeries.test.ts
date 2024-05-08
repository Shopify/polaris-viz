import type {DataSeries} from '@shopify/polaris-viz-core';

import {bucketDataSeries} from '../bucketDataSeries';

describe('bucketDataSeries', () => {
  it('returns the data series if the series length is less than or equal to the max series', () => {
    const dataSeries: DataSeries[] = [
      {name: 'series1', data: [{key: 'key1', value: 1}]},
      {name: 'series2', data: [{key: 'key1', value: 2}]},
    ];
    const maxSeries = 3;
    const result = bucketDataSeries({dataSeries, maxSeries});
    expect(result).toStrictEqual(dataSeries);
  });

  it('returns the data series if the max series is less than or equal to 0', () => {
    const dataSeries: DataSeries[] = [
      {name: 'series1', data: [{key: 'key1', value: 1}]},
      {name: 'series2', data: [{key: 'key1', value: 2}]},
    ];
    const maxSeries = 0;
    const result = bucketDataSeries({dataSeries, maxSeries});
    expect(result).toStrictEqual(dataSeries);
  });

  it('buckets all data series after the max series count into a `Other` group', () => {
    const dataSeries: DataSeries[] = [
      {
        name: 'series1',
        data: [
          {key: 'key1', value: 1},
          {key: 'key2', value: 2},
        ],
      },
      {
        name: 'series2',
        data: [
          {key: 'key1', value: 2},
          {key: 'key2', value: 4},
        ],
      },
      {
        name: 'series3',
        data: [
          {key: 'key1', value: 4},
          {key: 'key2', value: 8},
        ],
      },
      {
        name: 'series4',
        data: [
          {key: 'key1', value: 8},
          {key: 'key2', value: 16},
        ],
      },
    ];
    const maxSeries = 2;
    const result = bucketDataSeries({dataSeries, maxSeries});
    expect(result).toStrictEqual([
      ...dataSeries.slice(0, maxSeries),
      {
        name: 'Other',
        data: [
          {key: 'key1', value: 12},
          {key: 'key2', value: 24},
        ],
      },
    ]);
  });

  it('uses the provided renderBucketLegendLabel function to name the `Other` group', () => {
    const dataSeries: DataSeries[] = [
      {name: 'series1', data: [{key: 'key1', value: 1}]},
      {name: 'series2', data: [{key: 'key1', value: 2}]},
    ];
    const maxSeries = 1;
    const renderBucketLegendLabel = () => 'Custom Other';
    const result = bucketDataSeries({
      dataSeries,
      maxSeries,
      renderBucketLegendLabel,
    });
    expect(result).toStrictEqual([
      ...dataSeries.slice(0, maxSeries),
      {
        name: 'Custom Other',
        data: [{key: 'key1', value: 2}],
      },
    ]);
  });
});
