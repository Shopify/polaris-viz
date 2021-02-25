import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {Series} from '../../types';
import {useYScale} from '../use-y-scale';
import {DEFAULT_MAX_Y} from '../../../../constants';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.nice = () => scale;
    return scale;
  }),
}));

describe('useYScale', () => {
  afterEach(() => {
    (scaleLinear as jest.Mock).mockReset();
  });

  it("provides a best estimate number of ticks to d3's ticks utility to choose the ideal number of ticks", () => {
    const ticksSpy = jest.fn(() => [0, 25, 50]);
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = ticksSpy;
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        series: [],
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(ticksSpy).toHaveBeenCalledWith(5);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values in the data set, plus some padding', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    const deeplyNegative: Series = {
      name: 'Deeply negative',
      data: [{label: '1', rawValue: -10000}],
    };
    const highlyPositive: Series = {
      name: 'Highly positive',
      data: [{label: '1', rawValue: 10000}],
    };

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        series: [deeplyNegative, highlyPositive],
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([-10000, 10000]);
  });

  it('creates a y scale with the domain maiximum set to the default max y for a data set with all zero values', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        fontSize: 12,
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        series: [
          {
            name: 'Test Data 1',
            data: [{label: '1', rawValue: 0}],
          },
          {
            name: 'Test Data 2',
            data: [{label: '1', rawValue: 0}],
          },
        ],
      });
      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([0, DEFAULT_MAX_Y]);
  });

  it('creates a y scale with range equal to the drawable height', () => {
    let rangeSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      rangeSpy = jest.fn((range: any) => (range ? scale : range));
      scale.range = rangeSpy;
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        fontSize: 12,
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        series: [],
      });

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([250, 0]);
  });

  it('uses the provided function the format the tick labels', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = () => [25];
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      return scale;
    });

    function TestComponent() {
      const {ticks} = useYScale({
        fontSize: 12,
        drawableHeight: 250,
        formatYAxisLabel: jest.fn((value) => `Formatted value: ${value}`),
        series: [],
      });

      const {formattedValue} = ticks[0];

      return <p>{formattedValue}</p>;
    }

    const wrapper = mount(<TestComponent />);

    expect(wrapper).toContainReactText('Formatted value: 25');
  });
});
