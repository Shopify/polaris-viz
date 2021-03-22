import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {Color} from 'types';

import {BAR_SPACING} from '../../../constants';
import {BarGroup} from '../BarGroup';
import {Bar} from '../../../../../components/Bar';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn((value) => value)),
}));

describe('<Bar/>', () => {
  const mockProps = {
    x: 10,
    yScale: scaleLinear() as any,
    width: 100,
    data: [10, 20, 0, 1],
    colors: ['colorPurple', 'colorTeal', 'colorRed', 'colorOrange'] as Color[],
    highlightColors: [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
    ] as Color[],
    isActive: false,
    hasActiveGroup: false,
    onFocus: jest.fn(),
    barGroupIndex: 0,
    ariaLabel: 'Aria Label',
    hasRoundedCorners: false,
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

  it('gives each <Bar /> a fill color', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent(Bar, {
      color: 'colorPurple',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      color: 'colorTeal',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      color: 'colorRed',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      color: 'colorOrange',
    });
  });

  it('passes down highlightColor', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} isActive />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent(Bar, {
      highlightColor: 'primary',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      highlightColor: 'secondary',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      highlightColor: 'tertiary',
    });
    expect(barGroup).toContainReactComponent(Bar, {
      highlightColor: 'quaternary',
    });
  });
});
