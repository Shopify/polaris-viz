import React from 'react';
import {mount} from '@shopify/react-testing';
import {colorBlue} from '@shopify/polaris-tokens';

import {LinePreview} from '../LinePreview';

describe('<LinePreview />', () => {
  it('renders a path with the given color', () => {
    const linePreview = mount(
      <LinePreview color="colorBlue" lineStyle="solid" />,
    );

    expect(linePreview).toContainReactComponent('path', {stroke: colorBlue});
  });

  it('renders a dashed path if lineStyle is dashed', () => {
    const linePreview = mount(
      <LinePreview color="colorBlue" lineStyle="dashed" />,
    );

    expect(linePreview).toContainReactComponent('path', {
      strokeDasharray: '3 2',
    });
  });

  it('renders a solid path if lineStyle is solid', () => {
    const linePreview = mount(
      <LinePreview color="colorBlue" lineStyle="solid" />,
    );

    expect(linePreview).toContainReactComponent('path', {
      strokeDasharray: 'unset',
    });
  });
});
