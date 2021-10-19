import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinearGradient} from '../../../../../components/LinearGradient';
import {GradientDefs} from '../GradientDefs';

const MOCK_PROPS = {
  theme: 'Light',
  width: 100,
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

  describe('colorOverrides', () => {
    it('renders <LinearGradient /> for color overrides', () => {
      const container = mount(
        <svg>
          <GradientDefs
            {...MOCK_PROPS}
            colorOverrides={[{id: 'red', color: 'red'}]}
          />
        </svg>,
      );

      const gradient = container.find(LinearGradient);

      expect(gradient?.props.id).toStrictEqual('red');
    });
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

      expect(gradient?.props.id).toStrictEqual('Light-grad--0');
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

      expect(gradient?.props.id).toStrictEqual('CustomTheme-grad--0');
    });
  });
});
