import React from 'react';
import {mount} from '@shopify/react-testing';

import {ColorPreview, ColorPreviewType} from '../ColorPrewiew';

describe('<ColorPreview/>', () => {
  it('renders a div with a background color', () => {
    const actual = mount(<ColorPreview color="colorRed" />);
    expect(actual).toContainReactComponent('div', {
      style: {background: 'rgb(222, 54, 24)'},
    });
  });

  it('renders circle color preview', () => {
    const actual = mount(
      <ColorPreview color="colorRed" type={ColorPreviewType.Circle} />,
    );
    expect(actual).toContainReactComponent('div', {
      className: 'Circle',
    });
  });

  it('renders square color preview', () => {
    const actual = mount(
      <ColorPreview color="colorRed" type={ColorPreviewType.Square} />,
    );
    expect(actual).toContainReactComponent('div', {
      className: 'Square',
    });
  });
});
