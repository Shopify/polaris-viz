import React from 'react';

import {Sparkline} from '../src/components';

export default function Playground() {
  return (
    <div style={{height: '80px', width: '300px', maxWidth: '100%'}}>
      <Sparkline
        color="colorPurple"
        useAnimation={true}
        includeArea={true}
        accessibilityLabel="hi"
        data={[
          {x: 0, y: 10000},
          {x: 1, y: 200},
          {x: 2, y: 3000},
          {x: 3, y: 400},
          {x: 4, y: 50},
          {x: 5, y: 10000},
          {x: 6, y: 1000},
          {x: 7, y: 800},
          {x: 8, y: 900},
          {x: 9, y: 100},
          {x: 10, y: 11000},
        ]}
      />
    </div>
  );
}
