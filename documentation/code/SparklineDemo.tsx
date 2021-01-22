import React from 'react';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {Sparkline} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function SparklineDemo() {
  const data = [
    {x: 0, y: 100},
    {x: 1, y: 200},
    {x: 2, y: 300},
    {x: 3, y: 400},
    {x: 4, y: 400},
    {x: 5, y: 1000},
    {x: 6, y: 200},
    {x: 7, y: 800},
    {x: 8, y: 900},
    {x: 9, y: 200},
    {x: 10, y: 400},
  ];

  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>
        <div
          style={{
            width: '200px',
            height: '50px',
          }}
        >
          <Sparkline
            color="primary"
            isAnimated
            areaFillStyle="gradient"
            accessibilityLabel="Customer growth over time"
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
