import React from 'react';
import {mount} from '@shopify/react-testing';

import {BarLabel} from '../BarLabel';

describe('<BarLabel />', () => {
  describe('renders props', () => {
    it('renders BarLabel with props', () => {
      const barLabel = mount(
        <BarLabel
          label="Google"
          value="200"
          color="rgb(255, 255, 255)"
          legendColors={{
            labelColor: 'red',
            valueColor: 'orange',
            trendIndicator: {
              positive: 'green',
              negative: 'red',
              neutral: 'grey',
            },
          }}
          orientation="horizontal"
          labelPosition="top-left"
        />,
      );

      expect(barLabel).toContainReactText('Google');
      expect(barLabel).toContainReactText('200');
    });
  });
});
