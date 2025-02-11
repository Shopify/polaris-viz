import type {ReactElement} from 'react';
import {useState, useMemo} from 'react';
import type {
  DataGroup,
  DataSeries,
  InternalChartType,
  ErrorBoundaryResponse,
  BoundingRect,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  ChartContext,
  isLargeDataSet,
  usePolarisVizContext,
  isTouchDevice,
  getComparisonSeriesIndexes,
} from '@shopify/polaris-viz-core';
import type {ChartContextValues} from '@shopify/polaris-viz-core/src/contexts';

import {EMPTY_BOUNDS} from '../../constants';
import {ChartErrorBoundary} from '../ChartErrorBoundary';
import {getChartId} from '../../utilities/getChartId';
import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';
import {useTheme, usePrefersReducedMotion} from '../../hooks';
import type {SkeletonType} from '../ChartSkeleton';

import styles from './ChartContainer.scss';
import {useContainerBounds} from './hooks/useContainerBounds';

export interface Props {
  children: ReactElement;
  data: DataSeries[] | DataGroup[];
  id: string | undefined;
  isAnimated: boolean;
  theme: string;
  onError?: ErrorBoundaryResponse;
  scrollContainer?: Element | null;
  sparkChart?: boolean;
  skeletonType?: SkeletonType;
  type?: InternalChartType;
}

export const ChartContainer = (props: Props) => {
  const id = props.id ?? uniqueId('chart');

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const [isPrinting, setIsPrinting] = useState(false);
  const {onError: onErrorProvider} = usePolarisVizContext();

  const dataTooBigToAnimate = useMemo(() => {
    return isLargeDataSet(props.data, props.type);
  }, [props.data, props.type]);

  const {containerBounds, updateContainerBounds, setRef} = useContainerBounds({
    onIsPrintingChange: setIsPrinting,
    scrollContainer: props.scrollContainer,
    sparkChart: props.sparkChart,
  });

  const value: ChartContextValues = useMemo(() => {
    const shouldAnimate =
      props.isAnimated && !prefersReducedMotion && !dataTooBigToAnimate;
    const printFriendlyTheme = isPrinting ? 'Print' : props.theme;

    const comparisonSeriesIndexes = getComparisonSeriesIndexes(props.data);

    const comparisonIndexes = comparisonSeriesIndexes.map(
      ({comparisonIndex}) => comparisonIndex,
    );

    return {
      shouldAnimate,
      id,
      characterWidths,
      characterWidthOffsets,
      theme: printFriendlyTheme,
      isTouchDevice: isTouchDevice(),
      isPerformanceImpacted: dataTooBigToAnimate,
      scrollContainer: props.scrollContainer,
      containerBounds: containerBounds ?? EMPTY_BOUNDS,
      comparisonSeriesIndexes,
      comparisonIndexes,
    };
  }, [
    id,
    isPrinting,
    prefersReducedMotion,
    props.isAnimated,
    props.theme,
    dataTooBigToAnimate,
    props.scrollContainer,
    containerBounds,
    props.data,
  ]);

  const {chartContainer, grid} = useTheme(value.theme);

  // If there is no vertical overflow and a custom padding is not defined,
  // add padding so that the top y-axis label is not cut off
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
        <div
          className={styles.ContainerBounds}
          ref={setRef}
          style={{
            minHeight: props.sparkChart
              ? chartContainer.sparkChartMinHeight
              : chartContainer.minHeight,
          }}
          onMouseEnter={updateContainerBounds}
          onFocus={updateContainerBounds}
          onTouchStart={updateContainerBounds}
        >
          {!hasValidBounds(value.containerBounds) ? null : (
            <ChartErrorBoundary
              type={props.skeletonType ?? 'Default'}
              containerBounds={value.containerBounds}
              data={props.data}
              onError={props.onError ?? onErrorProvider}
            >
              <div
                className={styles.Chart}
                style={{
                  height: value.containerBounds.height,
                  width: value.containerBounds.width,
                }}
              >
                {props.children}
              </div>
            </ChartErrorBoundary>
          )}
        </div>
      </div>
    </ChartContext.Provider>
  );
};

function hasValidBounds(containerBounds: BoundingRect) {
  return containerBounds.width > 0 && containerBounds.height > 0;
}
