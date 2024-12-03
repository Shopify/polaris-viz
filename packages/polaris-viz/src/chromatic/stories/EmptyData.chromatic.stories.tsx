import {storiesOf} from '@storybook/react';
import {BarChart} from '../../components/BarChart/BarChart';
import {DonutChart} from '../../components/DonutChart/DonutChart';
import {FunnelChart} from '../../components/FunnelChart/FunnelChart';
import {LineChart} from '../../components/LineChart/LineChart';
import {LineChartPredictive} from '../../components/LineChartPredictive/LineChartPredictive';
import {LineChartRelational} from '../../components/LineChartRelational/LineChartRelational';
import {PolarisVizProvider} from '../../components/PolarisVizProvider/PolarisVizProvider';
import {SimpleBarChart} from '../../components/SimpleBarChart/SimpleBarChart';
import {SimpleNormalizedChart} from '../../components/SimpleNormalizedChart/SimpleNormalizedChart';
import {SparkBarChart} from '../../components/SparkBarChart/SparkBarChart';
import {SparkLineChart} from '../../components/SparkLineChart/SparkLineChart';
import {StackedAreaChart} from '../../components/StackedAreaChart/StackedAreaChart';

const CHARTS = {
  BarChart: BarChart,
  LineChart: LineChart,
  DonutChart: DonutChart,
  FunnelChart: FunnelChart,
  LineChartPredictive: LineChartPredictive,
  SimpleBarChart: SimpleBarChart,
  SimpleNormalizedChart: SimpleNormalizedChart,
  SparkBarChart: SparkBarChart,
  SparkLineChart: SparkLineChart,
  StackedAreaChart: StackedAreaChart,
};

const stories = storiesOf(`Chromatic/Empty Data`, module).addParameters({
  chromatic: {disableSnapshot: false},
});

stories.add('Default', () => {
  return (
    <div style={{display: 'grid', gap: '20px'}}>
      <PolarisVizProvider>
        {Object.keys(CHARTS).map((key) => {
          const Chart = CHARTS[key];

          return (
            <Container title={key}>
              <Chart data={[]} isAnimated={false} />
            </Container>
          );
        })}

        <Container title="LineChartRelational">
          <LineChartRelational data={[]} isAnimated={false} />
        </Container>
      </PolarisVizProvider>
    </div>
  );
});

function Container({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <p>
        <strong style={{color: 'black'}}>{title}</strong>
      </p>
      <div style={{height: 400, width: 800, display: 'block'}}>{children}</div>
    </>
  );
}
