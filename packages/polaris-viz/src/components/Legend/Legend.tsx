import {Fragment, useCallback} from 'react';
import type {RefObject} from 'react';
import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {useExternalHideEvents} from '../../hooks';
import type {LegendData} from '../../types';

import {LegendItem} from './components';
import type {LegendItemDimension} from './components';

export interface LegendProps {
  data: LegendData[];
  activeIndex?: number;
  colorVisionType?: string;
  theme?: string;
  itemDimensions?: RefObject<LegendItemDimension[]>;
  backgroundColor?: string;
  indexOffset?: number;
  truncate?: boolean;
  showLegendValues?: boolean;
  seriesNameFormatter?: LabelFormatter;
}

export function Legend({
  activeIndex = -1,
  colorVisionType,
  data,
  theme = DEFAULT_THEME_NAME,
  itemDimensions,
  indexOffset = 0,
  backgroundColor,
  truncate = false,
  showLegendValues = false,
  seriesNameFormatter,
}: LegendProps) {
  const {hiddenIndexes} = useExternalHideEvents();

  const onDimensionChange = useCallback(
    (index, dimensions: LegendItemDimension) => {
      if (itemDimensions?.current) {
        itemDimensions.current[index] = dimensions;
      }
    },
    [itemDimensions],
  );

  const items = data.map((legend, index) => {
    if (hiddenIndexes.includes(index) || legend.isHidden === true) {
      return null;
    }

    return (
      <LegendItem
        key={index}
        {...legend}
        activeIndex={activeIndex}
        colorVisionType={colorVisionType}
        index={index + indexOffset}
        theme={theme}
        backgroundColor={backgroundColor}
        onDimensionChange={onDimensionChange}
        truncate={truncate}
        showLegendValues={showLegendValues}
        seriesNameFormatter={seriesNameFormatter}
        lineStyle={legend?.lineStyle}
      />
    );
  });

  return <Fragment>{items}</Fragment>;
}
