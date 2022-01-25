import React, {useState} from 'react';

import {useWatchColorBlindEvents, useTheme} from '../../hooks';
import type {Color} from '../../types';

import {DefaultRow, AnnotationRow} from './components';
import styles from './TooltipContent.scss';

export enum TooltipRowType {
  Default,
  Annotation,
}

export interface TooltipData {
  color: Color;
  label: string;
  value: string;
  type?: TooltipRowType;
  activeIndex?: number;
}

export interface TooltipContentProps {
  title?: string;
  data: TooltipData[];
  total?: null | {
    label: string;
    value: string;
  };
  theme?: string;
}

export function TooltipContent({
  title,
  data,
  total,
  theme,
}: TooltipContentProps) {
  const {tooltip} = useTheme(theme);

  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorBlindEvents({
    type: 'single-single',
    onIndexChange: ({detail}) => setActiveBarIndex(detail.index),
  });

  return (
    <div
      className={styles.Container}
      style={{
        background: tooltip.backgroundColor,
        color: tooltip.valueColor,
      }}
    >
      {title == null ? null : <div className={styles.Title}>{title}</div>}
      {data.map(
        ({color, label, value, type = TooltipRowType.Default}, index) => {
          switch (type) {
            default:
            case TooltipRowType.Default:
              return (
                <DefaultRow
                  color={color}
                  key={`${label}-${index}`}
                  label={label}
                  value={value}
                  isActive={activeBarIndex === -1 || index === activeBarIndex}
                />
              );
            case TooltipRowType.Annotation:
              return (
                <AnnotationRow
                  key={`${label}-${index}`}
                  label={label}
                  value={value}
                  theme={theme}
                />
              );
          }
        },
      )}
      {total == null ? null : (
        <div className={styles.Row}>
          <p className={styles.TotalLabel}>{total.label}</p>
          <p className={styles.Value}>{total.value}</p>
        </div>
      )}
    </div>
  );
}
