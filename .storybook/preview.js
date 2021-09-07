import React from 'react';
import {PolarisVizProvider} from '../src/components';
import {DEFAULT_THEME, LIGHT_THEME} from '../src/constants';
import {useTheme} from '../src/hooks';
export const parameters = {
  options: {
    storySort: {
      order: ['Providers', 'Charts', 'Subcomponents'],
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
        <Container theme={context.args.theme} viewMode={context.viewMode}>
          <Story />
        </Container>
      </PolarisVizProvider>
    );
  },
];

interface ContainerProps {
  theme: string;
  viewMode: String;
}

const Container = ({children, theme, viewMode}: ContainerProps) => {
  const selectedTheme = useTheme(theme);

  return (
    <div
      style={{
        padding: 'calc(1rem + 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        margin: '-1rem',
        background: selectedTheme.chartContainer.backgroundColor,
        minHeight: viewMode !== 'docs' ? '100vh' : undefined,
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
