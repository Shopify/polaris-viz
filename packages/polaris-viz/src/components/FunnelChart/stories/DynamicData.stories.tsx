import React, {useState} from 'react';

export {META as default} from './meta';

import {FunnelChart} from '../../../components';

export const DynamicData = () => {
  const [data, setData] = useState({
    name: 'Sales',
    data: [
      {value: 100, key: 'Opens'},
      {value: 80, key: 'Visitors'},
      {value: 50, key: 'Added to cart'},
      {value: 0, key: 'Orders'},
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
    <div style={{height: 400}}>
      <FunnelChart data={[data]} />
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
