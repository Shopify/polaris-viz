import type {
  Color,
  Dimensions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';
import {useEffect, useRef} from 'react';
import type {
  ColorVisionInteractionMethods,
  MetaDataTrendIndicator,
} from 'types';

import {TrendIndicator} from '../../../../../TrendIndicator';
import {SquareColorPreview} from '../../../../../SquareColorPreview';

import styles from './LegendValueItem.scss';

interface Props {
  name: string;
  index: number;
  value?: string;
  trend?: MetaDataTrendIndicator;
  labelFormatter: LabelFormatter;
  longestLegendValueWidth: number;
  seriesColors: Color[];
  seriesNameFormatter: LabelFormatter;
  maxTrendIndicatorWidth: number;
  onDimensionChange: (dimensions: Dimensions) => void;
  getColorVisionStyles: ColorVisionInteractionMethods['getColorVisionStyles'];
  getColorVisionEventAttrs: ColorVisionInteractionMethods['getColorVisionEventAttrs'];
}

export function LegendValueItem({
  name,
  value,
  index,
  labelFormatter,
  longestLegendValueWidth,
  trend,
  seriesColors,
  seriesNameFormatter,
  maxTrendIndicatorWidth,
  onDimensionChange,
  getColorVisionStyles,
  getColorVisionEventAttrs,
}: Props) {
  const selectedTheme = useTheme();

  const ref = useRef<HTMLTableRowElement | null>(null);

  const minWidth = 200;

  useEffect(() => {
    if (onDimensionChange && ref.current != null) {
      const {width, height} = ref.current.getBoundingClientRect();
      onDimensionChange({width: Math.min(minWidth, Math.round(width)), height});
    }
  }, [onDimensionChange, ref, minWidth]);

  const valueExists = value !== null && value !== undefined;

  return (
    <tr
      ref={ref}
      key={name}
      style={{
        ...getColorVisionStyles(index),
      }}
      {...getColorVisionEventAttrs(index)}
    >
      <td className={styles.ColorPreview}>
        <SquareColorPreview color={seriesColors[index]} />
      </td>

      <td
        className={styles.Name}
        style={{
          color: selectedTheme.legend.labelColor,
        }}
        title={name}
      >
        <span>{seriesNameFormatter(name)}</span>
      </td>

      <td className={styles.alignRight} width={longestLegendValueWidth}>
        <span
          style={{
            color: selectedTheme.legend.labelColor,
          }}
        >
          {valueExists ? labelFormatter(value) : '-'}
        </span>
      </td>

      {trend && valueExists && (
        <td
          className={styles.alignLeft}
          width={maxTrendIndicatorWidth}
          style={{minWidth: maxTrendIndicatorWidth, paddingLeft: '4px'}}
        >
          <span>
            <TrendIndicator {...trend} />
          </span>
        </td>
      )}
    </tr>
  );
}
