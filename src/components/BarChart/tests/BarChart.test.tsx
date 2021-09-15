import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarChart} from 'components/BarChart/BarChart';
import {Chart} from 'components/BarChart/Chart';
import {SkipLink} from 'components/SkipLink';

const mockProps = {
  data: [{rawValue: 10, label: 'data'}],
};

describe('BarChart />', () => {
  it('renders a <Chart />', () => {
    const barChart = mount(<BarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});

describe('skipLinkText', () => {
  it('renders an anchor tag that allows skipping the chart content', () => {
    const barChart = mount(
      <BarChart {...mockProps} skipLinkText="Skip chart content" />,
    );

    expect(barChart).toContainReactComponent(SkipLink, {
      children: 'Skip chart content',
    });
  });

  it('does not render an anchor tag if empty', () => {
    const barChart = mount(<BarChart {...mockProps} skipLinkText="" />);

    expect(barChart).not.toContainReactComponent(SkipLink.Anchor);
  });
});
