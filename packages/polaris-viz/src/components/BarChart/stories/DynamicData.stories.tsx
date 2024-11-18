import {useState} from 'react';

import {BarChart} from '../BarChart';

import {META} from './meta';

export const DynamicData = () => {
  const [data, setData] = useState([
    {
      name: 'BCFM 2019',
      data: [
        {
          key: 'Womens Leggings',
          value: 3,
        },
        {
          key: 'Mens Bottoms',
          value: 7,
        },
        {
          key: 'Mens Shorts',
          value: 4,
        },
      ],
    },
    {
      name: 'BCFM 2020',
      data: [
        {
          key: 'Womens Leggings',
          value: 1,
        },
        {
          key: 'Mens Bottoms',
          value: 2,
        },
        {
          key: 'Mens Shorts',
          value: 5,
        },
      ],
    },
  ]);

  const onClick = () => {
    const newData = data.map((series) => {
      return {
        ...series,
        data: series.data.map(({key}) => {
          const newValue = Math.floor(Math.random() * 200);
          return {
            key,
            value: newValue,
          };
        }),
      };
    });

    setData(newData);
  };

  return (
    <>
      <div style={{height: '500px', width: 800}}>
        <BarChart data={data} showLegend={true} />
      </div>
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
    </>
  );
};

export default {...META, title: 'polaris-viz/Charts/BarChart/DynamicData'} as any;