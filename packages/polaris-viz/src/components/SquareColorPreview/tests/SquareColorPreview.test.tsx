import React from 'react';
import {mount} from '@shopify/react-testing';

import {SquareColorPreview} from '../SquareColorPreview';
import {PREVIEW_ICON_SIZE} from '../../../constants';

describe('<SquareColorPreview/>', () => {
  it('renders a div with a background color', () => {
    const actual = mount(<SquareColorPreview color="rgb(222, 54, 24)" />);

    expect(actual).toContainReactComponent('span', {
      style: {
        background: 'rgb(222, 54, 24)',
        height: PREVIEW_ICON_SIZE,
        width: PREVIEW_ICON_SIZE,
      },
    });
  });
});
