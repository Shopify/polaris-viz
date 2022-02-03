import React from 'react';
import {mount} from '@shopify/react-testing';

import {Legends, LegendsProps} from '../Legends';
import {LegendItem} from '../components';

const mockProps: LegendsProps = {
  colorBlindType: 'someType',
  legends: [
    {name: 'Legend One', color: 'red'},
    {name: 'Legend Two', color: 'blue'},
  ],
  onHeightChange: jest.fn(),
};

jest.mock('../../../hooks/useResizeObserver', () => {
  return {
    useResizeObserver: () => {
      return {
        setRef: () => {},
        entry: null,
      };
    },
  };
});

describe('<Legends />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders a list of <LegendItems />', () => {
    const component = mount(<Legends {...mockProps} />);

    expect(component).toContainReactComponentTimes(LegendItem, 2);
  });

  it('triggers onHeightChange() on mount with default value', () => {
    mount(<Legends {...mockProps} />);

    expect(mockProps.onHeightChange).toHaveBeenCalledWith(45);
  });

  it('triggers onHeightChange() on unmount', () => {
    const component = mount(<Legends {...mockProps} />);

    jest.resetAllMocks();

    component.unmount();

    expect(mockProps.onHeightChange).toHaveBeenCalledWith(0);
  });

  it('passes colorBlindType to LegendItems', () => {
    const component = mount(<Legends {...mockProps} />);
    const item = component.find(LegendItem);

    expect(item?.props.colorBlindType).toStrictEqual('someType');
  });
});
