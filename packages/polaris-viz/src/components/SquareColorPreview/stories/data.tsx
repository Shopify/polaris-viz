import type {Story} from '@storybook/react';

import type {SquareColorPreviewProps} from '../SquareColorPreview';
import {SquareColorPreview} from '../SquareColorPreview';

export const Template: Story<SquareColorPreviewProps> = (
  args: SquareColorPreviewProps,
) => {
  return <SquareColorPreview {...args} />;
};
