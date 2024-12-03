import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';

import {getFontSize} from '../../../../utilities/getFontSize';
import {
  LEGEND_ITEM_LEFT_PADDING,
  LEGEND_ITEM_RIGHT_PADDING,
  LEGEND_ITEM_GAP,
} from '../../constants';
import {PREVIEW_ICON_SIZE} from '../../../../constants';
import {SeriesIcon} from '../../../shared/SeriesIcon/SeriesIcon';
import type {LegendData} from '../../../../types';

import style from './LegendItem.scss';

export interface LegendItemDimension {
  width: number;
  height: number;
}

export const MINIMUM_LEGEND_ITEM_WIDTH = 100;

export interface LegendItemProps extends LegendData {
  index: number;
  activeIndex?: number;
  colorVisionType?: string;
  renderSeriesIcon?: () => ReactNode;
  theme?: string;
  onDimensionChange?: (
    index: number,
    {width, height}: LegendItemDimension,
  ) => void;
  backgroundColor?: string;
  truncate?: boolean;
  showLegendValues?: boolean;
  seriesNameFormatter?: LabelFormatter;
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
  seriesNameFormatter = (value) => `${value}`,
}: LegendItemProps) {
  const selectedTheme = useTheme(theme);
  const ref = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState(0);

  const fontSize = getFontSize();

  const renderLegendValues = showLegendValues && value != null;

  useEffect(() => {
    if (onDimensionChange && ref.current != null) {
      const {width, height} = ref.current.getBoundingClientRect();
      setWidth(width);
      onDimensionChange(index, {
        width: Math.min(MINIMUM_LEGEND_ITEM_WIDTH, Math.round(width)),
        height,
      });
    }
  }, [onDimensionChange, ref, index]);

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
        background: background ?? 'none',
        ...getColorVisionStylesForActiveIndex({
          activeIndex,
          index,
        }),
        paddingLeft: background ? LEGEND_ITEM_LEFT_PADDING : 0,
        paddingRight: background
          ? LEGEND_ITEM_RIGHT_PADDING
          : LEGEND_ITEM_LEFT_PADDING,

        gap: LEGEND_ITEM_GAP,
        // if there is overflow, add a max width and truncate with ellipsis
        maxWidth: truncate ? MINIMUM_LEGEND_ITEM_WIDTH : '100%',
        // if the item width is already less than MINIMUM_LEGEND_ITEM_WIDTH, don't set a minWidth
        minWidth:
          width < MINIMUM_LEGEND_ITEM_WIDTH
            ? undefined
            : MINIMUM_LEGEND_ITEM_WIDTH,
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
      <span
        className={style.TextContainer}
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        <span
          className={style.Text}
          style={{
            color: selectedTheme.legend.labelColor,
          }}
        >
          {seriesNameFormatter(name)}
        </span>
        {renderLegendValues ? (
          <span
            className={style.Text}
            style={{color: selectedTheme.legend.valueColor}}
          >
            {value}
          </span>
        ) : null}
      </span>
    </button>
  );
}
