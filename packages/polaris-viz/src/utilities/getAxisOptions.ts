import {removeFalsyValues} from '@shopify/polaris-viz-core';
import type {XAxisOptions, YAxisOptions} from '@shopify/polaris-viz-core';

export function getYAxisOptionsWithDefaults(
  yAxisOptions: Partial<YAxisOptions> = {},
): Required<YAxisOptions> {
  const yAxisOptionsFiltered = removeFalsyValues(yAxisOptions);

  return {
    labelFormatter: (value: number) => `${value}`,
    integersOnly: false,
    fixedWidth: false,
    maxYOverride: null,
    ticksOverride: null,
    ...yAxisOptionsFiltered,
  };
}

export function getXAxisOptionsWithDefaults(
  xAxisOptions: Partial<XAxisOptions> = {},
): Required<XAxisOptions> {
  const xAxisOptionsFiltered = removeFalsyValues(xAxisOptions);

  return {
    labelFormatter: (value: number) => `${value}`,
    hide: false,
    allowLineWrap: true,
    ...xAxisOptionsFiltered,
  };
}
