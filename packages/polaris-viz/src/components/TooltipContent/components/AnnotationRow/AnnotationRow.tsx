import React from 'react';
import {
  useTheme,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';

import {classNames} from '../../../../utilities';
import {TITLE_MARGIN} from '../../constants';
import tooltipContentStyles from '../../TooltipContent.scss';

import styles from './AnnotationRow.scss';

interface Props {
  activeIndex: number;
  index: number;
  label: string;
  value: string;
  theme?: string;
}

export function AnnotationRow({
  activeIndex,
  index,
  label,
  value,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <div
      className={classNames(tooltipContentStyles.Row, styles.Row)}
      style={{
        ...getColorVisionStylesForActiveIndex({
          activeIndex,
          index,
        }),
        color: selectedTheme.tooltip.titleColor,
      }}
    >
      <span
        className={tooltipContentStyles.Truncate}
        style={{
          marginRight: TITLE_MARGIN,
        }}
      >
        {label}
      </span>
      <span className={tooltipContentStyles.Value}>{value}</span>
    </div>
  );
}
