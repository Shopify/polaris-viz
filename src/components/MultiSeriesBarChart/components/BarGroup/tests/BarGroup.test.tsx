import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {Color} from 'types';

import {MIN_BAR_HEIGHT, BAR_SPACING} from '../../../constants';
import {BarGroup} from '../BarGroup';

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
  };

  it('renders a rect for each data item', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponentTimes('rect', 4);
  });

  it("gives each bar a width that together totals the group's full width, minus spacing", () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    const bars = barGroup
      .findAll('rect')
      .filter(
        ({props}) =>
          props.width === mockProps.width / mockProps.data.length - BAR_SPACING,
      );

    expect(bars).toHaveLength(4);
  });

  it('gives bars a min height if required', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} data={[1]} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {height: MIN_BAR_HEIGHT});
  });

  it('does not give 0 values a min height', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} data={[0]} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {height: 0});
  });

  it('gives each bar a spaced out X position', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {x: 10});
    expect(barGroup).toContainReactComponent('rect', {x: 35});
    expect(barGroup).toContainReactComponent('rect', {x: 60});
    expect(barGroup).toContainReactComponent('rect', {x: 85});
  });

  it('gives each bar a fill color', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(156, 106, 222)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(71, 193, 191)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(222, 54, 24)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(244, 147, 66)',
    });
  });

  it('renders bar with highlightColor value when isActive prop is true', () => {
    const barGroup = mount(
      <svg>
        <BarGroup {...mockProps} isActive />,
      </svg>,
    );

    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(0,161,159)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(41,35,112)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(13,140,237)',
    });
    expect(barGroup).toContainReactComponent('rect', {
      fill: 'rgb(157,53,193)',
    });
  });
});
