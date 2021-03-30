import React from 'react';
import {mount} from '@shopify/react-testing';

import {LineChart} from '../LineChart';
import {SkipLink} from '../../SkipLink';
import {Chart} from '../Chart';
import {Series} from '../types';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

const primarySeries: Required<Series> = {
  name: 'Primary',
  color: 'primary',
  lineStyle: 'solid',
  showArea: false,
  data: [
    {label: 'Jan 1', rawValue: 1500},
    {label: 'Jan 2', rawValue: 1000},
    {label: 'Jan 3', rawValue: 800},
    {label: 'Jan 4', rawValue: 1300},
  ],
};

describe('<LineChart />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
      }),
    });
  });

  it('renders a <Chart />', () => {
    const lineChart = mount(
      <LineChart series={[primarySeries]} xAxisLabels={['Jan 1']} />,
    );

    expect(lineChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders a SkipLink if skipLinkText is provided', () => {
      const mockContent = 'Skip line chart content';
      const lineChart = mount(
        <LineChart
          series={[primarySeries]}
          xAxisLabels={['Jan 1']}
          skipLinkText={mockContent}
        />,
      );

      expect(lineChart).toContainReactComponent(SkipLink, {
        children: mockContent,
      });
    });

    it('does not render a SkipLink if skipLinkText is undefined', () => {
      const lineChart = mount(
        <LineChart xAxisLabels={['Jan 1']} series={[primarySeries]} />,
      );

      expect(lineChart).not.toContainReactComponent(SkipLink);
    });
  });
});
