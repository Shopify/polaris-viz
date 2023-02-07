import type {Story} from '@storybook/react';

import {LinePreview, LinePreviewProps} from '../LinePreview';

export const Template: Story<LinePreviewProps> = (args: LinePreviewProps) => {
  return <LinePreview {...args} />;
};
