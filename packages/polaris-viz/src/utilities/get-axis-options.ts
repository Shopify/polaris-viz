import type {XAxisOptions, YAxisOptions} from '@shopify/polaris-viz-core';

import {filterObject} from './filter-object';

export function getYAxisOptions(
  yAxisOptions: Partial<YAxisOptions> = {},
): Required<YAxisOptions> {
  const yAxisOptionsFiltered = filterObject(yAxisOptions);

  return {
    labelFormatter: (value: number) => `${value}`,
    integersOnly: false,
    ...yAxisOptionsFiltered,
  };
}

export function getXAxisOptions(
  xAxisOptions: Partial<XAxisOptions> = {},
): Required<XAxisOptions> {
  const xAxisOptionsFiltered = filterObject(xAxisOptions);

  return {
    labelFormatter: (value: number) => `${value}`,
    hide: false,
    ...xAxisOptionsFiltered,
  };
}
