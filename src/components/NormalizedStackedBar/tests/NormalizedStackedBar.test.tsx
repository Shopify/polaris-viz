import React from 'react';
import {mount} from '@shopify/react-testing';

import {NormalizedStackedBar} from '../NormalizedStackedBar';

describe('NormalizedStackedBar', () => {
  it('something', () => {
    const component = mount(<NormalizedStackedBar />);
    expect(component.text()).toBe('NormalizedStackedBar');
  });
});
