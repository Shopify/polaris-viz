import React from 'react';
import {mount} from '@shopify/react-testing';
import type {ChartContextValues} from 'components/ChartContainer/ChartContext';

import characterWidths from '../data/character-widths.json';
import {ChartContext} from '../components';

export const mountWithChartContext = (
  child: React.ReactElement<any, any>,
  values: Partial<ChartContextValues> = {
    id: null,
    characterWidths,
  },
) => {
  return mount(
    <ChartContext.Provider value={values as ChartContextValues}>
      <React.Fragment>{child}</React.Fragment>
    </ChartContext.Provider>,
  );
};
