import {useState} from 'react';

export {META as default} from './meta';

import {LineChart} from '../LineChart';

export const DynamicData = () => {
  const [data, setData] = useState({
    name: 'Sales',
    data: [
      {value: 100, key: '2020-04-01T12:00:00'},
      {value: 99, key: '2020-04-02T12:00:00'},
      {value: 1000, key: '2020-04-03T12:00:00'},
      {value: 2, key: '2020-04-04T12:00:00'},
      {value: 22, key: '2020-04-05T12:00:00'},
      {value: 6, key: '2020-04-06T12:00:00'},
      {value: 5, key: '2020-04-07T12:00:00'},
    ],
  });

  const onClick = () => {
    const newData = data.data.map(({key}) => {
      const newValue = Math.floor(Math.random() * 200);
      return {
        key,
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
      <LineChart data={[data]} />
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
