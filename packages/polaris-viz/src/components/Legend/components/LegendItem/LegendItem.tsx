import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';

import {
  LEGEND_ITEM_LEFT_PADDING,
  LEGEND_ITEM_RIGHT_PADDING,
  LEGEND_ITEM_GAP,
} from '../../constants';
import {PREVIEW_ICON_SIZE} from '../../../../constants';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import type {LegendData} from '../../../../types';
import {useTheme} from '../../../../hooks';

import style from './LegendItem.scss';

export interface LegendItemProps extends LegendData {
  index: number;
  activeIndex?: number;
  colorVisionType?: string;
  theme?: string;
}

export function LegendItem({
  activeIndex = -1,
  color,
  colorVisionType,
  index,
  isComparison,
  name,
  shape,
  theme,
  value,
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
        paddingLeft: LEGEND_ITEM_LEFT_PADDING,
        paddingRight: LEGEND_ITEM_RIGHT_PADDING,
        gap: LEGEND_ITEM_GAP,
      }}
      className={style.Legend}
    >
      <span
        style={{height: PREVIEW_ICON_SIZE, width: PREVIEW_ICON_SIZE}}
        className={style.IconContainer}
      >
        <SeriesIcon shape={shape} color={color} isComparison={isComparison} />
      </span>
      <span className={style.TextContainer}>
        <span style={{color: selectedTheme.legend.labelColor}}>{name}</span>
        {value == null ? null : (
          <span style={{color: selectedTheme.legend.valueColor}}>{value}</span>
        )}
      </span>
    </button>
  );
}
