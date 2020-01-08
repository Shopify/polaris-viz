import React from 'react';
import {mount} from '@shopify/react-testing';
import {BarLabel} from '../BarLabel';

describe('<BarLabel />', () => {
  describe('renders props', () => {
    it('renders BarLabel with props', async () => {
      const barLabel = mount(
        <BarLabel label="Google" value="200" color="rgb(255, 255, 255)" />,
      );

      expect(barLabel.text()).toContain('Google');
      expect(barLabel.text()).toContain('200');
    });
  });
});
