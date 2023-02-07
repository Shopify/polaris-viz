import type {Story} from '@storybook/react';
import {Playground} from './Playground';

export default {
  title: 'shared/Accessability/Color Vision A11y',
};

const Template: Story = () => {
  return (
    <div style={{height: 500}}>
      <Playground />
    </div>
  );
};

export const Example = Template.bind({});
