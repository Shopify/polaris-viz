import React from 'react';

import {LineChart} from '../src/components';

export default function Playground() {
  const current = new Date();
  const previous = new Date().setDate(current.getDate() - 30);

  let arr = [];
  let dt = new Date(previous);

  while (dt <= current) {
    arr.push(dt.toDateString());
    dt.setDate(dt.getDate() + 1);
  }

  console.log(arr);

  const data = arr.map(x => createData(x, Math.floor(Math.random() * 5)));

  console.log(data);

  const series = [{
    data: data,
    name: "Sample",
    xAxisLabels: arr,
  }]


  return (
    <div style={{height: '501px', margin: '40px'}}>
      <LineChart series={series} />
    </div>
  );
}

function createData(x, y) {
  return {x: x, y: y == 0 ? null : y}
}
