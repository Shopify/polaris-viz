import React from 'react';
import {mount} from '@shopify/react-testing';

import {mountWithProvider} from 'test-utilities';
import {DEFAULT_THEME} from 'consts';
import {useTheme} from 'hooks/useTheme';

describe('useTheme', () => {
  it('returns the default theme if no theme name is provided', () => {
    function TestComponent() {
      const theme = useTheme();
      return <div>{JSON.stringify(theme)}</div>;
    }

    const mockComponent = mount(<TestComponent />);
    expect(mockComponent.text()).toBe(JSON.stringify(DEFAULT_THEME));
  });

  it('returns the theme defined in PolarisVizContext with the provided theme name', () => {
    function TestComponent() {
      const theme = useTheme('SomeTheme');
      return <div>{JSON.stringify(theme)}</div>;
    }

    const mockComponent = mountWithProvider(<TestComponent />, {
      themes: {
        SomeTheme: {
          chartContainer: {
            backgroundColor: 'Purple',
          },
        },
      },
    });
    expect(mockComponent.text()).toBe(
      JSON.stringify({
        ...DEFAULT_THEME,
        chartContainer: {
          ...DEFAULT_THEME.chartContainer,
          backgroundColor: 'Purple',
        },
      }),
    );
  });

  it('throws an error if a theme with the given name cannot be found', () => {
    function TestComponent() {
      const theme = useTheme('SomeOtherTheme');
      return <div>{JSON.stringify(theme)}</div>;
    }

    expect(() => {
      mount(<TestComponent />);
    }).toThrow(
      `SomeOtherTheme theme not found. Did you forget to define it in the PolarisVizProvider?`,
    );
  });
});
