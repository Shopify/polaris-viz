import React from 'react';
import {mount} from '@shopify/react-testing';

import {LABEL_RADIUS} from '../../../constants';
import {YAxis} from '../YAxis';

const testTicks = [
  {value: 0, formattedValue: '0', yOffset: 0},
  {value: 1000, formattedValue: '1,000', yOffset: 50},
  {value: 2000, formattedValue: '2,000', yOffset: 100},
];

const mockProps = {
  ticks: testTicks,
  drawableWidth: 500,
  axisMargin: 70,
};

describe('<YAxis />', () => {
  it('draws a horizontal grid line for each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis {...mockProps} />
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
        <YAxis {...mockProps} />
      </svg>,
    );

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    const text = yAxis.findAll('text')!;
    const values = text.map((node) => node.prop('children'));
    expect(values).toStrictEqual(['0', '1,000', '2,000']);
  });

  describe('labelBackgroundColor', () => {
    it('does not render a background for the labels if labelBackgroundColor is not defined', () => {
      const yAxis = mount(
        <svg>
          <YAxis {...mockProps} />
        </svg>,
      );

      expect(yAxis).not.toContainReactComponent('path');
    });

    it('renders a background for the labels if labelBackgroundColor is defined', () => {
      const yAxis = mount(
        <svg>
          <YAxis {...mockProps} labelBackgroundColor="yellow" />
        </svg>,
      );

      expect(yAxis).toContainReactComponentTimes('rect', testTicks.length, {
        fill: 'yellow',
        width: 62,
        height: 20,
        rx: LABEL_RADIUS,
      });
    });
  });
});
