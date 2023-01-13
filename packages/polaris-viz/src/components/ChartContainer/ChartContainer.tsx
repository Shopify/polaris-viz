import type {ReactElement} from 'react';
import {useState, useMemo} from 'react';
import type {
  DataGroup,
  DataSeries,
  InternalChartType,
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
  isAnimated: boolean;
  theme: string;
  id?: string;
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
    };
  }, [
    id,
    isPrinting,
    prefersReducedMotion,
    props.isAnimated,
    props.theme,
    dataTooBigToAnimate,
  ]);

  const {chartContainer} = useTheme(value.theme);

  return (
    <ChartContext.Provider value={value}>
      <div
        className={styles.ChartContainer}
        style={{
          background: chartContainer.backgroundColor,
          padding: chartContainer.padding,
          borderRadius: chartContainer.borderRadius,
        }}
        id={getChartId(value.id)}
      >
        <ChartDimensions
          data={props.data}
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
