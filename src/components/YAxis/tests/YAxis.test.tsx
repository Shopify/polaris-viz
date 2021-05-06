import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis} from '../YAxis';

const testTicks = [
  {value: 0, formattedValue: '0', yOffset: 0},
  {value: 1000, formattedValue: '1,000', yOffset: 50},
  {value: 2000, formattedValue: '2,000', yOffset: 100},
];

describe('<YAxis />', () => {
  it('displays a formatted value with each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis ticks={testTicks} />
      </svg>,
    );

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    const text = yAxis.findAll('text')!;
    const values = text.map((node) => node.prop('children'));
    expect(values).toStrictEqual(['0', '1,000', '2,000']);
  });
});
