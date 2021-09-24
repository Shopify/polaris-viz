import React from 'react';
import {themes} from '@storybook/theming';
import {PolarisVizProvider} from '../src/components';
import {DEFAULT_THEME, LIGHT_THEME} from '../src/constants';
import {useTheme} from '../src/hooks';
export const parameters = {
  docs: {
    theme: themes.dark,
  },
  options: {
    storySort: {
      order: [
        'Docs',
        ['Intro', 'Getting started', 'Viz selection'],
        'Providers',
        'Charts',
        'Subcomponents',
        'Playground/Playground',
      ],
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              padding: '20px',
            },
          },
          Light: {
            chartContainer: {
              padding: '20px',
            },
          },
          NoSpline: {
            line: {hasSpline: false},
          },
          NoxAxisLabels: {
            xAxis: {hide: true},
          },
          NoOverflow: {grid: {horizontalOverflow: false}},
          Positive: {
            bar: {
              color: 'rgb(0, 164, 124)',
            },
          },
        }}
      >
        <Container theme={context.args.theme}>
          <Story />
        </Container>
      </PolarisVizProvider>
    );
  },
];

interface ContainerProps {
  theme: string;
}

const Container = ({children, theme}: ContainerProps) => {
  const selectedTheme = useTheme(theme);

  return (
    <div
      style={{
        padding: 'calc(1rem + 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        margin: '-1rem',
        background: selectedTheme.chartContainer.backgroundColor,
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          height: '400px',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
