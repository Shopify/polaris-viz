import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {Bar} from '../Bar';

describe('<Bar/>', () => {
  it('renders null if the rawValue is null', () => {
    const wrapper = mount(
      <Bar
        rawValue={null}
        x={0}
        yScale={scaleLinear()}
        width={10}
        height={0}
      />,
    );

    expect(wrapper.children).toHaveLength(0);
  });
});
