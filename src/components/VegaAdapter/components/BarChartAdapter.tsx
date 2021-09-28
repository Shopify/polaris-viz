import React from 'react';

import {BarChart, BarChartProps} from '../../';

import type {Data} from './types';

interface BarAxisEncoding {
  field: string;
}
interface BarEncoding {
  x: BarAxisEncoding;
  y: BarAxisEncoding;
}
export interface BarChartAdapterProps {
  data: Data;
  mark: 'bar';
  encoding: BarEncoding;
}

export function BarChartAdapter({data, encoding}: BarChartAdapterProps) {
  const barChartArgs: BarChartProps = {
    data: data.values.map((value: any) => {
      return {
        rawValue: value[encoding.y.field],
        label: value[encoding.x.field],
      };
    }),
  };
  return <BarChart {...barChartArgs} />;
}
