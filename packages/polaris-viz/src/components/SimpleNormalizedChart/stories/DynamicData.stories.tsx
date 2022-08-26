import React, {useState} from 'react';
import {SimpleNormalizedChart} from '../SimpleNormalizedChart';
import {DEFAULT_DATA} from './data';

export {META as default} from './meta';

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
    <>
      <SimpleNormalizedChart data={data} direction="horizontal" size="small" />
      <button onClick={onClick}>Change Data</button>
    </>
  );
};
