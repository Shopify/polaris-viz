import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinearGradient} from '../LinearGradient';

describe('<LinearGradient />', () => {
  it('renders a linearGradient with the ID that was passed down', () => {
    const actual = mount(
      <svg>
        <LinearGradient
          id="myGradient"
          startColor="rgba(71, 193, 191, 0)"
          endColor="rgba(71, 193, 191, 0.8)"
        />
        ,
      </svg>,
    );

    expect(actual).toContainReactComponent('linearGradient', {
      id: 'myGradient',
    });
  });

  it('renders a stop with the startColor prop', () => {
    const actual = mount(
      <svg>
        <LinearGradient
          id="myGradient"
          startColor="rgba(71, 193, 191, 0)"
          endColor="rgba(71, 193, 191, 0.8)"
        />
        ,
      </svg>,
    );

    expect(actual).toContainReactComponent('stop', {
      offset: '0%',
      style: {stopColor: 'rgba(71, 193, 191, 0)'},
    });
  });

  it('renders a stop with the endColor prop', () => {
    const actual = mount(
      <svg>
        <LinearGradient
          id="myGradient"
          startColor="rgba(71, 193, 191, 0)"
          endColor="rgba(71, 193, 191, 0.8)"
        />
        ,
      </svg>,
    );

    expect(actual).toContainReactComponent('stop', {
      offset: '100%',
      style: {stopColor: 'rgba(71, 193, 191, 0.8)'},
    });
  });

  it('renders a stop with a transition if one is provided', () => {
    const actual = mount(
      <svg>
        <LinearGradient
          id="myGradient"
          startColor="rgba(71, 193, 191, 0)"
          endColor="rgba(71, 193, 191, 0.8)"
          transition="a sweet transition"
        />
        ,
      </svg>,
    );

    expect(actual).toContainReactComponent('stop', {
      style: {
        stopColor: 'rgba(71, 193, 191, 0.8)',
        transition: 'a sweet transition',
      },
    });
  });
});
