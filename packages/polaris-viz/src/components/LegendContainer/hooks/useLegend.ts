import {useMemo, useState} from 'react';
import type {Color, DataSeries} from '@shopify/polaris-viz-core';

import {DEFAULT_LEGEND_HEIGHT} from '../../../constants';
import type {Dimensions} from '../../../types';
import type {LegendData, LegendIconType} from '../types';

function getAlteredDimensions(
  dimensions: Dimensions | undefined,
  legendsHeight: number,
) {
  const {width, height} = dimensions ?? {width: 0, height: 0};

  return {
    height: height - legendsHeight,
    width,
  };
}

export interface Props {
  showLegend: boolean;
  data: DataSeries[];
  colors?: Color[];
  dimensions?: Dimensions;
  type?: LegendIconType;
}

export function useLegend({
  colors = [],
  data,
  dimensions = {height: 0, width: 0},
  showLegend,
  type = 'solid',
}: Props) {
  const [legendHeight, setLegendHeight] = useState(
    showLegend ? DEFAULT_LEGEND_HEIGHT : 0,
  );

  const legend: LegendData[] = useMemo(() => {
    if (showLegend === false) {
      return [];
    }

    return data.map(({name, color, isComparison}, index) => ({
      name: name ?? '',
      color: color ?? colors[index],
      iconType: type,
      isComparison,
    }));
  }, [colors, data, showLegend, type]);

  const {height, width} = useMemo(() => {
    if (showLegend === false) {
      return dimensions;
    }

    return getAlteredDimensions(dimensions, legendHeight);
  }, [showLegend, dimensions, legendHeight]);

  return {legend, setLegendHeight, height, width};
}
