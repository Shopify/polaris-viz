import {createRef} from 'react';
import {mount} from '@shopify/react-testing';

import type {LegendProps} from '../Legend';
import {Legend} from '../Legend';
import {LegendItem} from '../components/LegendItem/LegendItem';
import type {LegendItemDimension} from '../components/LegendItem/LegendItem';

const mockProps: LegendProps = {
  data: [
    {name: 'Legend One', color: 'red'},
    {name: 'Legend Two', color: 'blue'},
  ],
};

describe('<Legend />', () => {
  it('renders a list of <LegendItems />', () => {
    const component = mount(<Legend {...mockProps} />);

    expect(component).toContainReactComponentTimes(LegendItem, 2);
  });

  it('adds the indexOffset to the index if provided', () => {
    const component = mount(<Legend {...mockProps} indexOffset={3} />);
    const legendItems = component.findAll(LegendItem);
    expect(legendItems[0]).toHaveReactProps({
      index: 3,
    });
    expect(legendItems[1]).toHaveReactProps({
      index: 4,
    });
  });

  it('updates the item dimensions', () => {
    const ref = createRef<LegendItemDimension[]>();
    ref.current = [];

    const component = mount(<Legend {...mockProps} itemDimensions={ref} />);
    const newDimensions = {width: 50, height: 50};

    component.find(LegendItem)?.trigger('onDimensionChange', 0, newDimensions);
    expect(ref.current[0]).toStrictEqual(newDimensions);
  });
});
