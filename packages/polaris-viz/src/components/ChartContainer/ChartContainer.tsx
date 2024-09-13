import type {ReactElement} from 'react';
import {useState, useMemo} from 'react';
import type {
  DataGroup,
  DataSeries,
  InternalChartType,
  ErrorBoundaryResponse,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  ChartContext,
  isLargeDataSet,
} from '@shopify/polaris-viz-core';

import {getChartId} from '../../utilities/getChartId';
import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';
import {useTheme, usePrefersReducedMotion} from '../../hooks';
import type {SkeletonType} from '../ChartSkeleton';

import styles from './ChartContainer.scss';
import {ChartDimensions} from './components/';

interface Props {
  children: ReactElement;
  data: DataSeries[] | DataGroup[];
  id: string | undefined;
  isAnimated: boolean;
  theme: string;
  onError?: ErrorBoundaryResponse;
  scrollContainer?: HTMLElement | null;
  sparkChart?: boolean;
  skeletonType?: SkeletonType;
  type?: InternalChartType;
}

export const ChartContainer = (props: Props) => {
  const id = props.id ?? uniqueId('chart');

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [isPrinting, setIsPrinting] = useState(false);

  const dataTooBigToAnimate = useMemo(() => {
    return isLargeDataSet(props.data, props.type);
  }, [props.data, props.type]);

  const value = useMemo(() => {
    const shouldAnimate =
      props.isAnimated && !prefersReducedMotion && !dataTooBigToAnimate;
    const printFriendlyTheme = isPrinting ? 'Print' : props.theme;

    return {
      shouldAnimate,
      id,
      characterWidths,
      characterWidthOffsets,
      theme: printFriendlyTheme,
      isPerformanceImpacted: dataTooBigToAnimate,
      scrollContainer: props.scrollContainer,
    };
  }, [
    id,
    isPrinting,
    prefersReducedMotion,
    props.isAnimated,
    props.theme,
    dataTooBigToAnimate,
    props.scrollContainer,
  ]);

  const {chartContainer, grid} = useTheme(value.theme);

  // If there is no vertical overflow and a custom padding is not defined, add padding so that the top y-axis label is not cut off
  const padding =
    !grid.verticalOverflow && chartContainer.padding == null
      ? '3px 0 0 0'
      : chartContainer.padding;

  return (
    <ChartContext.Provider value={value}>
      <div
        className={styles.ChartContainer}
        style={{
          background: chartContainer.backgroundColor,
          padding,
          borderRadius: chartContainer.borderRadius,
        }}
        id={getChartId(value.id)}
      >
        <ChartDimensions
          data={props.data}
          onError={props.onError}
          onIsPrintingChange={setIsPrinting}
          skeletonType={props.skeletonType}
          sparkChart={props.sparkChart}
        >
          {props.children}
        </ChartDimensions>
      </div>
    </ChartContext.Provider>
  );
};
