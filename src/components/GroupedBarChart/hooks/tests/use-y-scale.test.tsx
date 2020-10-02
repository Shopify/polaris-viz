import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {useYScale} from '../use-y-scale';

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
        drawableHeight: 500,
        formatYValue: jest.fn(),
        data: [
          {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
          {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL1'},
          {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL1'},
        ],
        stackedValues: null,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(ticksSpy).toHaveBeenCalledWith(6);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values in the data set', () => {
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
        drawableHeight: 500,
        formatYValue: jest.fn(),
        data: [
          {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
          {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL1'},
          {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL1'},
        ],
        stackedValues: null,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([0, 30]);
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
        drawableHeight: 500,
        formatYValue: jest.fn(),
        data: [
          {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
          {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL1'},
          {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL1'},
        ],
        stackedValues: null,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([500, 0]);
  });
});
