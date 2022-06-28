import React from 'react';
import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';

import {PREVIEW_ICON_SIZE} from '../../../../constants';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import type {LegendData} from '../../../../types';
import {useTheme} from '../../../../hooks';

import style from './LegendItem.scss';

export interface LegendItemProps {
  index: number;
  legend: LegendData;
  activeIndex?: number;
  colorVisionType?: string;
  theme: string;
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
        background: selectedTheme.legend.backgroundColor,
        ...getColorVisionStylesForActiveIndex({
          activeIndex,
          index,
        }),
      }}
      className={style.Legend}
    >
      <span
        style={{height: PREVIEW_ICON_SIZE, width: PREVIEW_ICON_SIZE}}
        className={style.IconContainer}
      >
        <SeriesIcon
          shape={legend.shape}
          color={legend.color}
          isComparison={legend.isComparison}
          theme={theme}
        />
      </span>
      <span className={style.TextContainer}>
        <span style={{color: selectedTheme.legend.labelColor}}>
          {legend.name}
        </span>
        {legend.value == null ? null : (
          <span style={{color: selectedTheme.legend.valueColor}}>
            {legend.value}
          </span>
        )}
      </span>
    </button>
  );
}
