import React from 'react';

import {PolarisVizProvider, SparkLineChart} from '../../../../';
import {ComponentContainer, Title} from '../';

export function MobileComponents() {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(490px, 1fr))',
      }}
    >
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              padding: '0px',
            },
          },
        }}
      >
        <Title type="h3" style={{gridColumn: 'span 2'}}>
          Spark Charts
        </Title>

        <ComponentContainer
          title="SparkLineChart"
          description="Used in small sizes to show how a metric has performed over time. "
          link="https://polaris-viz.shopify.io/?path=/docs/spark-charts-sparklinechart--default"
          center
          chart={
            <div style={{width: '250px', height: '140px'}}>
              <SparkLineChart
                isAnimated
                data={[
                  {
                    data: [
                      {key: 0, value: 100},
                      {key: 1, value: 200},
                      {key: 2, value: 300},
                      {key: 3, value: 400},
                      {key: 4, value: 400},
                      {key: 5, value: 1000},
                      {key: 6, value: 200},
                      {key: 7, value: 800},
                      {key: 8, value: 900},
                      {key: 9, value: 200},
                      {key: 10, value: 400},
                    ],
                  },
                  {
                    isComparison: true,
                    data: [
                      {key: 0, value: 200},
                      {key: 1, value: 200},
                      {key: 2, value: 200},
                      {key: 3, value: 200},
                      {key: 4, value: 200},
                      {key: 5, value: 200},
                      {key: 6, value: 200},
                      {key: 7, value: 200},
                      {key: 8, value: 200},
                      {key: 9, value: 200},
                      {key: 10, value: 200},
                    ],
                  },
                ]}
              />
            </div>
          }
        />
      </PolarisVizProvider>
    </div>
  );
}
