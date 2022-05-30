import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';
import React from 'react';

import type {LegendData} from '../../types';

import {LegendItem} from './components/';

export interface LegendProps {
  data: LegendData[];
  activeIndex?: number;
  colorVisionType?: string;
  theme?: string;
}

export function Legend({
  activeIndex = -1,
  colorVisionType,
  data,
  theme = DEFAULT_THEME_NAME,
}: LegendProps) {
  const items = data.map((legend, index) => {
    return (
      <LegendItem
        activeIndex={activeIndex}
        colorVisionType={colorVisionType}
        index={index}
        key={index}
        legend={legend}
        theme={theme}
      />
    );
  });

  return <React.Fragment>{items}</React.Fragment>;
}
