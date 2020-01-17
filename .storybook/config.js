import React from 'react';
import {configure, addParameters, addDecorator} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withContexts} from '@storybook/addon-contexts/react';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';

addParameters({
  options: {
    panelPosition: 'bottom',
    theme: create({
      base: 'light',
      brandTitle: 'Shopify Polaris Viz Storybook',
      brandUrl: '/',
      brandImage: null,
      appBorderRadius: 0,
      appBg: tokens.colorSkyLight,
      contentBg: tokens.colorSkyLight,
      textColor: tokens.colorInk,
      // TODO more pretty brand colors?
      // SEE https://github.com/storybooks/storybook/blob/next/docs/src/pages/configurations/theming/index.md
    }),
  },
});

addDecorator(function PaddingDecorator(story) {
  return <div style={{padding: '8px'}}>{story()}</div>;
});

function StrictModeToggle({isStrict = false, children}) {
  const Wrapper = isStrict ? React.StrictMode : React.Fragment;
  return <Wrapper>{children}</Wrapper>;
}

addDecorator(
  withContexts([
    {
      title: 'Strict Mode',
      components: [StrictModeToggle],
      params: [
        {name: 'Disabled', props: {isStrict: false}},
        {name: 'Enabled', default: true, props: {isStrict: true}},
      ],
    },
  ]),
);

// addon-console
setConsoleOptions((opts) => {
  // When transpiling TS using isolatedModules, the compiler doesn't strip
  // out exported types as it doesn't know if an item is a type or not.
  // Ignore those warnings as we don't care about them.
  // ignore color because the addon doesn't handle colored logs properly
  opts.panelExclude = [
    ...opts.panelExclude,
    /export .* was not found in/,
    /color: #999933;/,
  ];
  return opts;
});

configure(
  [
    // Playground stories
    require.context('../playground', true, /stories.tsx$/),
    // Component readme stories
    require.context('../src/components', true, /\/.+\/README.md$/),
  ],
  module,
);
