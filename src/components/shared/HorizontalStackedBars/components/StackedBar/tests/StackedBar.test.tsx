import React from 'react';
import {mount} from '@shopify/react-testing';

import {StackedBar, StackedBarProps} from '../StackedBar';
import {RoundedBorder} from '../../../../../../types';

const MOCK_PROPS: StackedBarProps = {
  color: 'red',
  groupIndex: 1,
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

  describe('seriesIndex', () => {
    it('sets tabIndex to 0 when 0', () => {
      const chart = mount(
        <svg>
          <StackedBar {...MOCK_PROPS} />
        </svg>,
      );

      const path = chart.find('path');

      expect(path?.props.tabIndex).toStrictEqual(0);
    });

    it('sets tabIndex to -1 when not 0', () => {
      const chart = mount(
        <svg>
          <StackedBar {...MOCK_PROPS} seriesIndex={1} />
        </svg>,
      );

      const path = chart.find('path');

      expect(path?.props.tabIndex).toStrictEqual(-1);
    });
  });
});
