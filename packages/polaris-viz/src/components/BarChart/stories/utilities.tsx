import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {SquareColorPreview} from '../../SquareColorPreview';
import type {RenderTooltipContentData} from '../../../types';

export const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: (tooltipData: RenderTooltipContentData) => {
    return (
      <div
        style={{
          background: 'black',
          padding: '8px',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        {tooltipData.title}
        <div>
          {tooltipData.data[0].data.map(({key, value, color}) => (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '12px 1fr 1fr',
                gridGap: '5px',
                fontSize: '12px',
                marginTop: '4px',
              }}
              key={key}
            >
              <SquareColorPreview color={color!} />
              <div>{key}</div>
              <div style={{textAlign: 'right'}}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];
