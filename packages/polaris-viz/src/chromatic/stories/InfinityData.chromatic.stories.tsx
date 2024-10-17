import {storiesOf} from '@storybook/react';
import {
  BarChart,
  DonutChart,
  FunnelChart,
  LineChart,
  LineChartPredictive,
  LineChartRelational,
  PolarisVizProvider,
  SimpleBarChart,
  SimpleNormalizedChart,
  SparkBarChart,
  SparkLineChart,
  StackedAreaChart,
} from '../../components';

const CHARTS = {
  BarChart: BarChart,
  LineChart: LineChart,
  DonutChart: DonutChart,
  FunnelChart: FunnelChart,
  LineChartPredictive: LineChartPredictive,
  LineChartRelational: LineChartRelational,
  SimpleBarChart: SimpleBarChart,
  SimpleNormalizedChart: SimpleNormalizedChart,
  SparkBarChart: SparkBarChart,
  SparkLineChart: SparkLineChart,
  StackedAreaChart: StackedAreaChart,
};

const stories = storiesOf(`Chromatic/Infinity Data`, module).addParameters({
  chromatic: {disableSnapshot: false},
});

stories.add('Default', () => {
  return (
    <div style={{display: 'grid', gap: '20px'}}>
      <PolarisVizProvider>
        {Object.keys(CHARTS).map((key) => {
          const Chart = CHARTS[key];

          return (
            <>
              <p>
                <strong style={{color: 'black'}}>{key}</strong>
              </p>
              <div style={{height: 400, width: 800, display: 'block'}}>
                <Chart
                  data={[
                    {
                      name: 'Sep 30–Oct 6, 2024',
                      data: [
                        {
                          key: '9',
                          value: Infinity,
                        },
                        {
                          key: '10',
                          value: 0,
                        },
                      ],
                    },
                  ]}
                  isAnimated={false}
                />
              </div>
            </>
          );
        })}
      </PolarisVizProvider>
    </div>
  );
});
