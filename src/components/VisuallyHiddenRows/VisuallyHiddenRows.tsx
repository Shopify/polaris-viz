import React from 'react';

import type {
  NumberLabelFormatter,
  DataSeries,
  NullableData,
  Data,
  Color,
} from '../../types';

interface Props {
  series: DataSeries<Data | NullableData, Color>[];
  xAxisLabels: string[];
  formatYAxisLabel: NumberLabelFormatter;
}

export const VisuallyHiddenRows = React.memo(function Rows({
  series,
  xAxisLabels,
  formatYAxisLabel,
}: Props) {
  return (
    <React.Fragment>
      <g role="row">
        <text role="rowheader" />
        {xAxisLabels.map((xAxisLabel, index) => {
          return (
            <text
              className="visually-hidden"
              key={`a11y-${xAxisLabel}-${index}`}
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
            <text role="rowheader" className="visually-hidden">
              {name}
            </text>
            {data.map(({rawValue, label}, index) => {
              return (
                <text
                  key={`cell-${name}-${rawValue}-${label}-${index}`}
                  role="cell"
                  className="visually-hidden"
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
});
