import {mount} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import {createHost} from '@react-spring/animated';

import {usePolarisVizContext} from '../../../hooks';
import {PolarisVizProvider} from '../PolarisVizProvider';
import {PolarisVizContext} from '../../../contexts';
import {
  DARK_THEME,
  DEFAULT_COMPONENTS,
  DEFAULT_THEME_NAME,
} from '../../../constants';

const MockChild = ({theme = DEFAULT_THEME_NAME}) => {
  const {themes} = usePolarisVizContext();
  return <div>{JSON.stringify(themes[theme])}</div>;
};

const MockSVGChild = () => {
  const {components} = usePolarisVizContext();
  return <div>{JSON.stringify(components)}</div>;
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

  describe('themes', () => {
    it('allows children to access the default theme', () => {
      const vizProvider = mount(
        <PolarisVizProvider animated={host.animated}>
          <MockChild />
        </PolarisVizProvider>,
      );

      expect(vizProvider).toContainReactText(JSON.stringify(DARK_THEME));
    });

    it('passes custom themes to children', () => {
      const vizProvider = mount(
        <PolarisVizProvider
          themes={{
            Dark: {
              bar: {
                borderRadius: 3,
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
          ...DARK_THEME,
          bar: {
            ...DARK_THEME.bar,
            borderRadius: 3,
          },
        }),
      );
    });
  });

  describe('components', () => {
    it('allows children to access default components', () => {
      const vizProvider = mount(
        <PolarisVizProvider animated={host.animated}>
          <MockSVGChild />
        </PolarisVizProvider>,
      );

      expect(vizProvider).toContainReactText(
        JSON.stringify(DEFAULT_COMPONENTS),
      );
    });
  });
});
