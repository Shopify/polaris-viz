import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {Background, GroupCell, GroupInfo} from '../GroupCell';

const MOCK_GROUP = {
  start: {row: 0, col: 0},
  end: {row: 1, col: 1},
  bgColor: 'red',
  color: 'white',
  name: 'Group 1',
  value: '100',
  secondaryValue: '10',
};

const MOCK_PROPS = {
  group: MOCK_GROUP,
  index: 0,
  xScale: scaleLinear(),
  cellHeight: 100,
  cellWidth: 100,
  isSmallContainer: false,
  animationStarted: true,
  hoveredGroups: new Set<string>(),
  handleGroupHover: () => {},
  getColors: jest.fn(() => ({bgColor: 'red', textColor: 'white'})),
  containerWidth: 600,
  isAnimated: true,
};

describe('<GroupCell />', () => {
  it('renders a Background element with the expected color', () => {
    const wrapper = mount(<GroupCell {...MOCK_PROPS} />);

    expect(wrapper).toContainReactComponent(Background, {
      fill: MOCK_GROUP.bgColor,
    });
  });

  it('renders a GroupInfo component with expected props', () => {
    const wrapper = mount(<GroupCell {...MOCK_PROPS} />);

    expect(wrapper).toContainReactComponent(GroupInfo, {
      xScale: MOCK_PROPS.xScale,
      group: MOCK_PROPS.group,
      groupWidth: 200,
      cellHeight: MOCK_PROPS.cellHeight,
      groupHeight: 200,
      getColors: MOCK_PROPS.getColors,
      opacity: 1,
      mainFontSize: 20,
      groupValue: '100',
      showNameAndSecondaryValue: true,
      secondaryFontSize: 12,
      groupSecondaryValue: '10',
      groupNameOffset: 10,
    });
  });

  it('renders the group name', () => {
    const wrapper = mount(
      <svg>
        <GroupCell {...MOCK_PROPS} />
      </svg>,
    );

    expect(wrapper).toContainReactComponentTimes('text', 1, {
      children: 'Group 1',
    });
  });

  it('renders the primary and secondary values', () => {
    const wrapper = mount(
      <svg>
        <GroupCell {...MOCK_PROPS} />
      </svg>,
    );

    expect(wrapper).toContainReactComponentTimes('tspan', 1, {
      children: '100',
    });
    expect(wrapper).toContainReactComponentTimes('tspan', 1, {
      children: '10',
    });
  });

  it('calls handleGroupHover on mouse enter with the current group', () => {
    const handleGroupHoverMock = jest.fn();
    const wrapper = mount(
      <svg>
        <GroupCell {...MOCK_PROPS} handleGroupHover={handleGroupHoverMock} />
      </svg>,
    );

    wrapper.find('g')?.trigger('onMouseEnter');

    expect(handleGroupHoverMock).toHaveBeenCalledWith(
      MOCK_PROPS.group,
      undefined,
    );
  });
});
