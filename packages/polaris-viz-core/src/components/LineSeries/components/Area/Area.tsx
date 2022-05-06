import React from 'react';

import type {LineChartDataSeriesWithDefaults, Color} from '../../../../types';
import {DefaultArea} from '../DefaultArea';
import {SparkArea} from '../SparkArea';

interface Props {
  series: LineChartDataSeriesWithDefaults;
  areaPath: string;
  type: 'default' | 'spark';
  sparkArea?: Color | null;
}

export function Area({areaPath, series, type, sparkArea}: Props) {
  if (series.isComparison === true) {
    return null;
  }

  switch (type) {
    case 'spark':
      return (
        <SparkArea color={sparkArea || series.color!} areaPath={areaPath} />
      );
    default:
    case 'default':
      return <DefaultArea series={series} areaPath={areaPath} />;
  }
}
