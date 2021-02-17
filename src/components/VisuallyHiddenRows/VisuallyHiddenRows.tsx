import React from 'react';

import {
  NumberLabelFormatter,
  DataSeries,
  NullableData,
  Data,
} from '../../types';

import styles from './VisuallyHiddenRows.scss';

interface Props {
  series: DataSeries<Data | NullableData>[];
  xAxisLabels: string[];
  formatYAxisLabel: NumberLabelFormatter;
}

export function VisuallyHiddenRows({
  series,
  xAxisLabels,
  formatYAxisLabel,
}: Props) {
  return (
    <React.Fragment>
      <g role="row">
        <text role="rowheader" />
        {xAxisLabels.map((xAxisLabel) => {
          return (
            <text
              className={styles.VisuallyHidden}
              key={`a11y-${xAxisLabel}`}
              role="columnheader"
            >
              {xAxisLabel}
            </text>
          );
        })}
      </g>
      {series.map(({name, data}, index) => {
        return (
          <g role="row" key={`row-${name}-${index}`}>
            <text role="rowheader" className={styles.VisuallyHidden}>
              {name}
            </text>
            {data.map(({rawValue, label}) => {
              return (
                <text
                  key={`cell-${name}-${rawValue}-${label}`}
                  role="cell"
                  className={styles.VisuallyHidden}
                >
                  {rawValue == null ? '' : formatYAxisLabel(rawValue)}
                </text>
              );
            })}
          </g>
        );
      })}
    </React.Fragment>
  );
}
