import React from 'react';
import {mount} from '@shopify/react-testing';
import {Legend} from 'components';

describe('<Legend />', () => {
  it('throws an error if given a gradient color and line type', () => {
    expect(() =>
      mount(
        <Legend
          series={[
            {
              lineStyle: 'dashed',
              name: 'myseries',
              color: 'primaryGradient',
            },
          ]}
        />,
      ),
    ).toThrow('Gradients are not valid for line style legends.');
  });
});
