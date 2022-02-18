import React from 'react';
import {mount} from '@shopify/react-testing';

import {Area} from '../Area';

const mockProps = {
  color: 'red',
  areaPath: '',
  immediate: false,
};

describe('Area', () => {
  it('renders an area', () => {
    const actual = mount(
      <svg>
        <Area {...mockProps} />
      </svg>,
    );

    expect(actual).toContainReactComponentTimes('path', 2);
  });

  it('adds classname when immediate=false', () => {
    const actual = mount(
      <svg>
        <Area {...mockProps} />
      </svg>,
    );

    const paths = actual.findAll('path');

    expect(paths[0].props.className).toStrictEqual('Area');
  });

  it('does not add classname when immediate=true', () => {
    const actual = mount(
      <svg>
        <Area {...mockProps} immediate />
      </svg>,
    );

    const paths = actual.findAll('path');

    expect(paths[0].props.className).toBeUndefined();
  });
});
