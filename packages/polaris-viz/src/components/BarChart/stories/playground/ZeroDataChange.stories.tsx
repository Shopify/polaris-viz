import type {StoryFn} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../../components';
import {META} from '../meta';
import {useState} from 'react';

export default {
  ...META,
  title: 'polaris-viz/Charts/BarChart/Playground/ZeroDataChange',
} as any;

const DATA = [
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 3,
        key: '1',
      },
      {
        value: 0,
        key: '2',
      },
      {
        value: 0,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
      {
        value: 1,
        key: '5',
      },
      {
        value: 0,
        key: '6',
      },
      {
        value: 4,
        key: '7',
      },
      {
        value: 3,
        key: '8',
      },
      {
        value: 4,
        key: '9',
      },
      {
        value: 8,
        key: '10',
      },
      {
        value: 8,
        key: '11',
      },
      {
        value: 5,
        key: '12',
      },
      {
        value: 7,
        key: '13',
      },
      {
        value: 5,
        key: '14',
      },
    ],
    name: 'First-time',
  },
];

const ZERO_DATA = [
  {...DATA[0], data: DATA[0].data.map((data) => ({...data, value: 0}))},
];

const Template: StoryFn<BarChartProps> = () => {
  const [data, setData] = useState(DATA);

  return (
    <>
      <button
        onClick={() => {
          console.warn('SWAP');
          setData((data) => {
            return data === DATA ? ZERO_DATA : DATA;
          });
        }}
      >
        Flip
      </button>
      <div style={{width: 600, height: 400}}>
        <BarChart data={data} />
      </div>
    </>
  );
};

export const ZeroData = Template.bind({});
