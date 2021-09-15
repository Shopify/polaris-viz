import React from 'react';
import {mount} from '@shopify/react-testing';

import {mountWithProvider} from 'test-utilities';
import {DEFAULT_THEME, LIGHT_THEME} from 'consts';
import {usePolarisVizContext} from 'hooks/usePolarisVizContext';

describe('usePolarisVizContext', () => {
  function TestComponent() {
    const {themes} = usePolarisVizContext();
    return <div>{JSON.stringify(themes)}</div>;
  }

  it('exposes the default theme if used without a parent PolarisVizProvider', () => {
    const mockComponent = mount(<TestComponent />);

    expect(mockComponent.text()).toBe(
      JSON.stringify({
        Default: DEFAULT_THEME,
        Light: LIGHT_THEME,
      }),
    );
  });

  it('exposes the default values overwritten by PolarisVizProvider', () => {
    const mockComponent = mountWithProvider(<TestComponent />, {
      themes: {
        Default: {
          chartContainer: {
            backgroundColor: 'purple',
          },
        },
      },
    });

    expect(mockComponent.text()).toBe(
      JSON.stringify({
        Default: {
          ...DEFAULT_THEME,
          chartContainer: {
            ...DEFAULT_THEME.chartContainer,
            backgroundColor: 'purple',
          },
        },
        Light: LIGHT_THEME,
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
        Default: DEFAULT_THEME,
        Light: LIGHT_THEME,
        SomeOtherTheme: {
          ...DEFAULT_THEME,
          chartContainer: {
            ...DEFAULT_THEME.chartContainer,
            backgroundColor: 'purple',
          },
        },
      }),
    );
  });
});
