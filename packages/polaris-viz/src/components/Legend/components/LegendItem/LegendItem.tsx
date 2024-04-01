import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';

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

export interface LegendItemDimension {
  width: number;
  height: number;
}

export const MINIMUM_LEGEND_ITEM_WIDTH = 100;
export const MINIMUM_LEGEND_ITEM_WITH_VALUE_WIDTH = 200;

export interface LegendItemProps extends LegendData {
  index: number;
  activeIndex?: number;
  colorVisionType?: string;
  renderSeriesIcon?: () => ReactNode;
  theme?: string;
  onDimensionChange?: ({width, height}: LegendItemDimension) => void;
  backgroundColor?: string;
  truncate?: boolean;
  showLegendValues?: boolean;
}

export function LegendItem({
  activeIndex = -1,
  color,
  colorVisionType,
  index,
  isComparison,
  name,
  renderSeriesIcon,
  shape,
  theme,
  value,
  onDimensionChange,
  backgroundColor,
  truncate = false,
  showLegendValues = false,
}: LegendItemProps) {
  const selectedTheme = useTheme(theme);
  const ref = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState(0);

  const minWidth =
    value != null
      ? MINIMUM_LEGEND_ITEM_WITH_VALUE_WIDTH
      : MINIMUM_LEGEND_ITEM_WIDTH;

  useEffect(() => {
    if (onDimensionChange && ref.current != null) {
      const {width, height} = ref.current.getBoundingClientRect();
      setWidth(width);
      onDimensionChange({width: Math.min(minWidth, Math.round(width)), height});
    }
  }, [onDimensionChange, ref, minWidth]);

  const colorBlindAttrs =
    colorVisionType == null
      ? {}
      : getColorVisionEventAttrs({
          type: colorVisionType,
          index,
        });

  const background = backgroundColor ?? selectedTheme.legend.backgroundColor;

  return (
    <button
      {...colorBlindAttrs}
      style={{
        background,
        ...getColorVisionStylesForActiveIndex({
          activeIndex,
          index,
        }),
        paddingLeft: LEGEND_ITEM_LEFT_PADDING,
        paddingRight: LEGEND_ITEM_RIGHT_PADDING,
        gap: LEGEND_ITEM_GAP,
        // if there is overflow, add a max width and truncate with ellipsis
        maxWidth: truncate ? minWidth : '100%',
        // if the item width is less than the minWidth, don't set a min width
        minWidth: width < minWidth ? undefined : minWidth,
      }}
      className={style.Legend}
      ref={ref}
      title={name}
    >
      {renderSeriesIcon == null ? (
        <span
          style={{height: PREVIEW_ICON_SIZE, width: PREVIEW_ICON_SIZE}}
          className={style.IconContainer}
        >
          <SeriesIcon shape={shape} color={color} isComparison={isComparison} />
        </span>
      ) : (
        renderSeriesIcon()
      )}
      <span className={style.TextContainer}>
        <span
          className={style.Text}
          style={{
            color: selectedTheme.legend.labelColor,
          }}
        >
          {name}
        </span>
        {!showLegendValues || value == null ? null : (
          <span
            className={style.Text}
            style={{color: selectedTheme.legend.valueColor}}
          >
            {value}
          </span>
        )}
      </span>
    </button>
  );
}
