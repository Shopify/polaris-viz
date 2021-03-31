import React, {useState, useLayoutEffect, useRef} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {Color, Data} from 'types';

import {SkipLink} from '../SkipLink';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';
import {getDefaultColor, uniqueId} from '../../utilities';

import {TooltipContent} from './components';
import {Chart} from './Chart';
import {BarMargin, RenderTooltipContentData} from './types';

export interface BarChartProps {
  data: Data[];
  barMargin?: keyof typeof BarMargin;
  color?: Color;
  highlightColor?: Color;
  formatXAxisLabel?: StringLabelFormatter;
  formatYAxisLabel?: NumberLabelFormatter;
  timeSeries?: boolean;
  skipLinkText?: string;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  hasRoundedCorners?: boolean;
  isAnimated?: boolean;
}

export function BarChart({
  data,
  color = getDefaultColor(),
  highlightColor = getDefaultColor(),
  barMargin = 'Medium',
  timeSeries = false,
  hasRoundedCorners = false,
  formatXAxisLabel = (value) => value.toString(),
  formatYAxisLabel = (value) => value.toString(),
  renderTooltipContent,
  skipLinkText,
  isAnimated = false,
}: BarChartProps) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const skipLinkAnchorId = useRef(uniqueId('barChart'));

  const [updateDimensions] = useDebouncedCallback(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }
  }, 100);

  useLayoutEffect(() => {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef, updateDimensions]);

  function renderDefaultTooltipContent({
    label,
    value,
  }: RenderTooltipContentData) {
    const formattedLabel = formatXAxisLabel(label);
    const formattedValue = formatYAxisLabel(value);

    return <TooltipContent label={formattedLabel} value={formattedValue} />;
  }

  return (
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
      {chartDimensions == null ? null : (
        <React.Fragment>
          {skipLinkText == null || skipLinkText.length === 0 ? null : (
            <SkipLink anchorId={skipLinkAnchorId.current}>
              {skipLinkText}
            </SkipLink>
          )}
          <Chart
            data={data}
            chartDimensions={chartDimensions}
            barMargin={BarMargin[barMargin]}
            color={color}
            highlightColor={highlightColor}
            formatXAxisLabel={formatXAxisLabel}
            formatYAxisLabel={formatYAxisLabel}
            timeSeries={timeSeries}
            hasRoundedCorners={hasRoundedCorners}
            isAnimated={isAnimated}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
          />
          {skipLinkText == null || skipLinkText.length === 0 ? null : (
            <SkipLink.Anchor id={skipLinkAnchorId.current} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
