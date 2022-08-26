export {META as default} from './meta';

import {DEFAULT_PROPS, Template} from './data';

export const OverwrittenSeriesColors = Template.bind({});

OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Direct',
      data: [
        {
          key: 'April 2022',
          value: 200,
        },
      ],
      color: 'lime',
    },
    {
      name: 'Facebook',
      data: [
        {
          key: 'April 2022',
          value: 100,
        },
      ],
    },
    {
      name: 'Twitter',
      data: [
        {
          key: 'April 2022',
          value: 100,
        },
      ],
    },
    {
      name: 'Google',
      data: [
        {
          key: 'April 2022',
          value: 20,
        },
      ],
    },
  ],
};
