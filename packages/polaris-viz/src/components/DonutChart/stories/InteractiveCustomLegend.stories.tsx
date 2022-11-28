import React from 'react';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_THEME} from '../../../constants';
import type {DonutChartProps} from '../../DonutChart';
import {SquareColorPreview} from '../../SquareColorPreview';

import {Template} from './data';

const DATA = [
  {
    name: 'Shopify Payments',
    data: [{key: 'april - march', value: 50000}],
  },
  {
    name: 'Paypal',
    data: [{key: 'april - march', value: 25000}],
  },
  {
    name: 'Other',
    data: [{key: 'april - march', value: 10000}],
  },
  {
    name: 'Amazon Pay',
    data: [{key: 'april - march', value: 4000}],
  },
];

const liStyles = {
  alignItems: 'center',
  color: 'white',
  display: 'flex',
  fontWeight: 'bold',
  gap: 4,
  listStyleType: 'none',
};

export const InteractiveCustomLegend: Story<DonutChartProps> = Template.bind({});

InteractiveCustomLegend.args = {
  data: DATA,
  legendPosition: 'left',
  renderLegendContent: ({getColorVisionStyles, getColorVisionEventAttrs}) => (
    <ul>
      {DATA.map(({name}, index) => (
        <li
          key={name}
          style={{
            ...liStyles,
            ...getColorVisionStyles(index),
          }}
          {...getColorVisionEventAttrs(index)}
        >
          <SquareColorPreview
            color={DEFAULT_THEME.seriesColors.upToFour[index]}
          />
          {name}
        </li>
      ))}
    </ul>
  ),
};
