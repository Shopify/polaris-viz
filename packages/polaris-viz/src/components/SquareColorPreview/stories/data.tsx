import type {Story} from '@storybook/react';

import {
  SquareColorPreview,
  SquareColorPreviewProps,
} from '../SquareColorPreview';

export const Template: Story<SquareColorPreviewProps> = (
  args: SquareColorPreviewProps,
) => {
  return <SquareColorPreview {...args} />;
};
