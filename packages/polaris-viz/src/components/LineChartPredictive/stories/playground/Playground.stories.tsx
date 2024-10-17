import {META} from '../meta';
import {Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const InfinityState = Template.bind({});

InfinityState.args = {
  data: [
    {
      name: 'NULL',
      data: [
        {
          key: 'Mon Nov 06 2023 23:00:00 GMT-0600 (Central Standard Time)',
          value: 0,
        },
        {
          key: 'Tue Nov 07 2023 23:00:00 GMT-0600 (Central Standard Time)',
          value: Infinity,
        },
      ],
    },
  ],
};

export const EmptyDataSeries = Template.bind({});

EmptyDataSeries.args = {
  data: [
    {
      name: 'NULL',
      data: [],
    },
  ],
};
