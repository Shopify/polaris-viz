import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {YAxis} from '../YAxis';

jest.mock('d3-scale', () => ({
  scaleLinear: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];
    scale.range = () => [0, 2];

    return scale;
  },
}));

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 160;
};

describe('<YAxis />', () => {
  it("provides a best estimate number of ticks to d3's ticks utility to choose the ideal number of ticks", () => {
    const yScale = scaleLinear();
    const ticksSpy = jest.spyOn(yScale, 'ticks');

    mount(
      <svg>
        <YAxis
          yScale={yScale}
          formatYAxisValue={(value) => value.toString()}
          dimensions={new DOMRect()}
        />
      </svg>,
    );

    expect(ticksSpy).toHaveBeenCalledWith(2);
  });

  it('draws a horizontal grid line for each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis
          yScale={scaleLinear()}
          formatYAxisValue={(value) => value.toString()}
          dimensions={new DOMRect()}
        />
      </svg>,
    );

    const lines = yAxis.findAll('line')!;

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    expect(lines).toHaveLength(3);
    lines.forEach((line) => {
      // 420 is the mocked width of 500 from above minus the left and right margins
      expect(line.prop('x2')).toStrictEqual('420');
    });
  });

  it('displays a formatted value with each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis
          yScale={scaleLinear()}
          formatYAxisValue={(value) => `formatted: ${value}`}
          dimensions={new DOMRect()}
        />
      </svg>,
    );

    // jsdom does not properly render SVG elements,
    // so we have to do these assertions manually
    const text = yAxis.findAll('text')!;
    const values = text.map((node) => node.prop('children'));
    expect(values).toStrictEqual([
      'formatted: 0',
      'formatted: 1',
      'formatted: 2',
    ]);
  });
});
