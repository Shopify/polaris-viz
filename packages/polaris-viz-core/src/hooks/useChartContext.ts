import {useContext} from 'react';

import {ChartContext} from '../contexts';
import type {ChartContextValues} from '../contexts';

export function useChartContext(): ChartContextValues {
  const ChartContextValues = useContext(ChartContext);
  if (!ChartContextValues) {
    throw new Error('ChartContext is not defined');
  }
  return ChartContextValues;
}
