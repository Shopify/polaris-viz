import React from 'react';

import type {DataSeries, NumberLabelFormatter} from '../../types';

import styles from './VisuallyHiddenRows.scss';

export interface Props {
  data: DataSeries[];
  xAxisLabels: string[];
  formatYAxisLabel: NumberLabelFormatter;
}

export const VisuallyHiddenRows = React.memo(function Rows({
  data,
  formatYAxisLabel,
  xAxisLabels,
}: Props) {
  return (
    <React.Fragment>
      <g role="row">
        <text role="rowheader" />
        {xAxisLabels.map((xAxisLabel, index) => {
          return (
            <text
              className={styles.VisuallyHidden}
              key={`a11y-${xAxisLabel}-${index}`}
              role="columnheader"
            >
              {xAxisLabel}
            </text>
          );
        })}
      </g>
      {data.map(({name, data}, index) => {
        return (
          <g role="row" key={`row-${name}-${index}`}>
            <text role="rowheader" className={styles.VisuallyHidden}>
              {name}
            </text>
            {data.map(({value, key}, index) => {
              return (
                <text
                  key={`cell-${name}-${value}-${key}-${index}`}
                  role="cell"
                  className={styles.VisuallyHidden}
                >
                  {value == null ? '' : formatYAxisLabel(value)}
                </text>
              );
            })}
          </g>
        );
      })}
    </React.Fragment>
  );
});
