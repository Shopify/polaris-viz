import {mount} from '@shopify/react-testing';

import {mountWithProvider} from '../../test-utilities';
import {
  DARK_THEME,
  DEFAULT_THEME_NAME,
  LIGHT_THEME,
  PRINT_THEME,
} from '../../constants';
import {usePolarisVizContext} from '../usePolarisVizContext';

describe('usePolarisVizContext', () => {
  function TestComponent() {
    const {themes} = usePolarisVizContext();
    return <div>{JSON.stringify(themes)}</div>;
  }

  it('exposes the default theme if used without a parent PolarisVizProvider', () => {
    const mockComponent = mount(<TestComponent />);

    expect(mockComponent.text()).toBe(
      JSON.stringify({
        Dark: DARK_THEME,
        Light: LIGHT_THEME,
      }),
    );
  });

  it('exposes the default values overwritten by PolarisVizProvider', () => {
    const mockComponent = mountWithProvider(<TestComponent />, {
      themes: {
        [DEFAULT_THEME_NAME]: {
          chartContainer: {
            backgroundColor: 'purple',
          },
        },
      },
    });

    expect(mockComponent.text()).toBe(
      JSON.stringify({
        Dark: {
          ...DARK_THEME,
          chartContainer: {
            ...DARK_THEME.chartContainer,
            backgroundColor: 'purple',
          },
        },
        Light: LIGHT_THEME,
        Print: PRINT_THEME,
      }),
    );
  });

  it('exposes custom themes created in PolarisVizProvider', () => {
    const mockComponent = mountWithProvider(<TestComponent />, {
      themes: {
        SomeOtherTheme: {
          chartContainer: {
            backgroundColor: 'purple',
          },
        },
      },
    });

    expect(mockComponent.text()).toBe(
      JSON.stringify({
        Dark: DARK_THEME,
        Light: LIGHT_THEME,
        Print: PRINT_THEME,
        SomeOtherTheme: {
          ...DARK_THEME,
          chartContainer: {
            ...DARK_THEME.chartContainer,
            backgroundColor: 'purple',
          },
        },
      }),
    );
  });
});
