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
let domainSpy = jest.fn();

const mockData: Data[] = [
  {data: [10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
  {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL2'},
  {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL3'},
];

const labels: string[] = ['Monday', 'Tuesday', 'Wednesday'];

interface Props {
  stackedValues: StackSeries[] | null;
  data: Data[];
}

function TestComponent({stackedValues, data}: Props) {
  useYScale({
    drawableHeight: 500,
    formatYValue: jest.fn(),
    data,
    stackedValues,
  });

  return null;
}

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

    mount(<TestComponent stackedValues={null} data={mockData} />);

    expect(ticksSpy).toHaveBeenCalledWith(6);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values in the data set', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    mount(<TestComponent stackedValues={null} data={mockData} />);

    expect(domainSpy).toHaveBeenCalledWith([0, 30]);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values with stacked data set', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={getStackedValues(mockData, labels)}
        data={mockData}
      />,
    );

    expect(domainSpy).toHaveBeenCalledWith([0, 43]);
  });

  it('creates a y scale with a domain handling negative values with stacked data set', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={getStackedValues(
          [
            {data: [-10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
            {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL2'},
            {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL3'},
          ],
          labels,
        )}
        data={mockData}
      />,
    );

    expect(domainSpy).toHaveBeenCalledWith([-10, 43]);
  });

  it('creates a y scale with a domain handling negative values with regular data set', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = (numTicks: number) => Array.from(Array(numTicks));
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={null}
        data={[
          {data: [-10, 20, 30], color: 'colorBlack', label: 'LABEL1'},
          {data: [1, 2, 3], color: 'colorBlack', label: 'LABEL2'},
          {data: [5, 7, 10], color: 'colorBlack', label: 'LABEL3'},
        ]}
      />,
    );

    expect(domainSpy).toHaveBeenCalledWith([-10, 30]);
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

    mount(<TestComponent stackedValues={null} data={mockData} />);

    expect(rangeSpy).toHaveBeenCalledWith([500, 0]);
  });
});
