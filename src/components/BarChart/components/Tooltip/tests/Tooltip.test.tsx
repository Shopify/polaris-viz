import React from 'react';
import {mount} from '@shopify/react-testing';

import {Tooltip} from '../Tooltip';

describe('<Tooltip/>', () => {
  it('renders a label', () => {
    const tooltip = mount(<Tooltip label="I'm a label" value="10" />);

    expect(tooltip).toContainReactText("I'm a label");
  });

  it('renders a value', () => {
    const tooltip = mount(<Tooltip label="I'm a label" value="10" />);

    expect(tooltip).toContainReactText('10');
  });
});
