import {useMemo, useState} from 'react';
import type {
  Color,
  DataGroup,
  Direction,
  LabelFormatter,
  BoundingRect,
} from '@shopify/polaris-viz-core';
import {LEGENDS_TOP_MARGIN, useChartContext} from '@shopify/polaris-viz-core';

import {DEFAULT_LEGEND_HEIGHT} from '../../../constants';
import type {LegendData} from '../../../types';

function getAlteredDimensions(
  containerBounds: BoundingRect,
  legendsHeight: number,
  legendsWidth: number,
  direction: Direction,
) {
  const {width, height} = containerBounds;
  const isHorizontal = direction === 'horizontal';

  return {
    height: isHorizontal ? height - legendsHeight - LEGENDS_TOP_MARGIN : height,
    width: !isHorizontal ? width - legendsWidth : width,
  };
}

export interface Props {
  showLegend: boolean;
  data: DataGroup[];
  seriesNameFormatter: LabelFormatter;
  colors?: Color[];
  direction?: Direction;
  maxWidth?: number;
}

export function useLegend({
  colors = [],
  data,
  showLegend,
  direction = 'horizontal',
  maxWidth = 0,
  seriesNameFormatter,
}: Props) {
  const {containerBounds, comparisonIndexes} = useChartContext();
  const defaultHeight = showLegend ? DEFAULT_LEGEND_HEIGHT : 0;

  const [legendDimensions, setLegendDimensions] = useState({
    height: defaultHeight,
    width: maxWidth,
  });

  const legend: LegendData[] = useMemo(() => {
    if (showLegend === false) {
      return [];
    }

    const legends = data.map(({series, shape}) => {
      return series.map(
        ({name, color, isComparison, data, metadata}, seriesIndex) => {
          return {
            isHidden: comparisonIndexes.includes(seriesIndex),
            name: seriesNameFormatter(name ?? ''),
            ...(data && {
              value: data
                .reduce(
                  (totalSum, current) => totalSum + (current.value || 0),
                  0,
                )
                .toString(),
            }),
            ...(metadata && {trend: metadata.trend}),
            color,
            shape,
            isComparison,
          };
        },
      );
    });

    return legends.flat().map(({color, ...rest}, index) => {
      return {
        ...rest,
        color: color ?? colors[index],
      };
    });
  }, [colors, data, seriesNameFormatter, showLegend, comparisonIndexes]);

  const {height, width} = useMemo(() => {
    if (showLegend === false) {
      return containerBounds;
    }

    return getAlteredDimensions(
      containerBounds,
      legendDimensions.height,
      legendDimensions.width,
      direction,
    );
  }, [
    showLegend,
    containerBounds,
    legendDimensions.height,
    legendDimensions.width,
    direction,
  ]);

  return {
    legend,
    height,
    width,
    setLegendDimensions,
  };
}
