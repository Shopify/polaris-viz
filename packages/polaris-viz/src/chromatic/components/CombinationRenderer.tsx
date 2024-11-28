import {ChartContext, DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';
import type {Attributes, FC} from 'react';
import {createElement, useMemo} from 'react';

import {DEFAULT_CHART_CONTEXT} from '../../storybook/constants';
import type {UserOptions} from '../types';

export interface CombinationRendererProps<T> {
  Component: FC<T>;
  props: T;
  options: UserOptions;
}

export function CombinationRenderer<T extends Attributes>({
  Component,
  props,
  options,
}: CombinationRendererProps<T>) {
  const {style} = options;

  const el = createElement(Component, props);

  const theme = (props as any).theme ?? DEFAULT_THEME_NAME;

  const values = useMemo(() => {
    return {
      ...DEFAULT_CHART_CONTEXT,
      theme: theme ?? DEFAULT_THEME_NAME,
      isTouchDevice: false,
    };
  }, [theme]);

  return (
    <ChartContext.Provider value={values}>
      <div style={style}>{el}</div>
    </ChartContext.Provider>
  );
}
