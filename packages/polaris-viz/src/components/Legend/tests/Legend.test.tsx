import {mount} from '@shopify/react-testing';

import type {LegendProps} from '../Legend';
import {Legend} from '../Legend';
import {LegendItem} from '../../Legend/components';

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
});
