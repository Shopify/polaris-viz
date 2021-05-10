import React from 'react';
import {mount} from '@shopify/react-testing';

import {Sparkline} from './Sparkline';
import {Series} from './components';

jest.mock('utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'stackedAreas-1'),
}));

describe('<Sparkline />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
      }),
    });
  });

  const mockSeries = [
    {
      color: 'colorRed' as any,
      areaStyle: 'gradient' as any,
      data: [
        {x: 0, y: 100},
        {x: 1, y: 200},
        {x: 2, y: 300},
        {x: 3, y: 400},
        {x: 4, y: 400},
        {x: 5, y: 1000},
        {x: 6, y: 200},
        {x: 7, y: 800},
        {x: 8, y: 900},
        {x: 9, y: 200},
        {x: 10, y: 400},
      ],
    },
    {
      color: 'colorPurple' as any,
      areaStyle: 'none' as any,
      lineStyle: 'dashed' as any,
      data: [
        {x: 0, y: 10},
        {x: 1, y: 20},
        {x: 2, y: 30},
        {x: 3, y: 40},
        {x: 4, y: 40},
        {x: 5, y: 400},
        {x: 6, y: 20},
        {x: 7, y: 80},
        {x: 8, y: 90},
        {x: 9, y: 20},
        {x: 10, y: 40},
      ],
    },
  ];

  describe('SVG', () => {
    it('renders', () => {
      const sparkline = mount(<Sparkline series={mockSeries} />);

      expect(sparkline).toContainReactComponentTimes('svg', 1);
    });
  });

  describe('Accessibility', () => {
    it('gives the SVG an aria-hidden attribute', () => {
      const sparkline = mount(<Sparkline series={mockSeries} />);

      expect(sparkline).toContainReactComponent('svg', {
        'aria-hidden': true,
      });
    });

    it('has a hidden label when an accessibility label is passed to the component', () => {
      const label = 'Showing sales over the last 30 days';
      const sparkline = mount(
        <Sparkline series={mockSeries} accessibilityLabel={label} />,
      );

      expect(sparkline.find('span')!.text()).toBe(label);
    });
  });

  describe('Series', () => {
    it('renders a Series for each series provided', () => {
      const sparkline = mount(<Sparkline series={mockSeries} />);

      expect(sparkline.findAll(Series)).toHaveLength(mockSeries.length);
    });
  });
});
