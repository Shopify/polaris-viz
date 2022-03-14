import React from 'react';
import {mount} from '@shopify/react-testing';
import {RoundedBorder} from '@shopify/polaris-viz-core';

import {StackedBar, StackedBarProps} from '../StackedBar';

const MOCK_PROPS: StackedBarProps = {
  activeBarIndex: -1,
  ariaLabel: '',
  setActiveBarIndex: jest.fn(),
  color: 'red',
  height: 15,
  isAnimated: false,
  seriesIndex: 0,
  roundedBorder: RoundedBorder.None,
  width: 100,
  x: 0,
};

describe('<StackedBar />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <StackedBar {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });
});
