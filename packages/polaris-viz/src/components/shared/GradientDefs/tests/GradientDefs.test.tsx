import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinearGradient} from '../../../LinearGradient';
import {GradientDefs} from '../GradientDefs';

const MOCK_PROPS = {
  theme: 'Light',
  width: 100,
  id: 'id',
};

describe('<GradientDefs />', () => {
  it('renders <defs>', () => {
    const container = mount(
      <svg>
        <GradientDefs {...MOCK_PROPS} />
      </svg>,
    );

    expect(container).toContainReactComponent('defs');
  });

  describe('seriesColors', () => {
    it('renders <LinearGradient /> for series colors', () => {
      const container = mount(
        <svg>
          <GradientDefs
            {...MOCK_PROPS}
            seriesColors={[
              [
                {offset: 0, color: 'red'},
                {offset: 100, color: 'blue'},
              ],
            ]}
          />
        </svg>,
      );

      const gradient = container.find(LinearGradient);

      expect(gradient?.props.id).toStrictEqual('id-Light-0-grad');
    });
  });

  describe('theme', () => {
    it('provides an id for the passed theme', () => {
      const container = mount(
        <svg>
          <GradientDefs
            {...MOCK_PROPS}
            seriesColors={[
              [
                {offset: 0, color: 'red'},
                {offset: 100, color: 'blue'},
              ],
            ]}
            theme="CustomTheme"
          />
        </svg>,
      );

      const gradient = container.find(LinearGradient);

      expect(gradient?.props.id).toStrictEqual('id-CustomTheme-0-grad');
    });
  });
});
