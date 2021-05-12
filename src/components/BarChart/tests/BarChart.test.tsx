import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarChart} from '../BarChart';
import {Chart} from '../Chart';
import {SkipLink} from '../../SkipLink';

describe('BarChart />', () => {
  const mockProps = {data: [{rawValue: 10, label: 'data'}]};

  it('renders a <Chart />', () => {
    const barChart = mount(<BarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });
});

describe('skipLinkText', () => {
  const mockProps = {data: [{rawValue: 10, label: 'data'}]};

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
