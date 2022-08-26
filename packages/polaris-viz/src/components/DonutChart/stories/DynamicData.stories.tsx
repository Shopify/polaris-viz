import React, {useState} from 'react';

export {META as default} from './meta';

import {DonutChart} from '../DonutChart';

export const DynamicData = () => {
  const [data, setData] = useState([
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 4000}],
    },
    {
      name: 'Other',
      data: [{key: 'april - march', value: 4000}],
    },
  ]);

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
    <>
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
    </>
  );
};
