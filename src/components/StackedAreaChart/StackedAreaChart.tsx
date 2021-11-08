import React, {useLayoutEffect, useRef, useState, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {SkipLink} from '../SkipLink';
import type {
  StringLabelFormatter,
  NumberLabelFormatter,
  Dimensions,
} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {getPrintFriendlyTheme, uniqueId} from '../../utilities';
import {usePrintResizing, useResizeObserver, useTheme} from '../../hooks';

import {Chart} from './Chart';
import type {Series, RenderTooltipContentData} from './types';
import styles from './Chart.scss';

export interface StackedAreaChartProps {
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  xAxisOptions: {
    labels: string[];
    formatLabel?: StringLabelFormatter;
    hide?: boolean;
    wrapLabels?: boolean;
  };
  yAxisOptions?: {
    formatLabel?: NumberLabelFormatter;
  };
  series: Series[];
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
}

export function StackedAreaChart({
  xAxisOptions,
  yAxisOptions,
  series,
  renderTooltipContent,
  isAnimated = false,
  skipLinkText,
  theme,
}: StackedAreaChartProps) {
  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );

  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));

  const {ref, setRef, entry} = useResizeObserver();

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});
  const printFriendlyTheme = getPrintFriendlyTheme({isPrinting, theme});
  const selectedTheme = useTheme(printFriendlyTheme);

  const updateDimensions = useCallback(() => {
    if (entry != null) {
      const {width, height} = entry.contentRect;
      setChartDimensions((prevDimensions) => {
        if (
          prevDimensions != null &&
          width === prevDimensions.width &&
          height === prevDimensions.height
        ) {
          return prevDimensions;
        } else {
          return {width, height};
        }
      });
    }
  }, [entry]);

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
      }
    };
  }, [entry, debouncedUpdateDimensions, updateDimensions]);

  if (series.length === 0) {
    return null;
  }

  const yFormatter =
    yAxisOptions?.formatLabel ?? ((value: number) => value.toString());

  const xFormatter = xAxisOptions.formatLabel ?? ((value: string) => value);

  function renderDefaultTooltipContent({
    title,
    data,
  }: RenderTooltipContentData) {
    const formattedData = data.map(({color, label, value}) => ({
      color,
      label,
      value: yFormatter(value),
    }));

    return (
      <TooltipContent
        theme={printFriendlyTheme}
        title={title}
        data={formattedData}
      />
    );
  }

  return (
    <React.Fragment>
      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <div
        className={styles.Container}
        style={{
          background: selectedTheme.chartContainer.backgroundColor,
          padding: selectedTheme.chartContainer.padding,
        }}
        ref={setRef}
      >
        {chartDimensions == null ? null : (
          <Chart
            xAxisOptions={xAxisOptions}
            hideXAxis={xAxisOptions.hide ?? selectedTheme.xAxis.hide}
            series={series}
            formatXAxisLabel={xFormatter}
            formatYAxisLabel={yFormatter}
            dimensions={chartDimensions}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            isAnimated={isAnimated}
            theme={printFriendlyTheme}
          />
        )}
      </div>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
