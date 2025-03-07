import {mount} from '@shopify/react-testing';
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

import type {StackedBarProps} from '../StackedBar';
import {StackedBar} from '../StackedBar';

const MOCK_PROPS: StackedBarProps = {
  activeBarIndex: -1,
  ariaLabel: '',
  setActiveBarIndex: jest.fn(),
  color: 'red',
  height: 15,
  seriesIndex: 0,
  borderRadius: BORDER_RADIUS.None,
  width: 100,
  x: 0,
  zeroPosition: 0,
  tooltipAttrData: {
    index: 0,
  },
  animationDelay: 0,
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
