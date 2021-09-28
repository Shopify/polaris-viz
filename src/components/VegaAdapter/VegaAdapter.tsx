import React from 'react';

import {
  BarChartAdapter,
  BarChartAdapterProps,
} from './components/BarChartAdapter';
import {
  LineChartAdapter,
  LineChartAdapterProps,
} from './components/LineChartAdapter';

export type VegaAdapterProps = BarChartAdapterProps | LineChartAdapterProps;

export function VegaAdapter(props: VegaAdapterProps) {
  switch (props.mark) {
    case 'bar':
      return <BarChartAdapter {...(props as BarChartAdapterProps)} />;
      break;
    case 'line':
      return <LineChartAdapter {...(props as LineChartAdapterProps)} />;
      break;
  }
}
