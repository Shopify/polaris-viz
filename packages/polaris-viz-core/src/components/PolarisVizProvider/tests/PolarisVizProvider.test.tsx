import React from 'react';
import {mount} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import {createHost} from '@react-spring/animated';

import {usePolarisVizContext} from '../../../hooks';
import {PolarisVizProvider} from '../PolarisVizProvider';
import {PolarisVizContext} from '../../../contexts';
import {DEFAULT_THEME} from '../../../constants';

const MockChild = ({theme = 'Default'}) => {
  const {themes} = usePolarisVizContext();
  return <div>{JSON.stringify(themes[theme])}</div>;
};

const host = createHost({
  // eslint-disable-next-line id-length
  g: 'G',
});

describe('<PolarisVizProvider />', () => {
  it('renders <PolarisVizContext.Provider>', () => {
    const vizProvider = mount(
      <PolarisVizProvider animated={host.animated}>
        <MockChild />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactComponent(PolarisVizContext.Provider);
  });

  it('allows children to access the default theme', () => {
    const vizProvider = mount(
      <PolarisVizProvider animated={host.animated}>
        <MockChild />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactText(JSON.stringify(DEFAULT_THEME));
  });

  it('passes custom themes to children', () => {
    const vizProvider = mount(
      <PolarisVizProvider
        themes={{
          Dark: {
            bar: {
              hasRoundedCorners: false,
            },
          },
        }}
        animated={host.animated}
      >
        <MockChild theme="Dark" />
      </PolarisVizProvider>,
    );

    expect(vizProvider).toContainReactText(
      JSON.stringify({
        ...DEFAULT_THEME,
        bar: {
          ...DEFAULT_THEME.bar,
          hasRoundedCorners: false,
        },
      }),
    );
  });
});
