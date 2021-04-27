import React from 'react';

import {Annotation} from '../../types';

import styles from './TooltipContent.scss';

export interface TooltipContentProps {
  label: string;
  value: string;
  annotation?: Annotation;
}

export function TooltipContent({
  label,
  value,
  annotation,
}: TooltipContentProps) {
  return (
    <div className={styles.Container}>
      {annotation != null && annotation.tooltipData != null ? (
        <React.Fragment>
          <strong>{annotation.tooltipData.label}</strong>
          {annotation.tooltipData.value}
        </React.Fragment>
      ) : null}
      <strong>{label}</strong>
      {value}
    </div>
  );
}
