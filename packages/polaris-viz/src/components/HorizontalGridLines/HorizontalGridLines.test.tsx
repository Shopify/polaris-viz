import {mount} from '@shopify/react-testing';

import {
  mountWithProvider,
  mockDefaultTheme,
} from '../../../../polaris-viz-core/src/test-utilities/mountWithProvider';

import type {Props} from './HorizontalGridLines';
import {HorizontalGridLines} from './HorizontalGridLines';

const MOCK_PROPS: Props = {
  ticks: [],
  transform: {x: 10, y: 20},
  width: 100,
};

describe('<HorizontalGridLines />', () => {
  describe('ticks', () => {
    it('renders a line for each tick', () => {
      const actual = mount(
        <svg>
          <HorizontalGridLines
            {...MOCK_PROPS}
            ticks={[
              {value: 10, formattedValue: '$10', yOffset: 0},
              {value: 10, formattedValue: '$8', yOffset: 10},
            ]}
          />
          ,
        </svg>,
      );

      expect(actual).toContainReactComponentTimes('line', 2);
    });
  });

  describe('color, transform, width', () => {
    it('renders with default style attributes', () => {
      const actual = mount(
        <svg>
          <HorizontalGridLines
            {...MOCK_PROPS}
            ticks={[{value: 10, formattedValue: '$10', yOffset: 0}]}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('line', {
        x2: 100,
        transform: `translate(10,20)`,
        stroke: '#eeeeef',
      });
    });

    it('renders with altered style attributes', () => {
      const actual = mountWithProvider(
        <svg>
          <HorizontalGridLines
            {...MOCK_PROPS}
            ticks={[{value: 10, formattedValue: '$10', yOffset: 0}]}
          />
        </svg>,
        mockDefaultTheme({grid: {color: 'red'}}),
      );

      expect(actual).toContainReactComponent('line', {
        x2: 100,
        transform: `translate(10,20)`,
        stroke: 'red',
      });
    });
  });
});
