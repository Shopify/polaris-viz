import type {Story} from '@storybook/react';

import {SimpleBarChart, SimpleBarChartProps} from '../../../../components';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<SimpleBarChartProps> = () => {
  return (
    <div style={{height: 600, width: 800}}>
      <SimpleBarChart
        data={[
          {
            name: 'BCFM 2019',
            data: [
              {
                key: 'Womens Leggings',
                value: 3,
              },
              {
                key: 'Mens Bottoms',
                value: Infinity,
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export const InfinityState = Template.bind({});
