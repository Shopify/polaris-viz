import React from 'react';
import {mount} from '@shopify/react-testing';

import {mountWithProvider} from '../../../../../test-utilities';
import {mockDefaultTheme} from '../../../../../test-utilities/mount-with-provider';
import {Line, Props} from '../Line';

jest.mock('../../../../../utilities', () => {
  return {
    ...jest.requireActual('../../../../../utilities'),
    getPathLength: () => 0,
  };
});

const color = 'red';

const mockProps: Props = {
  series: {
    name: 'Test series',
    data: [
      {key: 'Jan 1', value: 0},
      {key: 'Jan 2', value: 10},
    ],
    color: 'primary' as 'primary',
  },
  index: 0,
  isAnimated: false,
  lineGenerator: (() => '') as any,
  color,
};

describe('<Line />', () => {
  describe('Line', () => {
    it('renders a line with the series style solid', () => {
      const actual = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
            }}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('path', {
        strokeDasharray: 'unset',
        stroke: color,
      });
    });

    it('renders a line with comparison styles', () => {
      const actual = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              isComparison: true,
            }}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('path', {
        strokeDasharray: '0.1 8',
        stroke: color,
      });
    });
  });

  it('uses the width prop', () => {
    const actual = mountWithProvider(
      <svg>
        <Line {...mockProps} />
      </svg>,
      mockDefaultTheme({line: {width: 10}}),
    );

    expect(actual).toContainReactComponent('path', {
      strokeWidth: '10px',
    });
  });
});
