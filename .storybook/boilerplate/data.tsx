import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import {ComponentName, ComponentNameProps} from '../ComponentName';

export const Template: Story<ComponentNameProps> = (
  args: ComponentNameProps,
) => {
  return <ComponentName {...args} />;
};

export const DEFAULT_DATA: DataSeries[] = [];
