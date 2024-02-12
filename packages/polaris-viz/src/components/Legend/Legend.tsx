import {Fragment} from 'react';
import type {RefObject} from 'react';
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
}: LegendProps) {
  const {hiddenIndexes} = useExternalHideEvents();

  const items = data.map((legend, index) => {
    if (hiddenIndexes.includes(index)) {
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
        onDimensionChange={(dimensions) => {
          if (itemDimensions?.current) {
            itemDimensions.current[index + indexOffset] = dimensions;
          }
        }}
        truncate={truncate}
        showLegendValues={showLegendValues}
      />
    );
  });

  return <Fragment>{items}</Fragment>;
}
