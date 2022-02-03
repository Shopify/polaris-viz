import React from 'react';

import {
  getColorBlindEventAttrs,
  getOpacityForActive,
  useTheme,
} from '../../../../hooks';
import type {Color} from '../../../../types';
import {SquareColorPreview} from '../../../';

import style from './Legend.scss';

interface LegendProps {
  activeIndex: number;
  colorBlindType: string;
  index: number;
  legend: {name: string; color: Color};
}

export function Legend({
  activeIndex,
  colorBlindType,
  legend,
  index,
}: LegendProps) {
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
    >
      <SquareColorPreview color={legend.color} />
      <span style={{color: theme.tooltip.labelColor}}>{legend.name}</span>
    </button>
  );
}
