import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {Sparkline} from '../../src/components';

import {OUTER_CONTAINER_STYLE} from './constants';

export function SparklineDemo() {
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
        <div style={{width: 200, height: 150}}>
          <Sparkline
            isAnimated
            series={[
              {
                color: 'colorTeal',
                areaStyle: 'gradient',
                data: [
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
                ],
              },
              {
                color: 'pastComparison',
                areaStyle: 'none',
                lineStyle: 'dashed',
                data: [
                  {x: 0, y: 10},
                  {x: 1, y: 20},
                  {x: 2, y: 30},
                  {x: 3, y: 40},
                  {x: 4, y: 40},
                  {x: 5, y: 400},
                  {x: 6, y: 20},
                  {x: 7, y: 80},
                  {x: 8, y: 90},
                  {x: 9, y: 20},
                  {x: 10, y: 40},
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
