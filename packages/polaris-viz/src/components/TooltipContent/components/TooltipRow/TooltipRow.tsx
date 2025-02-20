import {useTheme} from '@shopify/polaris-viz-core';
import type {
  Shape,
  Color,
  TrendIndicator as TrendIndicatorType,
} from '@shopify/polaris-viz-core';

import {TrendIndicator} from '../../../TrendIndicator';
import {PREVIEW_ICON_SIZE} from '../../../../constants';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import {TITLE_MARGIN} from '../../constants';

import styles from './TooltipRow.scss';

export interface Props {
  label: string;
  shape: Shape;
  value: string;
  color?: Color;
  isComparison?: boolean;
  renderSeriesIcon?: () => React.ReactNode;
  trend?: TrendIndicatorType;
}

export function TooltipRow({
  color,
  isComparison = false,
  label,
  renderSeriesIcon,
  shape,
  trend,
  value,
}: Props) {
  const selectedTheme = useTheme();

  return (
    <div className={styles.Row}>
      {color != null && (
        <div style={{width: PREVIEW_ICON_SIZE}}>
          {renderSeriesIcon?.() ?? (
            <SeriesIcon
              color={color}
              shape={shape}
              lineStyle={isComparison ? 'dotted' : 'solid'}
            />
          )}
        </div>
      )}
      <span
        className={styles.Truncate}
        style={{
          color: selectedTheme.tooltip.textColor,
          marginRight: TITLE_MARGIN,
        }}
      >
        {label}
      </span>
      <span
        className={styles.Value}
        style={{
          color: selectedTheme.tooltip.textColor,
        }}
      >
        {value}
      </span>
      {trend != null && (
        <div className={styles.Trend}>
          <TrendIndicator {...trend} />
        </div>
      )}
    </div>
  );
}
