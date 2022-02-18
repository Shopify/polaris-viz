import React from 'react';
import {themes} from '@storybook/theming';
import {PolarisVizProvider} from '@shopify/polaris-viz';
import {
  DEFAULT_THEME,
  LIGHT_THEME,
} from '../packages/polaris-viz/src/constants';
import {useTheme} from '../packages/polaris-viz/src/hooks';

// https://github.com/storybookjs/storybook/issues/548
const storiesOrder = {
  Essentials: {
    Intro: null,
    'Web and Mobile Development': null,
    'Data Structure': null,
    Utilities: null,
    Themes: {
      'Default Themes': null,
      Customizing: null,
      'createTheme Utility': null,
    },
    Types: null,
  },
  'polaris-viz': {
    'Getting Started': null,
    'Spark Charts': null,
    'Simple Charts': null,
    'Default Charts': null,
    Subcomponents: null,
  },
  'polaris-viz-native': {
    'Getting Started': null,
    'Spark Charts': null,
    'Simple Charts': null,
    'Default Charts': null,
  },
  Playground: null,
};

const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const compareAlphabetical = (a, b) => a.localeCompare(b, {numeric: true});

export const compareStoryPaths = (order, path1, path2) => {
  if (path1.length === 0 && path2.length === 0) {
    return 0;
  } else if (path1.length === 0 && path2.length > 0) {
    // Path1 must be an ancestor of path2
    return -1;
  } else if (path1.length > 0 && path2.length === 0) {
    // Path2 must be an ancestor of path1
    return 1;
  }

  const [path1Head, ...path1Tail] = path1;
  const [path2Head, ...path2Tail] = path2;

  if (!order) {
    // No reference order, so just sort alphabetically
    const comp = compareAlphabetical(path1Head, path2Head);
    if (comp === 0) {
      return compareStoryPaths(null, path1Tail, path2Tail);
    } else {
      return comp;
    }
  }

  if (path1Head === path2Head) {
    // The two paths share the same head
    const key = path1Head;

    if (hasKey(order, key)) {
      return compareStoryPaths(order[key], path1Tail, path2Tail);
    } else {
      return compareStoryPaths(null, path1Tail, path2Tail);
    }
  }

  if (!hasKey(order, path1Head) && !hasKey(order, path2Head)) {
    return compareStoryPaths(null, path1, path2);
  } else if (hasKey(order, path1Head) && !hasKey(order, path2Head)) {
    return -1; // Give preference to path1, since it is included in the reference order
  } else if (!hasKey(order, path1Head) && hasKey(order, path2Head)) {
    return 1; // Give preference to path2, since it is included in the reference order
  } else {
    // If both heads are in the reference order, use the ordering of the keys in the reference order
    const orderKeys = Object.keys(order);

    return orderKeys.indexOf(path1Head) < orderKeys.indexOf(path2Head) ? -1 : 1;
  }
};

export const parameters = {
  docs: {
    theme: themes.dark,
  },
  options: {
    storySort: (a, b) => {
      const [story1Id, story1] = a;
      const [story2Id, story2] = b;

      const story1Path = [...story1.kind.split('/'), story1.name];
      const story2Path = [...story2.kind.split('/'), story2.name];

      return compareStoryPaths(storiesOrder, story1Path, story2Path);
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
            grid: {
              horizontalMargin: 20,
              horizontalOverflow: true,
            },
          },
          Light: {
            ...LIGHT_THEME,
            chartContainer: {
              ...LIGHT_THEME.chartContainer,
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
        <Container
          height={context.parameters.previewHeight}
          theme={context.args.theme}
        >
          <Story />
        </Container>
      </PolarisVizProvider>
    );
  },
];

interface ContainerProps {
  theme: string;
}

const Container = ({children, theme, height = 400}: ContainerProps) => {
  const selectedTheme = useTheme(theme);

  return (
    <div
      style={{
        padding: 'calc(1rem + 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        margin: '-1rem',
        background: selectedTheme.chartContainer.backgroundColor,
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          height: height,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
