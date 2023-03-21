import {mount} from '@shopify/react-testing';
import {animated} from '@react-spring/web';

import type {AreaProps} from '../Area';
import {Area} from '../Area';

const MOCK_PROPS: AreaProps = {
  activeIndex: 0,
  fill: 'red',
  getAreaGenerator: () => '',
  index: 1,
  series: {
    name: '75th Percentile',
    data: [
      {value: 333, key: '2020-04-01T12:00:00'},
      {value: 797, key: '2020-04-02T12:00:00'},
    ],
  },
  hiddenIndexes: [],
  shouldAnimate: false,
};

describe('<Area />', () => {
  it('renders an animated.path', () => {
    const chart = mount(
      <svg>
        <Area {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent(animated.path);
  });

  describe('hiddenIndexes', () => {
    it('renders nothing when hiddenIndexes includes index', () => {
      const chart = mount(
        <svg>
          <Area {...MOCK_PROPS} hiddenIndexes={[1]} />
        </svg>,
      );

      expect(chart).not.toContainReactComponent(animated.path);
    });

    it('renders nothing when hiddenIndexes includes metadata.relatedIndex', () => {
      const chart = mount(
        <svg>
          <Area
            {...MOCK_PROPS}
            series={{
              name: '75th Percentile',
              data: [
                {value: 333, key: '2020-04-01T12:00:00'},
                {value: 797, key: '2020-04-02T12:00:00'},
              ],
              metadata: {
                relatedIndex: 2,
              },
            }}
            hiddenIndexes={[2]}
          />
        </svg>,
      );

      expect(chart).not.toContainReactComponent(animated.path);
    });
  });
});
