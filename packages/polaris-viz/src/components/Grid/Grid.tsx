import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {
  ChartProps,
  LabelFormatter,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  DEFAULT_CHART_PROPS,
  useChartPositions,
} from '@shopify/polaris-viz-core';
import {scaleLinear} from 'd3-scale';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {XAxis} from '../XAxis';
import {YAxis} from '../YAxis';
import {useResizeObserver} from '../../hooks/useResizeObserver';
import {ChartContainer} from '../ChartContainer';

import styles from './Grid.scss';

export type GridProps = {
  labelFormatter?: LabelFormatter;
  cellGroups: CellGroup[];
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  showGrid?: boolean;
} & ChartProps;

interface CellGroup {
  start: {row: number; col: number};
  end: {row: number; col: number};
  color: string;
  name: string;
  description: string;
  goal: string;
  connectedGroups?: string[];
  secondaryValue: string;
  value: string;
}

interface TooltipInfo {
  x: number;
  y: number;
  placement: 'left' | 'bottom' | 'top';
  groupName: string;
  groupDescription: string;
  groupGoal: string;
}

interface Point {
  x: number;
  y: number;
}

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

const TOOLTIP_WIDTH = 250;
// offset for the y axis label so that is not together with the y axis numbers
const Y_LABEL_OFFSET = 20;
// offset for the x axis label so that is not together with the x axis numbers
const X_LABEL_OFFSET = 40;

