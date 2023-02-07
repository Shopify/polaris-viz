import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {LinearGradientWithStops, BAR_SPACING} from '@shopify/polaris-viz-core';

import type {BarGroupProps} from '../BarGroup';
import {BarGroup} from '../BarGroup';
import {VerticalBar} from '../../VerticalBar';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const MOCK_PROPS: BarGroupProps = {
  accessibilityData: [
    {
      title: 'Monday',
      data: [
        {
          label: 'Breakfast',
          value: '10',
        },
        {
          label: 'Lunch',
          value: '20',
        },
        {
          label: 'Dinner',
          value: '0',
        },
        {
          label: 'Snack',
          value: '1',
        },
      ],
    },
  ],
  activeBarGroup: -1,
  x: 10,
  yScale: scaleLinear() as any,
  width: 100,
  data: [10, 20, 0, 1],
  colors: ['purple', 'teal', 'red', 'orange'],
  barGroupIndex: 0,
  gapWidth: 10,
  animationDelay: 0,
  indexOffset: 0,
  drawableHeight: 500,
};

describe('<BarGroup/>', () => {
  it('renders a <Bar /> for each data item', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...MOCK_PROPS} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponentTimes(VerticalBar, 4);
  });

  it("gives each rect a width that together totals the group's full width, minus spacing", () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...MOCK_PROPS} />,
      </svg>,
    );

    const bars = barGroup
      .findAll('rect')
      .filter(
        ({props}) =>
          props.width ===
          MOCK_PROPS.width / MOCK_PROPS.data.length - BAR_SPACING,
      );

    expect(bars).toHaveLength(4);
  });

  it('gives each rect a spaced out X position', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...MOCK_PROPS} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {x: 10});
    expect(barGroup).toContainReactComponent('rect', {x: 35});
    expect(barGroup).toContainReactComponent('rect', {x: 60});
    expect(barGroup).toContainReactComponent('rect', {x: 85});
  });

  describe('colors', () => {
    describe('if uses solid colors', () => {
      it('gives <LinearGradientWithStops /> a single stop', () => {
        const barGroup = mount(
          <svg>
            <BarGroup {...MOCK_PROPS} />,
          </svg>,
        );

        expect(barGroup).toContainReactComponent(LinearGradientWithStops, {
          gradient: [
            {
              color: 'red',
              offset: 0,
            },
          ],
        });
      });
    });

    describe('if uses gradient colors', () => {
      it('passes gradient to <LinearGradientWithStops />', () => {
        const mockGradient = [
          {
            color: '#374352',
            offset: 0,
          },
          {
            color: '#4d5e73',
            offset: 50,
          },
        ];
        const barGroup = mount(
          <svg>
            <BarGroup {...MOCK_PROPS} colors={[mockGradient]} />
          </svg>,
        );

        expect(barGroup).toContainReactComponent(LinearGradientWithStops, {
          gradient: mockGradient,
        });
      });
    });
  });
});
