import React from 'react';
import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {LineChart} from '../LineChart';
import {SkipLink} from '../../SkipLink';
import {Chart} from '../Chart';

const primarySeries: DataSeries = {
  name: 'Primary',
  color: 'red',
  data: [
    {key: 'Jan 1', value: 1500},
    {key: 'Jan 2', value: 1000},
    {key: 'Jan 3', value: 800},
    {key: 'Jan 4', value: 1300},
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
        data={[primarySeries]}
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
          data={[primarySeries]}
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
          data={[primarySeries]}
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
          data={[primarySeries]}
        />,
      );

      expect(xLabelSpy).toHaveBeenCalled();
      expect(yLabelSpy).toHaveBeenCalled();
    });
  });
});
