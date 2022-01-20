import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {BAR_SPACING} from '../../../constants';
import {MIN_BAR_HEIGHT} from '../../../../../constants';
import {BarGroup} from '../BarGroup';
import {Bar} from '../../../components/Bar';
import {LinearGradient} from '../../../../../components/LinearGradient';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn((value) => value)),
}));

describe('<BarGroup/>', () => {
  const mockProps = {
    x: 10,
    yScale: scaleLinear() as any,
    width: 100,
    height: 100,
    data: [10, 20, 0, 1],
    colors: ['purple', 'teal', 'red', 'orange'],
    hasActiveGroup: false,
    onFocus: jest.fn(),
    barGroupIndex: 0,
    ariaLabel: 'Aria Label',
    hasRoundedCorners: false,
    isSubdued: false,
    zeroAsMinHeight: false,
    isAnimated: false,
  };

  it('renders a <Bar /> for each data item', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponentTimes(Bar, 4);
  });

  it("gives each <Bar /> a width that together totals the group's full width, minus spacing", () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    const bars = barGroup
      .findAll(Bar)
      .filter(
        ({props}) =>
          props.width === mockProps.width / mockProps.data.length - BAR_SPACING,
      );

    expect(bars).toHaveLength(4);
  });

  it('gives each <Bar /> a spaced out X position', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent(Bar, {x: 10});
    expect(barGroup).toContainReactComponent(Bar, {x: 35});
    expect(barGroup).toContainReactComponent(Bar, {x: 60});
    expect(barGroup).toContainReactComponent(Bar, {x: 85});
  });

  describe('zeroAsMinHeight', () => {
    it('passes the min bar height to 0 bars if true', () => {
      const barGroup = mount(
        <svg>
          <BarGroup {...mockProps} zeroAsMinHeight data={[0]} />,
        </svg>,
      );

      const barHeight = barGroup.find(Bar)!.props.height;

      expect(barHeight).toBe(MIN_BAR_HEIGHT);
    });

    it('does not pass the min bar height to 0 bars if false', () => {
      const barGroup = mount(
        <svg>
          <BarGroup {...mockProps} zeroAsMinHeight={false} data={[0]} />,
        </svg>,
      );

      const barHeight = barGroup.find(Bar)!.props.height;

      expect(barHeight).toBe(0);
    });

    it('passes the min bar height to non-zero bar if false', () => {
      const barGroup = mount(
        <svg>
          <BarGroup {...mockProps} data={[1, 500]} zeroAsMinHeight={false} />,
        </svg>,
      );

      const barHeight = barGroup.find(Bar)!.props.height;

      expect(barHeight).toBe(MIN_BAR_HEIGHT);
    });
  });

  describe('colors', () => {
    describe('if uses solid colors', () => {
      it('gives <LinearGradient /> a single stop', () => {
        const barGroup = mount(
          <svg>
            <BarGroup {...mockProps} />,
          </svg>,
        );

        expect(barGroup).toContainReactComponent(LinearGradient, {
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
      it('passes gradient to <LinearGradient />', () => {
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
            <BarGroup {...mockProps} colors={[mockGradient]} />
          </svg>,
        );

        expect(barGroup).toContainReactComponent(LinearGradient, {
          gradient: mockGradient,
        });
      });
    });
  });
});
