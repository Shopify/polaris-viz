import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {Series, StackSeries} from 'components/MultiSeriesBarChart/types';

import {useYScale} from '../use-y-scale';

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
let domainSpy = jest.fn();

const mockData: Series[] = [
  {
    data: [
      {label: 'label', rawValue: 10},
      {label: 'label', rawValue: 20},
      {label: 'label', rawValue: 30},
    ],
    color: 'colorBlack',
    name: 'LABEL1',
  },
  {
    data: [
      {label: 'label', rawValue: 1},
      {label: 'label', rawValue: 2},
      {label: 'label', rawValue: 3},
    ],
    color: 'colorBlack',
    name: 'LABEL2',
  },
  {
    data: [
      {label: 'label', rawValue: 5},
      {label: 'label', rawValue: 7},
      {label: 'label', rawValue: 10},
    ],
    color: 'colorBlack',
    name: 'LABEL3',
  },
];

interface Props {
  stackedValues: StackSeries[] | null;
  data: Series[];
}

function TestComponent({stackedValues, data}: Props) {
  useYScale({
    drawableHeight: 500,
    formatYAxisLabel: jest.fn(),
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
      scale.copy = () => scale;
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
      scale.copy = () => scale;
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
      scale.copy = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={
          [
            [
              [0, 0],
              [0, 43],
            ],
          ] as StackSeries[]
        }
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
      scale.copy = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={
          [
            [
              [-10, 0],
              [0, 43],
            ],
          ] as StackSeries[]
        }
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
      scale.copy = () => scale;
      return scale;
    });

    mount(
      <TestComponent
        stackedValues={null}
        data={[
          {
            data: [
              {label: 'label', rawValue: -10},
              {label: 'label', rawValue: 20},
              {label: 'label', rawValue: 30},
            ],
            color: 'colorBlack',
            name: 'LABEL1',
          },
          {
            data: [
              {label: 'label', rawValue: 1},
              {label: 'label', rawValue: 2},
              {label: 'label', rawValue: 3},
            ],
            color: 'colorBlack',
            name: 'LABEL2',
          },
          {
            data: [
              {label: 'label', rawValue: 5},
              {label: 'label', rawValue: 7},
              {label: 'label', rawValue: 10},
            ],
            color: 'colorBlack',
            name: 'LABEL3',
          },
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
      scale.copy = () => scale;
      return scale;
    });

    mount(<TestComponent stackedValues={null} data={mockData} />);

    expect(rangeSpy).toHaveBeenCalledWith([500, 0]);
  });

  it('formats the tick labels with the formatYAxisLabel function', () => {
    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = () => [25];
      scale.range = (range: any) => (range ? scale : range);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    function TestFormattersComponent() {
      const {ticks} = useYScale({
        drawableHeight: 500,
        formatYAxisLabel: (value) => `Formatted: ${value}`,
        data: [mockData[0]],
        stackedValues: null,
      });

      const {formattedValue} = ticks[0];

      return <p>{formattedValue}</p>;
    }

    const wrapper = mount(<TestFormattersComponent />);

    expect(wrapper).toContainReactText('Formatted: 25');
  });
});
