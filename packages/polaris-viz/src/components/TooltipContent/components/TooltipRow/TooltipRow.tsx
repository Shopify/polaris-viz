import {
  useTheme,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {Shape, Color} from '@shopify/polaris-viz-core';

import {PREVIEW_ICON_SIZE} from '../../../../constants';
import {SeriesIcon} from '../../../shared/SeriesIcon';
import {TITLE_MARGIN} from '../../constants';

import styles from './TooltipRow.scss';

interface Props {
  activeIndex: number;
  index: number;
  label: string;
  shape: Shape;
  value: string;
  color?: Color;
  isComparison?: boolean;
  isHidden?: boolean;
  renderSeriesIcon?: () => React.ReactNode;
}

export function TooltipRow({
  activeIndex,
  color,
  index,
  isComparison = false,
  isHidden = false,
  label,
  renderSeriesIcon,
  shape,
  value,
}: Props) {
  const selectedTheme = useTheme();

  if (isHidden) {
    return null;
  }

  return (
    <div
      className={styles.Row}
      style={getColorVisionStylesForActiveIndex({
        activeIndex,
        index,
      })}
    >
      {color != null && (
        <div style={{width: PREVIEW_ICON_SIZE}}>
          {renderSeriesIcon?.() ?? (
            <SeriesIcon
              color={color!}
              isComparison={isComparison}
              shape={shape}
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
    </div>
  );
}
