import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {
  LabelFormatter,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  useChartPositions,
} from '@shopify/polaris-viz-core';
import {scaleLinear} from 'd3-scale';

import {useResizeObserver} from '../../hooks/useResizeObserver';

import {GroupCell} from './components/GroupCell';
import styles from './Grid.scss';
import {Tooltip} from './components/Tooltip';
import {Arrows} from './components/Arrows';
import {XAxisLabels} from './components/XAxisLabels';
import {YAxisLabels} from './components/YAxisLabels';
import {GridBackground} from './components/GridBackground';
import {
  TOOLTIP_WIDTH,
  TOOLTIP_HEIGHT,
  TOOLTIP_HORIZONTAL_OFFSET,
  TOOLTIP_VERTICAL_OFFSET,
  TOOLTIP_PADDING,
  Y_AXIS_LABEL_WIDTH,
  X_AXIS_HEIGHT,
  DEFAULT_GROUP_COLOR,
  DEFAULT_TEXT_COLOR,
  SVG_OFFSET,
  SMALL_CONTAINER_WIDTH,
} from './utilities/constants';

type GridAxisOptions = {
  label?: string;
} & Partial<XAxisOptions> &
  Partial<YAxisOptions>;

export interface GridProps {
  labelFormatter?: LabelFormatter;
  cellGroups: CellGroup[];
  xAxisOptions?: GridAxisOptions;
  yAxisOptions?: GridAxisOptions;
  showGrid?: boolean;
  theme?: string;
}

export interface CellGroup {
  start: {row: number; col: number};
  end: {row: number; col: number};
  bgColor: string;
  color: string;
  name: string;
  description: string;
  goal: string | null;
  connectedGroups?: string[];
  secondaryValue: string;
  value: string;
}

interface TooltipInfo {
  x: number;
  y: number;
  placement: Placement;
  groupName: string;
  groupDescription: string;
  groupGoal: string;
}

type Placement = 'left' | 'bottom' | 'top' | 'right';

