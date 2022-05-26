import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';
import {LinearGradientWithStops} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {SparkBarChart} from '../SparkBarChart';
import {Chart} from '../Chart';

const sampleData: DataSeries = {
  data: [
    {key: 1, value: 100},
    {key: 2, value: 200},
    {key: 3, value: 300},
    {key: 4, value: 500},
  ],
};
const sampleComparison: DataSeries = {
  data: [
    {key: 0, value: 300},
    {key: 1, value: 300},
    {key: 2, value: 300},
    {key: 3, value: 300},
  ],
  isComparison: true,
};

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.paddingInner = (paddingInner: any) =>
      paddingInner ? scale : paddingInner;
    scale.domain = (domain: any) => (domain ? scale : domain);
    scale.bandwidth = (width: any) => (width ? scale : width);
    scale.step = (step: any) => (step ? scale : step);
    return scale;
  }),
  scaleLinear: jest.fn(() => {
    const scale = (value: any) => value;
    scale.range = (range: any) => (range ? scale : range);
    scale.domain = (domain: any) => (domain ? scale : domain);
    return scale;
  }),
}));

describe('<SparkBarChart/>', () => {
  it('renders a <LinearGradientWithStops />', () => {
    const wrapper = mount(<SparkBarChart data={[sampleData]} />);

    expect(wrapper).toContainReactComponent(LinearGradientWithStops);
  });

  it('renders an accessibility label', () => {
    const wrapper = mount(
      <SparkBarChart data={[sampleData]} accessibilityLabel="This is a test" />,
    );

    expect(wrapper).toContainReactText('This is a test');
  });

  it('renders bars with 90% opacity when a comparison is present', () => {
    const wrapper = mount(
      <SparkBarChart data={[sampleData, sampleComparison]} />,
    );

    expect(wrapper).toContainReactComponent('g', {
      opacity: '0.9',
    });
  });

  it('renders bars with 100% opacity when no comparison is present', () => {
    const wrapper = mount(<SparkBarChart data={[sampleData]} />);

    expect(wrapper).toContainReactComponent('g', {
      opacity: '1',
    });
  });

  it('renders a comparison line when series has isComparison=true', () => {
    const wrapper = mount(
      <SparkBarChart data={[sampleData, sampleComparison]} />,
    );

    expect(wrapper).toContainReactComponentTimes('path', 5);
  });

  it('does not render a comparison line when no comparison series is passed', () => {
    const wrapper = mount(<SparkBarChart data={[sampleData]} />);

    expect(wrapper).toContainReactComponentTimes('path', 4);
  });

  it('has the comparison line align with the bars', () => {
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = (range: any) => (range ? scale : range);
      scale.paddingInner = (paddingInner: any) => (paddingInner ? scale : 0.5);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.bandwidth = (width: any) => (width ? scale : 20);
      scale.step = (step: any) => (step ? scale : 20);
      return scale;
    });

    const wrapper = mount(
      <SparkBarChart data={[sampleData, sampleComparison]} />,
    );

    expect(wrapper).toContainReactComponent('path', {
      strokeDasharray: '18.5 11.5',
      strokeDashoffset: -0.75,
    });
  });

  it('has the comparison line align with the bars when using dataOffsetLeft', () => {
    (scaleBand as jest.Mock).mockImplementation(() => {
      const scale = (value: any) => value;
      scale.range = (range: any) => (range ? scale : range);
      scale.paddingInner = (paddingInner: any) => (paddingInner ? scale : 0.5);
      scale.domain = (domain: any) => (domain ? scale : domain);
      scale.bandwidth = (width: any) => (width ? scale : 20);
      scale.step = (step: any) => (step ? scale : 20);
      return scale;
    });

    const wrapper = mount(
      <SparkBarChart
        data={[sampleData, sampleComparison]}
        dataOffsetLeft={25}
      />,
    );

    expect(wrapper).toContainReactComponent('path', {
      strokeDasharray: '18.5 11.5',
      strokeDashoffset: -25.75,
    });
  });

  describe('theme', () => {
    it('gets passed to <Chart/>', () => {
      const sparklineChart = mount(
        <SparkBarChart data={[sampleData]} theme="Light" />,
      );

      expect(sparklineChart).toContainReactComponent(Chart, {
        theme: 'Light',
      });
    });

    it('`Default` is used if no value is provided', () => {
      const barChart = mount(<SparkBarChart data={[sampleData]} />);

      expect(barChart).toContainReactComponent(Chart, {
        theme: 'Default',
      });
    });
  });
});
