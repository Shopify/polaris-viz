import {Meta, StoryObj} from '@storybook/react';
import {Grid} from '../Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
};

export {META as default} from './meta';
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => <Grid />,
};
