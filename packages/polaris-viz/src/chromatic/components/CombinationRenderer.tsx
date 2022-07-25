import React, {Attributes, FC} from 'react';

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

  const el = React.createElement(Component, props);

  return <div style={style}>{el}</div>;
}
