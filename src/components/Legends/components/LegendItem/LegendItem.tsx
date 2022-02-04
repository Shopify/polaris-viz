import React from 'react';

import {
  getColorBlindEventAttrs,
  getOpacityForActive,
  useTheme,
} from '../../../../hooks';
import type {Color} from '../../../../types';
import {SquareColorPreview} from '../../..';

import style from './LegendItem.scss';

export interface LegendItemProps {
  activeIndex: number;
  colorBlindType: string;
  index: number;
  legend: {name: string; color: Color};
}

export function LegendItem({
  activeIndex,
  colorBlindType,
  legend,
  index,
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
        opacity: getOpacityForActive(activeIndex, index),
      }}
      className={style.Legend}
      aria-hidden="true"
    >
      <SquareColorPreview color={legend.color} />
      <span style={{color: theme.tooltip.labelColor}}>{legend.name}</span>
    </button>
  );
}
