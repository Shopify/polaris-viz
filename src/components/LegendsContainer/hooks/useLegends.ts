import {useMemo, useState} from 'react';

import {DEFAULT_LEGENDS_HEIGHT} from '../../../constants';
import type {Color, DataSeries, Dimensions} from '../../../types';
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

export function useLegends({
  colors = [],
  data,
  dimensions = {height: 0, width: 0},
  showLegend,
  type = 'solid',
}: Props) {
  const [legendsHeight, setLegendsHeight] = useState(
    showLegend ? DEFAULT_LEGENDS_HEIGHT : 0,
  );

  const legends: LegendData[] = useMemo(() => {
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

    return getAlteredDimensions(dimensions, legendsHeight);
  }, [showLegend, dimensions, legendsHeight]);

  return {legends, setLegendsHeight, height, width};
}
