import React from 'react';
import type {SpringValue} from '@react-spring/core';

import type {LineChartDataSeriesWithDefaults} from '../../../../types';
import {DefaultArea} from '../DefaultArea';
import {SparkArea} from '../SparkArea';

interface Props {
  series: LineChartDataSeriesWithDefaults;
  areaPath: SpringValue<string | null> | string;
  type: 'default' | 'spark';
}

export function Area({areaPath, series, type}: Props) {
  if (series.isComparison === true) {
    return null;
  }

  switch (type) {
    case 'spark':
      return <SparkArea color={series.color!} areaPath={areaPath} />;
    default:
    case 'default':
      return <DefaultArea series={series} areaPath={areaPath} />;
  }
}
