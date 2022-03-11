import React from 'react';
import {mount} from '@shopify/react-testing';

import {Bar} from '../Bar';
import type {BarProps} from '../Bar';

const MOCK_PROPS: BarProps = {
  color: 'red',
  height: 10,
  width: 100,
  x: 5,
  y: 10,
  transform: 'scaleX(-10)',
};

describe('<Bar />', () => {
  it('renders a path', () => {
    const bar = mount(
      <svg>
        <Bar {...MOCK_PROPS} />
      </svg>,
    );
    expect(bar).toContainReactComponent('path');
  });

  it('transforms the path', () => {
    const bar = mount(
      <svg>
        <Bar {...MOCK_PROPS} />
      </svg>,
    );
    const path = bar.find('path');

    expect(path?.props?.style?.transform).toStrictEqual(
      ' translate(5px, 10px) scaleX(-10)',
    );
  });
});
