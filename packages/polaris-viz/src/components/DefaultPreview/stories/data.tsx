import type {Story} from '@storybook/react';

import type {DefaultPreviewProps} from '../DefaultPreview';
import {DefaultPreview} from '../DefaultPreview';

export const Template: Story<DefaultPreviewProps> = (
  args: DefaultPreviewProps,
) => {
  return <DefaultPreview {...args} />;
};
