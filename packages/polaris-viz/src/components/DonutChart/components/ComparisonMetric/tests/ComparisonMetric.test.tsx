import React from 'react';
import {Icon} from '@shopify/polaris';
import {CaretDownMinor, CaretUpMinor} from '@shopify/polaris-icons';

import {mountWithAppContext} from 'tests/modern';

import {ComparisonMetric} from '../ComparisonMetric';

describe('<ComparisonMetric />', () => {
  it('renders null if percentage is zero', async () => {
    const wrapper = await mountWithAppContext(
      <ComparisonMetric percentage={0} />,
    );

    expect(wrapper.domNode).toBeNull();
  });

  it('renders Icon with CaretUpMinor if percentage is positive', async () => {
    const wrapper = await mountWithAppContext(
      <ComparisonMetric percentage={0.6} />,
    );

    expect(wrapper).toContainReactComponent(Icon, {
      source: CaretUpMinor,
    });
  });

  it('renders Icon with CaretDownMinor if percentage is positive', async () => {
    const wrapper = await mountWithAppContext(
      <ComparisonMetric percentage={-0.5} />,
    );

    expect(wrapper).toContainReactComponent(Icon, {
      source: CaretDownMinor,
    });
  });

  it('renders percentage formatted', async () => {
    const wrapper = await mountWithAppContext(
      <ComparisonMetric percentage={1.2} />,
    );

    expect(wrapper).toContainReactText('120%');
  });
});
