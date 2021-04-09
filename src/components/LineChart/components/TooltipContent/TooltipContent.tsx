import React from 'react';
import {Color, LineStyle} from 'types';

import {LinePreview} from '../../../LinePreview';

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
}

// const formatNumber = (number: number) =>
//   new Intl.NumberFormat('en-ca').format(number);

function formatNumber(val) {
  return '';
}

export function TooltipContent({data}: TooltipContentProps) {
  return (
    <div className={styles.Container}>
      {data.map(({name, point: {label, value}, color, lineStyle}, index) => {
        return (
          <React.Fragment key={`${name}-${index}`}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.Name}>
              {new Date(label)
                .toLocaleDateString('en-CA', {
                  day: 'numeric',
                  month: 'short',
                })
                .replace('.', '')}
            </p>
            <p className={styles.Value}>{formatNumber(parseInt(value, 1))}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
