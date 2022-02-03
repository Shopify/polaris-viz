import React from 'react';

import type {LegendData} from '../../types';
import {
  getColorBlindEventAttrs,
  getOpacityForActive,
  useTheme,
} from '../../../../hooks';
import {LinePreview, SquareColorPreview} from '../../..';

import style from './LegendItem.scss';

export interface LegendItemProps {
  activeIndex: number;
  colorBlindType: string;
  index: number;
  legend: LegendData;
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
  activeIndex,
  colorBlindType,
  index,
  legend,
}: LegendItemProps) {
  const theme = useTheme();

  return (
    <button
      {...getColorBlindEventAttrs({
        type: colorBlindType,
        index,
      })}
      style={{
        background: theme.tooltip.backgroundColor,
        opacity: getOpacityForActive({
          activeIndex,
          index,
        }),
      }}
      className={style.Legend}
      aria-hidden="true"
    >
      {getIcon(legend)}
      <span style={{color: theme.tooltip.labelColor}}>{legend.name}</span>
    </button>
  );
}
