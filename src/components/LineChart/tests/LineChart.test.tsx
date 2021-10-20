import React from 'react';
import {mount} from '@shopify/react-testing';

import {LineChart} from '../LineChart';
import {SkipLink} from '../../SkipLink';
import {Chart} from '../Chart';
import type {Series} from '../types';

const primarySeries: Series = {
  name: 'Primary',
  color: 'red',
  lineStyle: 'solid',
  data: [
    {label: 'Jan 1', rawValue: 1500},
    {label: 'Jan 2', rawValue: 1000},
    {label: 'Jan 3', rawValue: 800},
    {label: 'Jan 4', rawValue: 1300},
  ],
};

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: () => ({x: 0, y: 0}),
  };
});

describe('<LineChart />', () => {
  it('renders a <Chart />', () => {
    const lineChart = mount(
      <LineChart
        series={[primarySeries]}
        xAxisOptions={{xAxisLabels: ['Jan 1']}}
      />,
    );

    expect(lineChart).toContainReactComponent(Chart);
  });

  describe('skipLinkText', () => {
    it('renders a SkipLink if skipLinkText is provided', () => {
      const mockContent = 'Skip line chart content';
      const lineChart = mount(
        <LineChart
          series={[primarySeries]}
          xAxisOptions={{xAxisLabels: ['Jan 1']}}
          skipLinkText={mockContent}
        />,
      );

      expect(lineChart).toContainReactComponent(SkipLink, {
        children: mockContent,
      });
    });

    it('does not render a SkipLink if skipLinkText is undefined', () => {
      const lineChart = mount(
        <LineChart
          xAxisOptions={{xAxisLabels: ['Jan 1']}}
          series={[primarySeries]}
        />,
      );

      expect(lineChart).not.toContainReactComponent(SkipLink);
    });

    it('uses the label formatters for the default tooltip', () => {
      const xLabelSpy = jest.fn(() => 'Some x label');
      const yLabelSpy = jest.fn(() => 'Some y label');

      mount(
        <LineChart
          xAxisOptions={{xAxisLabels: ['Jan 1'], labelFormatter: xLabelSpy}}
          yAxisOptions={{labelFormatter: yLabelSpy}}
          series={[primarySeries]}
        />,
      );

      expect(xLabelSpy).toHaveBeenCalled();
      expect(yLabelSpy).toHaveBeenCalled();
    });
  });
});
