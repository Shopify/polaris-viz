import React from 'react';
import {mount} from '@shopify/react-testing';

import {HorizontalGridLines} from './HorizontalGridLines';

describe('<HorizontalGridLines />', () => {
  describe('ticks', () => {
    it('renders a line for each tick', () => {
      const actual = mount(
        <svg>
          <HorizontalGridLines
            ticks={[
              {value: 10, formattedValue: '$10', yOffset: 0},
              {value: 10, formattedValue: '$8', yOffset: 10},
            ]}
            color="red"
            transform={{x: 10, y: 20}}
            width={100}
          />
          ,
        </svg>,
      );

      expect(actual).toContainReactComponentTimes('line', 2);
    });
  });

  describe('color, transform, width', () => {
    it('renders with style attributes', () => {
      const actual = mount(
        <svg>
          <HorizontalGridLines
            ticks={[{value: 10, formattedValue: '$10', yOffset: 0}]}
            color="red"
            transform={{x: 10, y: 20}}
            width={100}
          />
          ,
        </svg>,
      );

      expect(actual).toContainReactComponent('line', {
        x2: 100,
        transform: `translate(10,20)`,
        stroke: 'red',
      });
    });
  });
});
