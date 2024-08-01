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
  diameter: 200,
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

  it('calculates and applies font size based on diameter', () => {
    const scalingFactor = 0.07;
    const expectedFontSize = mockProps.diameter * scalingFactor;
    const innerValue = mount(<InnerValue {...mockProps} />);

    const contentValue = innerValue.find('p');
    const fontSize = contentValue?.prop('style')?.fontSize;

    expect(fontSize).toBe(expectedFontSize);
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
