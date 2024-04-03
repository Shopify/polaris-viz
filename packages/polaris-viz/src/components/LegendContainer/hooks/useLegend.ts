import {useMemo, useState} from 'react';
import type {
  Color,
  Dimensions,
  DataGroup,
  Direction,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {LEGENDS_TOP_MARGIN} from '@shopify/polaris-viz-core';

import {DEFAULT_LEGEND_HEIGHT} from '../../../constants';
import type {LegendData} from '../../../types';

function getAlteredDimensions(
  dimensions: Dimensions | undefined,
  legendsHeight: number,
  legendsWidth: number,
  direction: Direction,
) {
  const {width, height} = dimensions ?? {width: 0, height: 0};
  const isHorizontal = direction === 'horizontal';

  return {
    height: isHorizontal ? height - legendsHeight - LEGENDS_TOP_MARGIN : height,
    width: !isHorizontal ? width - legendsWidth : width,
  };
}

export interface Props {
  showLegend: boolean;
  data: DataGroup[];
  colors?: Color[];
  dimensions?: Dimensions;
  direction?: Direction;
  maxWidth?: number;
  seriesNameFormatter?: LabelFormatter;
}

export function useLegend({
  colors = [],
  data,
  dimensions = {height: 0, width: 0},
  showLegend,
  direction = 'horizontal',
  maxWidth = 0,
  seriesNameFormatter = (value) => `${value}`,
}: Props) {
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
      return series.map(({name, color, isComparison, data, metadata}) => {
        return {
          name: seriesNameFormatter(name ?? ''),
          ...(data && {
            value: data
              .reduce((totalSum, current) => totalSum + (current.value || 0), 0)
              .toString(),
          }),
          ...(metadata && {trend: metadata.trend}),
          color,
          shape,
          isComparison,
        };
      });
    });

    return legends.flat().map(({color, ...rest}, index) => {
      return {
        ...rest,
        color: color ?? colors[index],
      };
    });
  }, [colors, data, seriesNameFormatter, showLegend]);

  const {height, width} = useMemo(() => {
    if (showLegend === false) {
      return dimensions;
    }

    return getAlteredDimensions(
      dimensions,
      legendDimensions.height,
      legendDimensions.width,
      direction,
    );
  }, [
    showLegend,
    dimensions,
    legendDimensions.height,
    legendDimensions.width,
    direction,
  ]);

  const hasValidDimensions =
    legendDimensions.height !== defaultHeight ||
    legendDimensions.width !== maxWidth;

  return {
    legend,
    height,
    width,
    setLegendDimensions,
    isLegendMounted: showLegend === false || hasValidDimensions,
  };
}
