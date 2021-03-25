import React, {useState} from 'react';

import {BarChartDemo, SparklineDemo} from '../documentation/code';

export default function Playground() {
  const [show, setShow] = useState('bar');

  return (
    <div style={{height: 300, width: '100%', fontFamily: 'sans'}}>
      <button
        onClick={() => setShow(show === 'sparkline' ? 'bar' : 'sparkline')}
      >
        Show {show === 'sparkline' ? 'bar' : 'sparkline'}
      </button>

      {show === 'sparkline' ? <SparklineDemo /> : <BarChartDemo />}
    </div>
  );
}
