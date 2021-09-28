import React from 'react';

import {LineChart, LineChartProps} from '../../';

import type {Data} from './types';

interface LineAxisEncoding {
  field: string;
}
interface LineEncoding {
  x: LineAxisEncoding;
  y: LineAxisEncoding;
}

export interface LineChartAdapterProps {
  data: Data;
  mark: 'line';
  encoding: LineEncoding;
}

export function LineChartAdapter({data, encoding}: LineChartAdapterProps) {
  const lineChartArgs: LineChartProps = {
    series: [
      {
        name: encoding.y.field,
        data: data.values.map((value: any) => {
          return {
            rawValue: value[encoding.y.field],
            label: value[encoding.x.field],
          };
        }),
      },
    ],
  };
  return <LineChart {...lineChartArgs} />;
}
