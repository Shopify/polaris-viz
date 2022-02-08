import React from 'react';

import type {LegendData} from '../../types';
import {
  getColorVisionEventAttrs,
  getOpacityStylesForActive,
  useTheme,
} from '../../../../hooks';
import {LinePreview, SquareColorPreview} from '../../..';

import style from './LegendItem.scss';

export interface LegendItemProps {
  index: number;
  legend: LegendData;
  activeIndex?: number;
  colorVisionType?: string;
  theme?: string;
}

function getIcon(legend: LegendData) {
  switch (legend.iconType) {
    case 'line': {
      const style = legend.isComparison ? 'dotted' : 'solid';
      return <LinePreview color={legend.color} lineStyle={style} />;
    }
    case 'solid':
    default:
      return <SquareColorPreview color={legend.color} />;
  }
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
      aria-hidden="true"
    >
      {getIcon(legend)}
      <span style={{color: selectedTheme.tooltip.labelColor}}>
        {legend.name}
      </span>
    </button>
  );
}
