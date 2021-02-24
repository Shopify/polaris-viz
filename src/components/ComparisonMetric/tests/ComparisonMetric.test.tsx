import React from 'react';
import {mount} from '@shopify/react-testing';

import {ComparisonMetric} from '../ComparisonMetric';
import {UpChevron, DownChevron} from '../components';

describe('<Crosshair />', () => {
  it('renders an up chevron if positive', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric={{metric: '5', trend: 'positive', accessibilityLabel: 'label'}}
      />,
    );
    expect(comparisonMetric).toContainReactComponent(UpChevron);
  });

  it('renders a down chevron if negative', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric={{metric: '5', trend: 'negative', accessibilityLabel: 'label'}}
      />,
    );
    expect(comparisonMetric).toContainReactComponent(DownChevron);
  });

  it('renders no chevron if neutral', () => {
    const comparisonMetric = mount(
      <ComparisonMetric
        metric={{metric: '0', trend: 'neutral', accessibilityLabel: 'label'}}
      />,
    );
    expect(comparisonMetric).toContainReactComponentTimes('svg', 0);
  });
});
