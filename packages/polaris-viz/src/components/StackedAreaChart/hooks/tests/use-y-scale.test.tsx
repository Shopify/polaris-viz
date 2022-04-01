import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {useYScale} from '../use-y-scale';
import {DEFAULT_MAX_Y} from '../../../../constants';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.nice = () => scale;
    scale.copy = () => scale;
    return scale;
  }),
}));

jest.mock('../../../../utilities', () => {
  return {
    ...jest.requireActual('../../../../utilities'),
    estimateStringWidth: () => 0,
  };
});

const mockData = [
  [
    [649, 1151],
    [820, 1820],
    [1127, 3127],
  ],
  [
    [543, 649],
    [713, 820],
    [1016, 1127],
  ],
  [
    [380, 543],
    [510, 713],
    [740, 1016],
  ],
  [
    [200, 380],
    [200, 510],
    [200, 740],
  ],
  [
    [0, 200],
    [0, 200],
    [0, 200],
  ],
];

const mockZeroData = new Array(5).fill(new Array(3).fill([0, 0]));

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
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        stackedValues: mockData as any,
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(ticksSpy).toHaveBeenCalledWith(3);
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
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        stackedValues: mockData as any,
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([0, 3127]);
  });

  it('creates a y scale with max of 0 when all values are negative', () => {
    let domainSpy = jest.fn();
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        stackedValues: [
          [
            [-649, -1151],
            [-820, -1820],
          ],
          [
            [-543, -649],
            [-713, -820],
          ],
        ] as any,
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(domainSpy).toHaveBeenCalledWith([-1820, 0]);
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
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        stackedValues: mockZeroData as any,
        fontSize: 12,
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
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      useYScale({
        drawableHeight: 250,
        formatYAxisLabel: jest.fn(),
        stackedValues: mockData as any,
        fontSize: 12,
      });

      return null;
    }

    mount(<TestComponent />);

    expect(rangeSpy).toHaveBeenCalledWith([250, 0]);
  });

  it('formats the tick labels with the provided function', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = () => [33];
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestComponent() {
      const {ticks} = useYScale({
        drawableHeight: 250,
        formatYAxisLabel: (value) => `Formatted: ${value}`,
        stackedValues: mockData as any,
        fontSize: 12,
      });

      const {formattedValue} = ticks[0];

      return <p>{formattedValue}</p>;
    }

    const wrapper = mount(<TestComponent />);

    expect(wrapper).toContainReactText('Formatted: 33');
  });
});
