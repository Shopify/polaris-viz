import React from 'react';

import type {LegendData} from '../../types';
import {LegendItem} from '../LegendItem';

export interface LegendProps {
  data: LegendData[];
  activeIndex?: number;
  colorBlindType?: string;
  theme?: string;
}

export function Legend({
  activeIndex = -1,
  colorBlindType,
  data,
  theme,
}: LegendProps) {
  const items = data.map((legend, index) => {
    return (
      <LegendItem
        activeIndex={activeIndex}
        colorBlindType={colorBlindType}
        index={index}
        key={index}
        legend={legend}
        theme={theme}
      />
    );
  });

  return <React.Fragment>{items}</React.Fragment>;
}
