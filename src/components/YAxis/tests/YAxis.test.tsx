import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis} from '../YAxis';

const testTicks = [
  {value: 0, formattedValue: '0', yOffset: 0},
  {value: 1000, formattedValue: '1,000', yOffset: 50},
  {value: 2000, formattedValue: '2,000', yOffset: 100},
];

describe('<YAxis />', () => {
  it('draws a horizontal grid line for each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis ticks={testTicks} drawableWidth={500} />
      </svg>,
    );

    const lines = yAxis.findAll('line')!;

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    expect(lines).toHaveLength(3);
    lines.forEach((line) => {
      expect(line.prop('x2')).toStrictEqual(500);
    });
  });

  it('displays a formatted value with each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis ticks={testTicks} drawableWidth={500} />
      </svg>,
    );

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    const text = yAxis.findAll('text')!;
    const values = text.map((node) => node.prop('children'));
    expect(values).toStrictEqual(['0', '1,000', '2,000']);
  });

  it('offsets the gridlines by 0 if overflowStyle is true', () => {
    const yAxis = mount(
      <svg>
        <YAxis
          ticks={testTicks}
          drawableWidth={500}
          axisMargin={50}
          overflowStyle
        />
      </svg>,
    );

    expect(yAxis).toContainReactComponent('g', {
      transform: 'translate(0,100)',
    });
  });

  it('offsets the gridlines by the axis margin if overflowStyle is false', () => {
    const yAxis = mount(
      <svg>
        <YAxis
          ticks={testTicks}
          drawableWidth={500}
          axisMargin={50}
          overflowStyle={false}
        />
      </svg>,
    );

    expect(yAxis).toContainReactComponent('g', {
      transform: 'translate(50,100)',
    });
  });
});
