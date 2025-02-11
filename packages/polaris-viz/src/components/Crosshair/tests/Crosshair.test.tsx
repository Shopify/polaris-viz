import {mount} from '@shopify/react-testing';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {
  mockDefaultTheme,
  mountWithProvider,
} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {Crosshair} from '../Crosshair';

describe('<Crosshair />', () => {
  it('renders a rect centered on the given x', () => {
    const crosshair = mount(
      <svg>
        <Crosshair {...MOCK_PROPS} x={50} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {x: 50});
  });

  it('renders a rect with the given height', () => {
    const crosshair = mount(
      <svg>
        <Crosshair {...MOCK_PROPS} height={500} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {height: 500});
  });

  it('gives the rect full opacity by default', () => {
    const crosshair = mount(
      <svg>
        <Crosshair {...MOCK_PROPS} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {
      style: expect.objectContaining({opacity: 1}),
    });
  });

  it('applies opacity from props to the rect', () => {
    const crosshair = mount(
      <svg>
        <Crosshair {...MOCK_PROPS} opacity={0.8} />
      </svg>,
    );

    expect(crosshair).toContainReactComponent('rect', {
      style: expect.objectContaining({opacity: 0.8}),
    });
  });

  it('applies color from props to the rect', () => {
    const crosshair = mountWithProvider(
      <svg>
        <Crosshair {...MOCK_PROPS} />
      </svg>,
      mockDefaultTheme({crossHair: {color: 'red'}}),
    );

    expect(crosshair).toContainReactComponent('rect', {
      style: {opacity: 1, fill: 'red'},
    });
  });

  it('applies width from props to the rect', () => {
    const crosshair = mountWithProvider(
      <svg>
        <Crosshair {...MOCK_PROPS} />
      </svg>,
      mockDefaultTheme({crossHair: {width: 100}}),
    );

    expect(crosshair).toContainReactComponent('rect', {
      width: 100,
    });
  });
});

const MOCK_PROPS = {
  x: 0,
  height: 200,
  theme: DEFAULT_THEME_NAME,
};
