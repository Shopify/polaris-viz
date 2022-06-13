import {useMemo, useState} from 'react';
import type {Color, Dimensions, DataGroup} from '@shopify/polaris-viz-core';

import {DEFAULT_LEGEND_HEIGHT} from '../../../constants';
import type {LegendData} from '../../../types';

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
  data: DataGroup[];
  colors?: Color[];
  dimensions?: Dimensions;
}

export function useLegend({
  colors = [],
  data,
  dimensions = {height: 0, width: 0},
  showLegend,
}: Props) {
  const [legendHeight, setLegendHeight] = useState(
    showLegend ? DEFAULT_LEGEND_HEIGHT : 0,
  );

  const legend: LegendData[] = useMemo(() => {
    if (showLegend === false) {
      return [];
    }

    const legends = data.map(({series, shape}) => {
      return series.map(({name, color, isComparison}) => {
        return {
          name: name ?? '',
          color,
          shape,
          isComparison,
        };
      });
    });

    return legends.flat().map(({color, ...theRest}, index) => {
      return {
        ...theRest,
        color: color ?? colors[index],
      };
    });
  }, [colors, data, showLegend]);

  const {height, width} = useMemo(() => {
    if (showLegend === false) {
      return dimensions;
    }

    return getAlteredDimensions(dimensions, legendHeight);
  }, [showLegend, dimensions, legendHeight]);

  return {legend, setLegendHeight, height, width};
}
