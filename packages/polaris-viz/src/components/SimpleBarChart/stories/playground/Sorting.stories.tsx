import { useState } from 'react';

import {SINGLE_SERIES} from '../data';

import {SimpleBarChart} from '../../SimpleBarChart';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const Sorting = () => {
  const [data, setData] = useState(SINGLE_SERIES);

  const onClick = () => {
    setData([
      {
        ...data[0],
        data: [...data[0].data].sort(() => (Math.random() > 0.5 ? 1 : -1)),
      },
    ]);
  };

  return (
    <>
      <div style={{height: '500px', width: 800}}>
        <SimpleBarChart
          data={[{...data[0], data: [...data[0].data.slice(0, 5)]}]}
          showLegend={true}
        />
      </div>
      <button onClick={onClick} style={{marginRight: 10}}>
        Shuffle Position
      </button>
    </>
  );
};
