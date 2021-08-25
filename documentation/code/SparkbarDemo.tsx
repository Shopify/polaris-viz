import React from 'react';

import {Sparkbar} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function SparkbarDemo() {
  const innerContainerStyle = {
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <div style={{width: 200, height: 150}}>
          <Sparkbar
            isAnimated
            data={[100, 200, 300, 400, 400, 1000, 200, 800, 900, 200, 400]}
            comparison={[
              {x: 0, y: 500},
              {x: 1, y: 500},
              {x: 2, y: 500},
              {x: 3, y: 500},
              {x: 4, y: 500},
              {x: 5, y: 500},
              {x: 6, y: 500},
              {x: 7, y: 500},
              {x: 8, y: 500},
              {x: 9, y: 500},
              {x: 10, y: 500},
            ]}
          />
        </div>
      </div>
    </div>
  );
}
