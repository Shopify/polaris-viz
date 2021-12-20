import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';

import type {DataSeries} from '../../../types';
import {Chart} from '../Chart';
import {Bar} from '../components';

const sampleData: DataSeries = {
  data: [
    {key: 1, value: 100},
    {key: 2, value: 200},
    {key: 3, value: 300},
    {key: 4, value: 500},
  ],
};

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.paddingInner = (paddingInner: any) =>
      paddingInner ? scale : paddingInner;
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.bandwidth = (width: any) => (width ? scale : width);
    scale.step = (step: any) => (step ? scale : step);
    return scale;
  }),
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    return scale;
  }),
}));

describe('<Chart/>', () => {
  it('reduces the chart width according to the offset and margin', () => {
    let rangeSpy = jest.fn();
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      rangeSpy = jest.fn((range: any) => (range ? scale : range));
      scale.range = rangeSpy;
      scale.paddingInner = (paddingInner: any) =>
        paddingInner ? scale : paddingInner;
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.bandwidth = (width: any) => (width ? scale : width);
      scale.step = (step: any) => (step ? scale : step);
      return scale;
    });

    const offsetLeft = 100;
    const offsetRight = 50;
    const mockWidth = 0;

    mount(
      <Chart
        data={[sampleData]}
        dataOffsetLeft={offsetLeft}
        dataOffsetRight={offsetRight}
      />,
    );

    expect(rangeSpy).toHaveBeenCalledWith([
      offsetLeft,
      mockWidth - offsetRight,
    ]);
  });

  describe('data', () => {
    it('renders a single non-comparison chart', () => {
      const chart = mount(<Chart data={[sampleData]} />);

      expect(chart).toContainReactComponentTimes(Bar, 4);
    });

    it('renders a single comparison chart', () => {
      const chart = mount(
        <Chart
          data={[
            {
              data: [
                {key: 1, value: 200},
                {key: 2, value: 200},
                {key: 3, value: 200},
                {key: 4, value: 200},
              ],
              isComparison: true,
            },
          ]}
        />,
      );

      const line = chart.find('path');

      expect(line).not.toBeNull();
    });

    it('renders a chart with 2 data sets', () => {
      const chart = mount(
        <Chart
          data={[
            sampleData,
            {
              data: [
                {key: 1, value: 200},
                {key: 2, value: 200},
                {key: 3, value: 200},
                {key: 4, value: 200},
              ],
              isComparison: true,
            },
          ]}
        />,
      );

      const line = chart.find('path');

      expect(line).not.toBeNull();
      expect(chart).toContainReactComponentTimes(Bar, 4);
    });
  });
});