interface ChartPositions {
  chartXPosition: number;
  chartYPosition: number;
  drawableHeight: number;
  drawableWidth: number;
  xAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  yAxisBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export function Grid(props: GridProps) {
  const [xAxisHeight, setXAxisHeight] = useState(X_AXIS_HEIGHT);
  const [hoveredGroups, setHoveredGroups] = useState<Set<string>>(new Set());
  const [hoveredGroup, setHoveredGroup] = useState<CellGroup | null>(null);
  const {setRef, entry} = useResizeObserver();
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [tooltipHeight, setTooltipHeight] = useState(TOOLTIP_HEIGHT);
  const [isSmallContainer, setIsSmallContainer] = useState(false);

  const {
    cellGroups = [],
    xAxisOptions = {},
    yAxisOptions = {},
    isAnimated = DEFAULT_CHART_PROPS.isAnimated,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const dimensions = useMemo(
    () => ({
      width: entry?.contentRect.width ?? 0,
      height: entry?.contentRect.height ?? 0,
    }),
    [entry],
  );

  const gridDimensions = useMemo(() => {
    const maxRow = Math.max(...cellGroups.map((group) => group.end.row)) + 1;
    const maxCol = Math.max(...cellGroups.map((group) => group.end.col)) + 1;
    return {rows: maxRow, cols: maxCol};
  }, [cellGroups]);

  const fullChartWidth = dimensions.width - Y_AXIS_LABEL_WIDTH;
  const fullChartHeight = dimensions.height - X_AXIS_HEIGHT;

  const cellWidth = fullChartWidth / gridDimensions.cols;
  const cellHeight = fullChartHeight / gridDimensions.rows;

  const getActiveGroups = (group: CellGroup | null) => {
    if (!group) return new Set<string>();
    return new Set([group.name, ...(group.connectedGroups ?? [])]);
  };

  const getTooltipInfo = useCallback(
    (group: CellGroup, event: React.MouseEvent): TooltipInfo | null => {
      const rect = event.currentTarget.getBoundingClientRect();
      const containerRect = entry?.target?.getBoundingClientRect();

      if (!containerRect) return null;

      const leftSpace = rect.left - containerRect.left;
      const bottomSpace = containerRect.bottom - rect.bottom;

      let x: number;
      let y: number;
      let placement: Placement;

      if (leftSpace >= TOOLTIP_WIDTH) {
        x =
          rect.left -
          containerRect.left -
          TOOLTIP_WIDTH -
          TOOLTIP_HORIZONTAL_OFFSET;
        y = rect.top - containerRect.top;
        placement = 'left';
      } else if (bottomSpace >= tooltipHeight) {
        x = rect.left - containerRect.left + TOOLTIP_HORIZONTAL_OFFSET;
        y = rect.bottom - containerRect.top + TOOLTIP_HORIZONTAL_OFFSET;
        placement = 'bottom';
      } else {
        x = rect.left - containerRect.left + TOOLTIP_HORIZONTAL_OFFSET;
        y = rect.top - containerRect.top - TOOLTIP_VERTICAL_OFFSET;
        placement = 'top';
      }

      return {
        x,
        y,
        placement,
        groupName: group.name,
        groupDescription: group.description || '',
        groupGoal: group.goal || '',
      };
    },
    [entry, tooltipHeight],
  );

  const handleGroupHover = useCallback(
    (group: CellGroup | null, event: React.MouseEvent) => {
      if (isSmallContainer) {
        return;
      }

      if (group) {
        setHoveredGroups(getActiveGroups(group));
        setHoveredGroup(group);
        const tooltipInfo = getTooltipInfo(group, event);
        if (tooltipInfo) {
          setTooltipInfo(tooltipInfo);
        }
      } else {
        setHoveredGroups(new Set());
        setHoveredGroup(null);
        setTooltipInfo(null);
      }
    },
    [getTooltipInfo, isSmallContainer],
  );

  const rawChartPositions = useChartPositions({
    height: Math.max(fullChartHeight, 1),
    width: Math.max(fullChartWidth, 1),
    xAxisHeight: Math.max(xAxisHeight, 0),
    yAxisWidth: Y_AXIS_LABEL_WIDTH,
    annotationsHeight: 0,
  });

  const chartPositions: ChartPositions = useMemo(() => {
    const yAxisTotalWidth = Y_AXIS_LABEL_WIDTH;
    return {
      chartXPosition: rawChartPositions.chartXPosition ?? yAxisTotalWidth,
      chartYPosition: 0,
      drawableHeight: fullChartHeight,
      drawableWidth: fullChartWidth,
      xAxisBounds: {
        x: rawChartPositions.xAxisBounds?.x ?? yAxisTotalWidth,
        y: dimensions.height - xAxisHeight,
        width: fullChartWidth,
        height: xAxisHeight,
      },
      yAxisBounds: {
        x: 0,
        y: 0,
        width: Y_AXIS_LABEL_WIDTH,
        height: fullChartHeight,
      },
    };
  }, [
    rawChartPositions,
    dimensions,
    xAxisHeight,
    fullChartWidth,
    fullChartHeight,
  ]);

  const getColors = (group: CellGroup | null) => {
    if (group) {
      return {
        bgColor: group.bgColor || DEFAULT_GROUP_COLOR,
        textColor: group.color || DEFAULT_TEXT_COLOR,
      };
    }
    return {
      bgColor: DEFAULT_GROUP_COLOR,
      textColor: DEFAULT_TEXT_COLOR,
    };
  };

  const yTicks = useMemo(() => {
    return Array.from({length: gridDimensions.rows}, (_, index) => ({
      value: gridDimensions.rows - 1 - index,
      label: `${gridDimensions.rows - index}`,
      formattedValue: `${gridDimensions.rows - index}`,
      yOffset: index * cellHeight + cellHeight / 2,
    }));
  }, [cellHeight, gridDimensions.rows]);

  const xLabels = useMemo(
    () =>
      Array.from({length: gridDimensions.cols}, (_, index) => `${index + 1}`),
    [gridDimensions.cols],
  );

  const xAxisLabelWidth = fullChartWidth / xLabels.length;

  const xScale = useMemo(
    () =>
      scaleLinear().domain([0, gridDimensions.cols]).range([0, fullChartWidth]),
    [gridDimensions.cols, fullChartWidth],
  );

  const renderTooltip = () => {
    if (!tooltipInfo) return null;

    const {x, y, groupName, groupDescription, groupGoal} = tooltipInfo;
    const transform = `translate(${x}, ${y})`;

    return (
      <g className={styles.TooltipContainer} transform={transform}>
        <foreignObject x={0} y={0} width={TOOLTIP_WIDTH} height={tooltipHeight}>
          <div
            ref={(node) => {
              if (node) {
                const {height} = node.getBoundingClientRect();
                const tooltipOffset = 10;
                const tooltipHeight =
                  height + TOOLTIP_PADDING * 2 - tooltipOffset;
                setTooltipHeight(tooltipHeight);
              }
            }}
          >
            <Tooltip
              groupName={groupName}
              groupDescription={groupDescription}
              groupGoal={groupGoal}
            />
          </div>
        </foreignObject>
      </g>
    );
  };

  useEffect(() => {
    if (entry?.contentRect) {
      // we want to make sure the container is not too small to allow hover interactions
      setIsSmallContainer(entry.contentRect.width <= SMALL_CONTAINER_WIDTH);
    }
  }, [entry]);

  const containerStyle = useMemo(
    () => ({
      height: dimensions.height ? `${dimensions.height}px` : '100%',
    }),
    [dimensions.height],
  );

  return (
    <div ref={setRef} className={styles.Container} style={containerStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height + SVG_OFFSET}`}
      >
        <YAxisLabels
          yTicks={yTicks}
          chartPositions={chartPositions}
          yAxisOptions={yAxisOptions}
          Y_AXIS_LABEL_WIDTH={Y_AXIS_LABEL_WIDTH}
        />

        <g id="grid-content" transform={`translate(${Y_AXIS_LABEL_WIDTH}, 0)`}>
          <GridBackground
            rows={gridDimensions.rows}
            cols={gridDimensions.cols}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            xScale={xScale}
          />
          {cellGroups.map((group, index) => (
            <GroupCell
              index={index}
              key={`group-${index}`}
              group={group}
              xScale={xScale}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              isSmallContainer={isSmallContainer}
              hoveredGroups={hoveredGroups}
              handleGroupHover={handleGroupHover}
              getColors={getColors}
              containerWidth={dimensions.width}
              isAnimated={isAnimated}
            />
          ))}
          <Arrows
            hoveredGroup={hoveredGroup}
            cellGroups={cellGroups}
            xScale={xScale}
            cellHeight={cellHeight}
          />
        </g>

        <XAxisLabels
          xLabels={xLabels}
          xAxisLabelWidth={xAxisLabelWidth}
          chartPositions={chartPositions}
          dimensions={dimensions}
          xScale={xScale}
          xAxisOptions={xAxisOptions}
          Y_AXIS_LABEL_WIDTH={Y_AXIS_LABEL_WIDTH}
          setXAxisHeight={setXAxisHeight}
        />

        {renderTooltip()}
      </svg>
    </div>
  );
}

Grid.displayName = 'Grid';