export function Grid(props: GridProps) {
  const {defaultTheme} = usePolarisVizContext();

  const [xAxisHeight, setXAxisHeight] = useState(40);
  const [hoveredGroups, setHoveredGroups] = useState<Set<string>>(new Set());
  const [hoveredGroup, setHoveredGroup] = useState<CellGroup | null>(null);
  const {ref: containerRef, setRef, entry} = useResizeObserver();
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CellGroup | null>(null);
  const [isTooltipLocked, setIsTooltipLocked] = useState(false);
  const [yAxisLabelMinWidth, setYAxisLabelWidth] = useState(0);
  const [xAxisLabelMinWidth, setXAxisLabelWdith] = useState(0);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  const {
    data,
    cellGroups = [],
    id,
    isAnimated,
    theme = defaultTheme,
    xAxisOptions = {},
    yAxisOptions = {},
    showGrid = true,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const dimensions = useMemo(
    () => ({
      width: entry?.contentRect.width ?? 300,
      height: entry?.contentRect.height ?? 200,
    }),
    [entry],
  );

  const yAxisLabelWidth = useMemo(() => {
    if (!data || data.length === 0) return 50;
    const maxLabelLength = Math.max(
      ...data.map((row) => row.name?.length ?? 0),
    );
    return Math.min(Math.max(maxLabelLength * 8, 50), dimensions.width * 0.2);
  }, [data, dimensions.width]);

  const handleGroupHover = useCallback(
    (group: CellGroup | null, event: React.MouseEvent) => {
      if (isTooltipLocked) {
        // If tooltip is locked, don't change it on hover
        return;
      }

      if (group) {
        const activeGroups = new Set([
          group.name,
          ...(group.connectedGroups ?? []),
        ]);
        setHoveredGroups(activeGroups);
        setHoveredGroup(group);
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = entry?.target?.getBoundingClientRect();

        if (!containerRect) return;

        const leftSpace = rect.left - containerRect.left;
        const bottomSpace = containerRect.bottom - rect.bottom;

        let x;
        let y;
        let placement;
        if (leftSpace >= TOOLTIP_WIDTH) {
          // Position on the left
          x = rect.left - containerRect.left - TOOLTIP_WIDTH;
          y = rect.top - containerRect.top;
          placement = 'left';
        } else if (bottomSpace >= tooltipHeight) {
          // Position at the bottom
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.bottom - containerRect.top;
          placement = 'bottom';
        } else {
          // Position at the top
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.top - containerRect.top - tooltipHeight;
          placement = 'top';
        }

        setTooltipInfo({
          x,
          y,
          placement,
          groupName: group.name,
          groupDescription: group.description || '',
          groupGoal: group.goal || '',
        });
        setIsTooltipVisible(true);
      } else {
        setHoveredGroups(new Set());
        setHoveredGroup(null);
        setTooltipInfo(null);
        setIsTooltipVisible(false);
      }
    },
    [entry, isTooltipLocked, tooltipHeight],
  );

  const handleGroupClick = useCallback(
    (group: CellGroup, event: React.MouseEvent) => {
      event.stopPropagation();
      if (selectedGroup && selectedGroup.name === group.name) {
        // If clicking the same group, unlock the tooltip
        setIsTooltipLocked(false);
        setSelectedGroup(null);
      } else {
        // Select the new group and lock its tooltip
        setSelectedGroup(group);
        setIsTooltipLocked(true);

        // Set tooltip info for the clicked group
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = entry?.target?.getBoundingClientRect();

        if (!containerRect) return;

        const leftSpace = rect.left - containerRect.left;
        const bottomSpace = containerRect.bottom - rect.bottom;

        let x;
        let y;
        let placement;
        if (leftSpace >= TOOLTIP_WIDTH) {
          // Position on the left
          x = rect.left - containerRect.left - TOOLTIP_WIDTH;
          y = rect.top - containerRect.top;
          placement = 'left';
        } else if (bottomSpace >= 1000) {
          // Position at the bottom
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.bottom - containerRect.top;
          placement = 'bottom';
        } else {
          // Position at the top
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.top - containerRect.top - 1000;
          placement = 'top';
        }

        setTooltipInfo({
          x,
          y,
          placement,
          groupName: group.name,
          groupDescription: group.description || '',
          groupGoal: group.goal || '',
        });
        setIsTooltipVisible(true);
      }
    },
    [selectedGroup, entry],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setIsTooltipVisible(false);
        setHoveredGroups(new Set());
        setTooltipInfo(null);
        setSelectedGroup(null);
        setIsTooltipLocked(false);
      }
    },
    [containerRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderArrows = () => {
    if (!hoveredGroup) return null;

    const sourceGroup = cellGroups.find(
      (group) => group.name === hoveredGroup.name,
    );
    if (!sourceGroup || !sourceGroup.connectedGroups) return null;

    const getSharedEdgeCenter = (group1: CellGroup, group2: CellGroup) => {
      if (group1.end.row < group2.start.row) {
        // group1 is above group2
        const startX = Math.max(
          xScale(group1.start.col),
          xScale(group2.start.col),
        );
        const endX = Math.min(
          xScale(group1.end.col + 1),
          xScale(group2.end.col + 1),
        );
        return {
          x: (startX + endX) / 2,
          y: (group1.end.row + 1) * cellHeight,
          sourceEdge: 'bottom',
          targetEdge: 'top',
        };
      }
      if (group1.start.row > group2.end.row) {
        // group1 is below group2
        const startX = Math.max(
          xScale(group1.start.col),
          xScale(group2.start.col),
        );
        const endX = Math.min(
          xScale(group1.end.col + 1),
          xScale(group2.end.col + 1),
        );
        return {
          x: (startX + endX) / 2,
          y: group1.start.row * cellHeight,
          sourceEdge: 'top',
          targetEdge: 'bottom',
        };
      }
      if (group1.end.col < group2.start.col) {
        // group1 is to the left of group2
        const startY = Math.max(
          group1.start.row * cellHeight,
          group2.start.row * cellHeight,
        );
        const endY = Math.min(
          (group1.end.row + 1) * cellHeight,
          (group2.end.row + 1) * cellHeight,
        );
        return {
          x: xScale(group1.end.col + 1),
          y: (startY + endY) / 2,
          sourceEdge: 'right',
          targetEdge: 'left',
        };
      }
      if (group1.start.col > group2.end.col) {
        // group1 is to the right of group2
        const startY = Math.max(
          group1.start.row * cellHeight,
          group2.start.row * cellHeight,
        );
        const endY = Math.min(
          (group1.end.row + 1) * cellHeight,
          (group2.end.row + 1) * cellHeight,
        );
        return {
          x: xScale(group1.start.col),
          y: (startY + endY) / 2,
          sourceEdge: 'left',
          targetEdge: 'right',
        };
      }
      return null;
    };

    return sourceGroup.connectedGroups.map((targetGroupName) => {
      const targetGroup = cellGroups.find(
        (group) => group.name === targetGroupName,
      );
      if (!targetGroup) return null;

      const sharedEdgeInfo = getSharedEdgeCenter(sourceGroup, targetGroup);
      if (!sharedEdgeInfo) return null;

      const sourcePoint = {x: sharedEdgeInfo.x, y: sharedEdgeInfo.y};
      const arrowOffset = 25;

      let targetPoint: Point;
      if (
        sharedEdgeInfo.sourceEdge === 'top' ||
        sharedEdgeInfo.sourceEdge === 'bottom'
      ) {
        targetPoint = {
          x: sourcePoint.x,
          y:
            sharedEdgeInfo.sourceEdge === 'bottom'
              ? sourcePoint.y + arrowOffset
              : sourcePoint.y - arrowOffset,
        };
      } else {
        targetPoint = {
          x:
            sharedEdgeInfo.sourceEdge === 'right'
              ? sourcePoint.x + arrowOffset
              : sourcePoint.x - arrowOffset,
          y: sourcePoint.y,
        };
      }

      const arrowHeadSize = Math.min(cellWidth, cellHeight) / 10;
      let arrowPoint1;
      let arrowPoint2;
      if (
        sharedEdgeInfo.sourceEdge === 'top' ||
        sharedEdgeInfo.sourceEdge === 'bottom'
      ) {
        const direction = sharedEdgeInfo.sourceEdge === 'bottom' ? 1 : -1;
        arrowPoint1 = {
          x: targetPoint.x - arrowHeadSize,
          y: targetPoint.y - direction * arrowHeadSize,
        };
        arrowPoint2 = {
          x: targetPoint.x + arrowHeadSize,
          y: targetPoint.y - direction * arrowHeadSize,
        };
      } else {
        const direction = sharedEdgeInfo.sourceEdge === 'right' ? 1 : -1;
        arrowPoint1 = {
          x: targetPoint.x - direction * arrowHeadSize,
          y: targetPoint.y - arrowHeadSize,
        };
        arrowPoint2 = {
          x: targetPoint.x - direction * arrowHeadSize,
          y: targetPoint.y + arrowHeadSize,
        };
      }

      return (
        <g
          className={styles.animatedArrow}
          key={`arrow-${hoveredGroup?.name}-${sourceGroup.name}-${targetGroupName}`}
        >
          <path
            className={styles.arrowShaft}
            d={`M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />

          <path
            className={styles.arrowHead}
            d={`M ${targetPoint.x} ${targetPoint.y} L ${arrowPoint1.x} ${arrowPoint1.y} M ${targetPoint.x} ${targetPoint.y} L ${arrowPoint2.x} ${arrowPoint2.y}`}
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    });
  };

  // Calculate the full chart dimensions, regardless of axis visibility
  const fullChartWidth = dimensions.width - yAxisLabelWidth - Y_LABEL_OFFSET;
  const fullChartHeight = dimensions.height - xAxisHeight;

  // Use these dimensions for the actual chart area
  const chartWidth = fullChartWidth;
  const chartHeight = fullChartHeight;

  const cellWidth = chartWidth / data[0].data.length;
  const cellHeight = chartHeight / data.length;

  const rawChartPositions = useChartPositions({
    height: Math.max(fullChartHeight, 1),
    width: Math.max(fullChartWidth, 1),
    xAxisHeight: Math.max(xAxisHeight, 0),
    yAxisWidth: yAxisLabelWidth,
    annotationsHeight: 0,
  });

  const chartPositions: ChartPositions = useMemo(() => {
    const yAxisTotalWidth = yAxisLabelWidth + Y_LABEL_OFFSET + 120;
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
        x: 120,
        y: 0,
        width: yAxisLabelWidth,
        height: fullChartHeight,
      },
    };
  }, [
    rawChartPositions,
    yAxisLabelWidth,
    dimensions,
    xAxisHeight,
    fullChartWidth,
    fullChartHeight,
  ]);

  const renderHeatmap = () => {
    return cellGroups.map((group, index) => {
      const groupWidth = (group.end.col - group.start.col + 1) * cellWidth;
      const groupHeight = (group.end.row - group.start.row + 1) * cellHeight;
      const groupValue = group.value;
      const groupSecondaryValue = group.secondaryValue;
      let opacity = 1;
      let cellOpacity = 0.9;

      const isMainActive = hoveredGroup?.name === group.name;
      const isActiveGroup = hoveredGroups.has(group.name);

      const isSelected = selectedGroup?.name === group.name;

      if (selectedGroup) {
        if (isSelected) {
          opacity = 1;
          cellOpacity = 0.9;
        } else {
          opacity = 0.3;
          cellOpacity = 0.3;
        }
      } else if (hoveredGroups.size > 0) {
        if (isMainActive || isActiveGroup) {
          opacity = 1;
          cellOpacity = 0.9;
        } else {
          opacity = 0.3;
          cellOpacity = 0.3;
        }
      }

      const groupNameOffset = 10;

      const showNameAndSecondaryValue = dimensions.width >= 460;
      const mainFontSize = showNameAndSecondaryValue
        ? 20
        : Math.min(groupWidth, cellHeight) / 4;
      const secondaryFontSize = mainFontSize * 0.6;

      return (
        <g
          key={`group-${index}`}
          onMouseEnter={(event) => handleGroupHover(group, event)}
          onMouseLeave={(event) => {
            if (!isTooltipLocked) {
              handleGroupHover(null, event);
            }
          }}
          onClick={(event) => handleGroupClick(group, event)}
          className={styles.animatedArrow}
          style={{cursor: 'pointer'}}
        >
          <rect
            x={xScale(group.start.col)}
            y={group.start.row * cellHeight}
            width={groupWidth}
            height={groupHeight}
            fill={getColor(group)}
            opacity={cellOpacity}
            stroke="white"
            strokeWidth="1"
          />

          <text
            x={xScale(group.start.col) + groupWidth / 2}
            y={group.start.row * cellHeight + groupHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            opacity={opacity}
          >
            <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
              {groupValue}
            </tspan>
            {showNameAndSecondaryValue && (
              <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
                {groupSecondaryValue}
              </tspan>
            )}
          </text>

          {showNameAndSecondaryValue && (
            <text
              x={xScale(group.start.col) + groupNameOffset}
              y={group.start.row * cellHeight + groupNameOffset}
              textAnchor="start"
              dominantBaseline="hanging"
              fontSize={11}
              fill="white"
              opacity={opacity}
            >
              {group.name}
            </text>
          )}
        </g>
      );
    });
  };

  const renderGridLines = () => {
    if (tooltipInfo || !showGrid) {
      return null;
    }
    const verticalLines = xLabels.map((_, index) => (
      <line
        key={`vline-${index}`}
        x1={xScale(index)}
        y1={0}
        x2={xScale(index)}
        y2={chartHeight}
        stroke="#081848"
        strokeWidth="1"
        opacity={1}
      />
    ));

    // Add the last vertical line
    verticalLines.push(
      <line
        key={`vline-${xLabels.length}`}
        x1={chartWidth}
        y1={0}
        x2={chartWidth}
        y2={chartHeight}
        stroke="#081848"
        strokeWidth="1"
        opacity={1}
      />,
    );

    const horizontalLines = data.map((_, index) => (
      <line
        key={`hline-${index}`}
        x1={0}
        y1={index * cellHeight}
        x2={chartWidth}
        y2={index * cellHeight}
        stroke="#081848"
        strokeWidth="1"
        opacity={1}
      />
    ));

    // Add an extra horizontal line at the bottom
    horizontalLines.push(
      <line
        key="hline-bottom"
        x1={0}
        y1={chartHeight}
        x2={chartWidth}
        y2={chartHeight}
        stroke="#081848"
        strokeWidth="1"
        opacity={0.3}
      />,
    );

    return [...verticalLines, ...horizontalLines];
  };

  const getColor = (group: CellGroup | null) => {
    if (group) {
      return group.color;
    }
    return 'blue';
  };

  const yTicks = useMemo(() => {
    return data.map((row, index) => ({
      value: index,
      label: row.name || '',
      formattedValue: row.name || '',
      // Center the label vertically in the cell
      yOffset: index * cellHeight + cellHeight / 2,
    }));
  }, [cellHeight, data]);

  const xLabels = useMemo(
    () => data[0].data.map((cell) => String(cell.key)),
    [data],
  );

  const xAxisLabelWidth = chartWidth / xLabels.length;

  const xScale = useMemo(
    () => scaleLinear().domain([0, xLabels.length]).range([0, chartWidth]),
    [xLabels.length, chartWidth],
  );

  const renderTooltip = () => {
    if (!tooltipInfo) return null;

    const {x, y, groupName, groupDescription, groupGoal} = tooltipInfo;
    const padding = 10;
    const transform = `translate(${x}, ${y})`;

    return (
      <g transform={transform}>
        <foreignObject x={0} y={0} width={TOOLTIP_WIDTH} height={tooltipHeight}>
          <div
            ref={(node) => {
              if (node) {
                const {height} = node.getBoundingClientRect();
                setTooltipHeight(height + padding * 2);
              }
            }}
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '12px',
              lineHeight: '1.2',
              padding: `${padding}px`,
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid lightgray',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '8px',
              }}
            >
              {groupName}
            </div>
            <div
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#333333',
              }}
            >
              {groupDescription}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '5px',
                padding: '4px',
                alignItems: 'center',
                background: '#F1F1F1',
                marginTop: '12px',
                borderRadius: '4px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                style={{height: '13px', width: '20px'}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>

              <p
                style={{
                  margin: '0',
                  fontSize: '11px',
                  lineHeight: '1.2',
                  color: '#303030',
                }}
              >
                Goal: {groupGoal}
              </p>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <ChartContainer id={id} isAnimated={isAnimated} data={data} theme={theme}>
      <div id="container" ref={setRef} style={{width: '100%', height: '90%'}}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {/* Y-Axis */}
          <g opacity={yAxisOptionsWithDefaults?.hide ? 0 : 1}>
            {yAxisOptionsWithDefaults.label && (
              <text
                ref={(node) => {
                  if (!yAxisLabelMinWidth && node?.getBBox()?.width) {
                    setYAxisLabelWidth(node?.getBBox()?.width);
                  }
                }}
                x={chartPositions.yAxisBounds.x}
                y={chartPositions.yAxisBounds.x - Y_LABEL_OFFSET}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fill="#6b7177"
                transform={`rotate(-90, ${chartPositions.yAxisBounds.x}, ${
                  chartPositions.yAxisBounds.y +
                  chartPositions.yAxisBounds.height / 2
                })`}
              >
                {yAxisOptionsWithDefaults.label}
              </text>
            )}
            <YAxis
              ticks={yTicks}
              width={yAxisLabelWidth}
              textAlign="right"
              ariaHidden
              x={0}
              y={0}
            />
          </g>

          {/* Main chart content */}
          <g transform={`translate(${yAxisLabelWidth + Y_LABEL_OFFSET}, 0)`}>
            {renderGridLines()}
            {renderHeatmap()}
            {renderArrows()}
          </g>

          {/* X-Axis */}
          <g opacity={xAxisOptionsWithDefaults?.hide ? 0 : 1}>
            <XAxis
              allowLineWrap={false}
              labels={xLabels}
              labelWidth={xAxisLabelWidth}
              onHeightChange={setXAxisHeight}
              x={yAxisLabelWidth + Y_LABEL_OFFSET}
              y={chartPositions.xAxisBounds.y + Y_LABEL_OFFSET}
              xScale={xScale}
              ariaHidden
            />
            <text
              x={yAxisLabelWidth + Y_LABEL_OFFSET}
              y={dimensions.height + xAxisHeight / 2}
              textAnchor="start"
              dominantBaseline="bottom"
              fontSize="12"
              fill="#6b7177"
            >
              Low
            </text>
            <text
              x={dimensions.width}
              y={dimensions.height + xAxisHeight / 2}
              textAnchor="end"
              dominantBaseline="bottom"
              fontSize="12"
              fill="#6b7177"
            >
              High
            </text>
            {xAxisOptionsWithDefaults.label && (
              <text
                ref={(node) => {
                  if (!xAxisLabelMinWidth && node?.getBBox()?.width) {
                    setXAxisLabelWdith(node?.getBBox()?.width);
                  }
                }}
                x={
                  (chartPositions.xAxisBounds.x +
                    chartPositions.xAxisBounds.width) /
                  2
                }
                y={dimensions.height + X_LABEL_OFFSET}
                fontSize="14"
                fill="#6b7177"
                textAnchor="middle"
              >
                {xAxisOptionsWithDefaults.label}
              </text>
            )}
          </g>

          {(isTooltipVisible || isTooltipLocked) && renderTooltip()}
        </svg>
      </div>
    </ChartContainer>
  );
}

Grid.displayName = 'Grid';
