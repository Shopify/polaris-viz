import React from 'react';

import type {LineChartStyle} from '../../types';
import {LinePreview} from '../LinePreview';

import styles from './TooltipContent.scss';

interface TooltipData {
  name: string;
  point: {
    label: string;
    value: string;
  };
  style?: Partial<LineChartStyle>;
}

export interface TooltipContentProps {
  data: TooltipData[];
}

export function TooltipContent({data}: TooltipContentProps) {
  return (
    <div className={styles.Container}>
      {data.map(({name, point: {label, value}, style = {}}) => {
        const {color = 'colorPurple', lineStyle = 'solid'} = style;

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
