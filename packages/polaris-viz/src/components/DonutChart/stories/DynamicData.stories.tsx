import { useState } from 'react';

import {META} from './meta';

import {DonutChart} from '../DonutChart';

import {DEFAULT_DATA} from './data';

export const DynamicData = () => {
  const [data, setData] = useState(DEFAULT_DATA);

  const onClick = () => {
    const newData = data.map((item) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        ...item,
        data: [
          {
            ...item.data[0],
            value: newValue,
          },
        ],
      };
    });
    setData(newData);
  };

  return (
    <div style={{width: 550, height: 400}}>
      <DonutChart data={data} />
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
        onClick={onClick}
      >
        Change Data
      </button>
    </div>
  );
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/DynamicData'} as any;