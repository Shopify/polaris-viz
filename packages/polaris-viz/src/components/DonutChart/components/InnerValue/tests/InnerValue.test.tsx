import {mount} from '@shopify/react-testing';
import {animated, config} from '@react-spring/web';
import {min} from 'd3-array';

import type {InnerValueProps} from '../InnerValue';
import {InnerValue} from '../InnerValue';
import {ComparisonMetric} from '../../../../ComparisonMetric';

const mockProps: InnerValueProps = {
  activeValue: 100,
  activeIndex: 1,
  totalValue: 1000,
  labelFormatter: (value) => value,
  isAnimated: true,
};

jest.mock('@react-spring/web', () => ({
  ...jest.requireActual('@react-spring/web'),
  useSpring: jest.fn(() => ({
    animatedValue: {to: jest.fn(() => mockProps.totalValue)},
  })),
}));

describe('<InnerValue />', () => {
  it('renders the active value if it exists', async () => {
    const innerValue = mount(<InnerValue {...mockProps} />);

    expect(innerValue).toContainReactComponent('p', {
      children: mockProps.activeValue,
    });
  });

  it('renders the animated total value if the active value does not exist', async () => {
    const innerValue = mount(<InnerValue {...mockProps} activeValue={null} />);

    expect(innerValue).toContainReactComponent(animated.span, {
      children: mockProps.totalValue,
    });
  });

  it('renders a custom inner value if prop `renderInnerValueContent` exists', async () => {
    const innerValue = mount(
      <InnerValue
        {...mockProps}
        renderInnerValueContent={({totalValue}) => <span>{totalValue}</span>}
      />,
    );

    expect(innerValue).toContainReactComponent('span', {
      children: mockProps.totalValue,
    });
  });

  describe('<ComparisonMetric />', () => {
    it('renders a <ComparisonMetric /> if a `comparisonMetric` exists', async () => {
      const innerValue = mount(
        <InnerValue
          {...mockProps}
          activeValue={null}
          comparisonMetric={{
            metric: '6%',
            trend: 'positive',
            accessibilityLabel: 'trending up 6%',
          }}
        />,
      );

      expect(innerValue).toContainReactComponent(ComparisonMetric);
    });

    it('does not render a <ComparisonMetric /> if a `comparisonMetric` does not exist', async () => {
      const innerValue = mount(
        <InnerValue
          {...mockProps}
          activeValue={null}
          comparisonMetric={null}
        />,
      );

      expect(innerValue).not.toContainReactComponent(ComparisonMetric);
    });
  });
});
