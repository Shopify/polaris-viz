import React from 'react';
import {mount} from '@shopify/react-testing';
import {ChartContext} from '@shopify/polaris-viz-core';

export const mountWithChartContext = (
  child: React.ReactElement<any, any>,
  values?: {
    id: string | null;
  },
) => {
  return mount(
    <ChartContext.Provider value={values as any}>
      <React.Fragment>{child}</React.Fragment>
    </ChartContext.Provider>,
  );
};
