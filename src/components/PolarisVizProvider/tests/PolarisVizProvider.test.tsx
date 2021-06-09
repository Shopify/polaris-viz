import React from 'react';
import {mount} from '@shopify/react-testing';

import {usePolarisVizContext} from '../../../hooks';
import {PolarisVizProvider} from '../PolarisVizProvider';
import {PolarisVizContext} from '../../../utilities/';
import {DefaultTheme} from '../../../constants';

const MockChild = ({theme = 'Default'}) => {
  const {themes} = usePolarisVizContext();
  return <div>{JSON.stringify(themes[theme])}</div>;
};

describe('<PolarisVizProvider />', () => {
  it('renders <PolarisVizContext.Provider>', () => {
    const vizProvider = mount(
      <PolarisVizProvider>
        <MockChild />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactComponent(PolarisVizContext.Provider);
  });

  it('allows children to access the default theme', () => {
    const vizProvider = mount(
      <PolarisVizProvider>
        <MockChild />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactText(JSON.stringify(DefaultTheme));
  });

  it('passes custom themes to children', () => {
    const vizProvider = mount(
      <PolarisVizProvider
        themes={{
          Dark: {
            barOptions: {
              hasRoundedCorners: false,
            },
          },
        }}
      >
        <MockChild theme="Dark" />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactText(
      JSON.stringify({
        ...DefaultTheme,
        barOptions: {
          ...DefaultTheme.barOptions,
          hasRoundedCorners: false,
        },
      }),
    );
  });
});
