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
      data: [
        {
          value: 126,
          key: 'Opens',
        },
        {
          value: Infinity,
          key: 'Added to carts',
        },
      ],
      name: 'Conversion',
    },
  ],
};
