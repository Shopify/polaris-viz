import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {Series, StackSeries} from 'components/MultiSeriesBarChart/types';

import {useYScale} from '../use-y-scale';
import {shouldRoundScaleUp} from '../../../../utilities';

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

jest.mock('../../../../utilities', () => ({
  ...jest.requireActual('../../../../utilities'),
  shouldRoundScaleUp: jest.fn(() => true),
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
    integersOnly: false,
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
        integersOnly: false,
      });

      const {formattedValue} = ticks[0];

      return <p>{formattedValue}</p>;
    }

    const wrapper = mount(<TestFormattersComponent />);

    expect(wrapper).toContainReactText('Formatted: 25');
  });

  it('does not update the domain if shouldRoundScaleUp is true', () => {
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

    (shouldRoundScaleUp as jest.Mock).mockImplementation(jest.fn(() => true));

    mount(<TestComponent stackedValues={null} data={mockData} />);

    // Check it's only called once
    expect(domainSpy).toHaveBeenCalledTimes(1);

    // Check it's called with the min and max data
    expect(domainSpy).toHaveBeenNthCalledWith(1, [0, 30]);
  });

  it('updates the domain is shouldRoundScaleUp is false', () => {
    const firstTick = 50;

    (scaleLinear as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.ticks = () => [firstTick];
      scale.range = (range: any) => (range ? scale : range);
      domainSpy = jest.fn((domain: any) => (domain ? scale : domain));
      scale.domain = domainSpy;
      scale.nice = () => scale;
      scale.copy = () => scale;
      return scale;
    });

    (shouldRoundScaleUp as jest.Mock).mockImplementation(jest.fn(() => false));

    mount(<TestComponent stackedValues={null} data={mockData} />);

    // Check that it's called with the min and max data the first time
    expect(domainSpy).toHaveBeenNthCalledWith(1, [0, 30]);

    // Check that it's called with the first tick and max data the second time
    expect(domainSpy).toHaveBeenNthCalledWith(2, [firstTick, 30]);
  });

  describe('integersOnly', () => {
    it('filters out non-integer numbers if true', () => {
      (scaleLinear as jest.Mock).mockImplementation(() => {
        const scale = (value: any) => value;
        scale.ticks = () => [0, 25.6, 50];
        scale.range = (range: any) => (range ? scale : range);
        scale.domain = (domain: any) => (domain ? scale : domain);
        scale.nice = () => scale;
        scale.copy = () => scale;
        return scale;
      });

      function TestFormattersComponent() {
        const {ticks} = useYScale({
          drawableHeight: 300,
          formatYAxisLabel: jest.fn(),
          data: [mockData[0]],
          stackedValues: null,
          integersOnly: true,
        });

        return <p>{ticks.map(({value}) => `${value.toString()}-`)}</p>;
      }

      const wrapper = mount(<TestFormattersComponent />);

      expect(wrapper).toContainReactText('0-50-');
    });

    it('rounds min domain down and max domain up to the nearest integer if true', () => {
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
          drawableHeight: 300,
          formatYAxisLabel: jest.fn(),
          data: [
            {
              data: [
                {label: 'label', rawValue: 0.1},
                {label: 'label', rawValue: 0.9},
              ],
              color: 'colorBlack',
              name: 'LABEL1',
            },
          ],
          stackedValues: null,
          integersOnly: true,
        });

        return null;
      }

      mount(<TestComponent />);

      expect(domainSpy).toHaveBeenCalledWith([0, 1]);
    });
  });
});
