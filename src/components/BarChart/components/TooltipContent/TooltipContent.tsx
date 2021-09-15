import React from 'react';

import {useTheme} from 'hooks';
import type {Annotation} from 'components/BarChart/types';

import styles from 'components/BarChart/components/TooltipContent/TooltipContent.scss';

export interface TooltipContentProps {
  label: string;
  value: string;
  annotation?: Annotation;
  theme?: string;
}

export function TooltipContent({
  label,
  value,
  annotation,
  theme,
}: TooltipContentProps) {
  const {tooltip} = useTheme(theme);

  return (
    <div
      className={styles.Container}
      style={{
        background: tooltip.backgroundColor,
        color: tooltip.labelColor,
      }}
    >
      {annotation != null && annotation.tooltipData != null ? (
        <React.Fragment>
          {annotation.tooltipData.label}
          <strong
            style={{
              color: tooltip.valueColor,
            }}
          >
            {annotation.tooltipData.value}
          </strong>
        </React.Fragment>
      ) : null}
      {label}
      <strong
        style={{
          color: tooltip.valueColor,
        }}
      >
        {value}
      </strong>
    </div>
  );
}
