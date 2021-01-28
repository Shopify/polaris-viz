import React from 'react';
import {Color} from 'types';

import {LineStyle} from '../../types';
import {LinePreview} from '../LinePreview';

import styles from './TooltipContent.scss';

interface TooltipData {
  name: string;
  point: {
    label: string;
    value: string;
  };
  color: Color;
  lineStyle: LineStyle;
}

export interface TooltipContentProps {
  data: TooltipData[];
  title?: string;
}

export function TooltipContent({data, title}: TooltipContentProps) {
  return (
    <div className={styles.Container}>
      {title == null ? null : <div className={styles.Title}>{title}</div>}
      {data.map(({name, point: {label, value}, color, lineStyle}) => {
        return (
          <React.Fragment key={name}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.Name}>{label}</p>
            <p className={styles.Value}>{value}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
