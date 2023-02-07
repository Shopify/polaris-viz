import {mount} from '@shopify/react-testing';

import type {Props} from '../VisuallyHiddenRows';
import {VisuallyHiddenRows} from '../VisuallyHiddenRows';

const mockProps: Props = {
  data: [
    {
      name: 'Asia',
      data: [
        {key: '1', value: 502},
        {key: '2', value: 1000},
        {key: '3', value: 2000},
        {key: '4', value: 1000},
        {key: '5', value: 100},
        {key: '6', value: 1000},
        {key: '7', value: 5000},
      ],
      color: 'purple',
    },
    {
      name: 'Africa',
      data: [
        {key: '1', value: 106},
        {key: '2', value: 107},
        {key: '3', value: 111},
        {key: '4', value: 133},
        {key: '5', value: 100},
        {key: '6', value: 767},
        {key: '7', value: 1766},
      ],
      color: 'teal',
    },
  ],
  formatYAxisLabel: (val) => `$${val}`,
  xAxisLabels: ['Day 1', 'Day 2'],
};

describe('<VisuallyHiddenRows />', () => {
  it('renders a first blank row header', () => {
    const chart = mount(
      <svg>
        <VisuallyHiddenRows {...mockProps} />
      </svg>,
    );

    const firstRowHeader = chart.find('text');

    expect(firstRowHeader).toHaveReactProps({
      role: 'rowheader',
    });

    expect(firstRowHeader).toHaveReactProps({
      children: undefined,
    });
  });

  describe('xAxisLabels', () => {
    it('gets rendered as column headers', () => {
      const chart = mount(
        <svg>
          <VisuallyHiddenRows {...mockProps} />
        </svg>,
      );

      const header = chart.find('g');

      const firstColumnHeader = header!.findAll('text')[1];

      expect(header).toContainReactComponentTimes(
        'text',
        mockProps.xAxisLabels.length + 1,
      );

      expect(firstColumnHeader).toHaveReactProps({
        role: 'columnheader',
        children: mockProps.xAxisLabels[0],
      });
    });
  });

  describe('data', () => {
    it('names get rendered as column headers', () => {
      const chart = mount(
        <svg>
          <VisuallyHiddenRows {...mockProps} />
        </svg>,
      );

      const firstDataRow = chart.findAll('g')[1];

      const firstRowHeader = firstDataRow.find('text');

      expect(firstRowHeader).toHaveReactProps({
        role: 'rowheader',
        children: mockProps.data[0].name,
      });
    });

    it('values get rendered as formatted cells', () => {
      const chart = mount(
        <svg>
          <VisuallyHiddenRows {...mockProps} />
        </svg>,
      );

      const firstDataRow = chart.findAll('g')[1];

      const firstCell = firstDataRow.findAll('text')[1];

      expect(firstCell).toHaveReactProps({
        role: 'cell',
        children: `$${mockProps.data[0].data[0].value}`,
      });
    });
  });
});
