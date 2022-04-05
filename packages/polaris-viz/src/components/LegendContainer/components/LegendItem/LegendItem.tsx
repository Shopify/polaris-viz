import React from 'react';

import {ShapePreview} from '../../../shared/ShapePreview';
import type {LegendData} from '../../types';
import {
  getColorVisionEventAttrs,
  getOpacityStylesForActive,
  useTheme,
} from '../../../../hooks';

import style from './LegendItem.scss';

export interface LegendItemProps {
  index: number;
  legend: LegendData;
  activeIndex?: number;
  colorVisionType?: string;
  theme?: string;
}

export function LegendItem({
  activeIndex = -1,
  colorVisionType,
  index,
  legend,
  theme,
}: LegendItemProps) {
  const selectedTheme = useTheme(theme);

  const colorBlindAttrs =
    colorVisionType == null
      ? {}
      : getColorVisionEventAttrs({
          type: colorVisionType,
          index,
        });

  return (
    <button
      {...colorBlindAttrs}
      style={{
        background: selectedTheme.tooltip.backgroundColor,
        ...getOpacityStylesForActive({
          activeIndex,
          index,
        }),
      }}
      className={style.Legend}
    >
      <ShapePreview
        shape={legend.iconType === 'line' ? 'Line' : 'Bar'}
        color={legend.color}
        isComparison={legend.isComparison}
      />
      <span style={{color: selectedTheme.tooltip.textColor}}>
        {legend.name}
      </span>
    </button>
  );
}
