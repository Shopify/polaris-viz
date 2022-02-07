import React, {useState} from 'react';

import {COLOR_VISION_SINGLE_ITEM} from '../../constants';
import type {Color} from '../../types';
import {useTheme, useWatchColorVisionEvents} from '../../hooks';

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

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
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
                  isActive={activeBarIndex === -1 || index === activeBarIndex}
                  key={`${label}-${index}`}
                  label={label}
                  value={value}
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
