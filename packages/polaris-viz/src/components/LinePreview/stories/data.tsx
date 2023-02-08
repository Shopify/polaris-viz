import type {Story} from '@storybook/react';

import type {LinePreviewProps} from '../LinePreview';
import {LinePreview} from '../LinePreview';

export const Template: Story<LinePreviewProps> = (args: LinePreviewProps) => {
  return <LinePreview {...args} />;
};
