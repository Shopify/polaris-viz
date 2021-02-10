import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {VisuallyHiddenRows} from '../VisuallyHiddenRows';

const mockProps = {
  series: [
    {
      name: 'Asia',
      data: [
        {label: '1', rawValue: 502},
        {label: '2', rawValue: 1000},
        {label: '3', rawValue: 2000},
        {label: '4', rawValue: 1000},
        {label: '5', rawValue: 100},
        {label: '6', rawValue: 1000},
        {label: '7', rawValue: 5000},
      ],
      color: 'colorPurple' as Color,
    },
    {
      name: 'Africa',
      data: [
        {label: '1', rawValue: 106},
        {label: '2', rawValue: 107},
        {label: '3', rawValue: 111},
        {label: '4', rawValue: 133},
        {label: '5', rawValue: 100},
        {label: '6', rawValue: 767},
        {label: '7', rawValue: 1766},
      ],
      color: 'colorTeal' as Color,
    },
  ],
  xAxisLabels: ['Day 1', 'Day 2'],
  formatYAxisLabel: (val: number) => `$${val}`,
};

describe('<VisuallyHiddenRows', () => {
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

  describe('series', () => {
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
        children: mockProps.series[0].name,
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
        children: `$${mockProps.series[0].data[0].rawValue}`,
      });
    });
  });
});
