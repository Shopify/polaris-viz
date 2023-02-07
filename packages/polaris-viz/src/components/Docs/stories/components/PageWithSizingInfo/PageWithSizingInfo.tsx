import { Fragment } from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import {Banner} from '../Banner';

export function PageWithSizingInfo() {
  return (
    <Fragment>
      <Title />
      <Subtitle />
      <Description />
      <Banner type="Info">
        This component inherits its height and width from its container. If no
        parent height can be calculated, the chart will use the{' '}
        <code>ChartContainer.minHeight</code> defined in the <code>Theme</code>.
      </Banner>
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Fragment>
  );
}
