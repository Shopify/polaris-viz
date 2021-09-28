vlimport React from 'react';
import {mount} from '@shopify/react-testing';

import {VegaAdapter} from '../VegaAdapter';

describe('<VegaAdapter/>', () => {
  it('renders a <SquareColorPreview /> for each color', () => {
    mount(<VegaAdapter />);
  });
});
