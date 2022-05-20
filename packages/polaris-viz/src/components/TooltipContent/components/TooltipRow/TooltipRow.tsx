import React from 'react';
import {
  Color,
  useTheme,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {Shape} from '@shopify/polaris-viz-core';

import {SeriesIcon} from '../../../shared/SeriesIcon';
import {classNames} from '../../../../utilities';
import {TITLE_MARGIN} from '../../constants';
import tooltipContentStyles from '../../TooltipContent.scss';

import styles from './TooltipRow.scss';

interface Props {
  activeIndex: number;
  index: number;
  label: string;
  shape: Shape;
  value: string;
  color?: Color;
  isComparison?: boolean;
  theme: string;
}

export function TooltipRow({
  activeIndex,
  color,
  index,
  isComparison = false,
  label,
  shape,
  theme,
  value,
}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <div
      className={classNames(tooltipContentStyles.Row, styles.Row)}
      style={getColorVisionStylesForActiveIndex({
        activeIndex,
        index,
      })}
    >
      {color != null && (
        <div style={{marginRight: 4}}>
          <SeriesIcon
            color={color!}
            isComparison={isComparison}
            shape={shape}
            theme={theme}
          />
        </div>
      )}
      <span
        className={tooltipContentStyles.Truncate}
        style={{
          color: selectedTheme.tooltip.textColor,
          marginRight: TITLE_MARGIN,
        }}
      >
        {label}
      </span>
      <span
        className={tooltipContentStyles.Value}
        style={{
          color: selectedTheme.tooltip.textColor,
        }}
      >
        {value}
      </span>
    </div>
  );
}
