import React from 'react';
import {mount} from '@shopify/react-testing';

import {LegendContainer, LegendContainerProps} from '../LegendContainer';
import {Legend} from '../../Legend';

const mockProps: LegendContainerProps = {
  colorVisionType: 'someType',
  data: [
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

describe('<LegendContainer />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders <Legend />', () => {
    const component = mount(<LegendContainer {...mockProps} />);

    expect(component).toContainReactComponent(Legend, {
      activeIndex: -1,
      colorVisionType: 'someType',
    });
  });

  it('triggers onHeightChange() on mount with default value', () => {
    mount(<LegendContainer {...mockProps} />);

    expect(mockProps.onHeightChange).toHaveBeenCalledWith(45);
  });

  it('triggers onHeightChange() on unmount', () => {
    const component = mount(<LegendContainer {...mockProps} />);

    jest.resetAllMocks();

    component.unmount();

    expect(mockProps.onHeightChange).toHaveBeenCalledWith(0);
  });
});
