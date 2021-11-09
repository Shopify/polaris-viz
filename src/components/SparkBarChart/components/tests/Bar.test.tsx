import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {Bar} from '../Bar';

describe('<Bar/>', () => {
  it('renders null if the value is null', () => {
    const wrapper = mount(
      <Bar
        value={null}
        x={0}
        yScale={scaleLinear()}
        width={10}
        height={0}
        fill="red"
      />,
    );

    expect(wrapper.children).toHaveLength(0);
  });
});
