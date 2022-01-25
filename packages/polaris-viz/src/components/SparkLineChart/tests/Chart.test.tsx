import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {Chart} from '../Chart';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    return scale;
  }),
}));

describe('<Chart />', () => {
  it('reduces the series width according to the offset and margin', () => {
    let rangeSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      rangeSpy = jest.fn((range: any) => (range ? scale : range));
      scale.range = rangeSpy;
      scale.domain = (domain: any) => (domain ? scale : domain);
      return scale;
    });

    const offsetLeft = 100;
    const offsetRight = 50;
    const margin = 2;
    const mockWidth = 0;

    mount(
      <Chart
        data={[
          {
            data: [{key: 0, value: 100}],
          },
        ]}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
      />,
    );

    expect(rangeSpy).toHaveBeenCalledWith([
      offsetLeft + margin,
      mockWidth - offsetRight - margin,
    ]);
  });
});
