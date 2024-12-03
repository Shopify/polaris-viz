import {useState} from 'react';

export {META as default} from './meta';

import {StackedAreaChart} from '../StackedAreaChart';

export const DynamicData = () => {
  const [data, setData] = useState({
    name: 'Sales',
    data: [
      {value: 100, key: '0'},
      {value: 99, key: '1'},
      {value: 1000, key: '2'},
      {value: 2, key: '3'},
      {value: 22, key: '4'},
      {value: 6, key: '5'},
      {value: 5, key: '6'},
    ],
  });

  const onClick = () => {
    const dataLength = Math.floor(Math.random() * 10) + 2;
    const newData = [...Array(dataLength)].map((_, index) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        key: String(index),
        value: newValue,
      };
    });

    setData({
      name: data.name,
      data: newData,
    });
  };

  return (
    <>
      <StackedAreaChart data={[data]} />
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
