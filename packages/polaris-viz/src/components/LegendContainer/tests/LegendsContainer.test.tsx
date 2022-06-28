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
  onDimensionChange: jest.fn(),
  theme: 'Default',
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
});
