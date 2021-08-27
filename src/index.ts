import './styles/global.scss';

export {
  Sparkline,
  Sparkbar,
  NormalizedStackedBarChart,
  BarChart,
  BarChartTooltipContent,
  LineChart,
  LineChartTooltipContent,
  StackedAreaChart,
  Legend,
  MultiSeriesBarChart,
  TooltipContent,
  LinePreview,
  SquareColorPreview,
  PolarisVizProvider,
} from './components';

export type {
  SparklineProps,
  SparkbarProps,
  NormalizedStackedBarChartProps,
  BarChartProps,
  BarChartTooltipContentProps,
  LineChartProps,
  LineChartTooltipContentProps,
  StackedAreaChartProps,
  MultiSeriesBarChartProps,
  TooltipContentProps,
  PolarisVizProviderProps,
} from './components';

export {DEFAULT_THEME as PolarisVizTheme} from './constants';

export {createTheme} from './utilities/create-themes';

export type {GradientStop} from './types';
