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
  ],
};

export const EmptyDataSeries = Template.bind({});

EmptyDataSeries.args = {
  data: [
    {
      name: 'BCFM 2019',
      data: [],
    },
  ],
};
