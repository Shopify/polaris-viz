import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinePreview} from '../LinePreview';

describe('<LinePreview />', () => {
  it('renders a path with the given color', () => {
    const linePreview = mount(<LinePreview color="red" lineStyle="solid" />);

    expect(linePreview).toContainReactComponent('path', {stroke: 'red'});
  });

  it('renders a solid path if lineStyle is solid', () => {
    const linePreview = mount(<LinePreview color="red" lineStyle="solid" />);

    expect(linePreview).toContainReactComponent('path');
  });

  it('renders a dotted path if lineStyle is dotted', () => {
    const linePreview = mount(<LinePreview color="red" lineStyle="dotted" />);

    expect(linePreview).toContainReactComponentTimes('circle', 3);
  });
});
