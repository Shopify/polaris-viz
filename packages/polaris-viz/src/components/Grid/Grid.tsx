import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {ChartProps, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  DEFAULT_CHART_PROPS,
  useChartPositions,
} from '@shopify/polaris-viz-core';
import {scaleLinear} from 'd3-scale';

import {XAxis} from '../XAxis';
import {YAxis} from '../YAxis';
import {useResizeObserver} from '../../hooks/useResizeObserver';
import {ChartContainer} from '../ChartContainer';

import styles from './Grid.scss';

export type GridProps = {
  colorScale?: string[];
  labelFormatter?: LabelFormatter;
} & ChartProps;

const Y_AXIS_LABEL_OFFSET = 10;

interface CellGroup {
  start: {row: number; col: number};
  end: {row: number; col: number};
  color: string;
  name: string;
  description: string;
  goal: string;
  onHoverActiveGroups?: string[];
  secondaryValue: string;
  value: string;
}

const cellGroups: CellGroup[] = [
  {
    start: {row: 0, col: 0},
    end: {row: 0, col: 1},
    secondaryValue: '(10%)',
    value: '8,000',
    color: '#3E69EB',
    name: 'Previously loyal',
    onHoverActiveGroups: ['Loyal'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 1, col: 0},
    end: {row: 2, col: 1},
    secondaryValue: '(20%)',
    value: '200',
    color: '#3E69EB',
    name: 'At risk',
    onHoverActiveGroups: ['Needs attention', 'Loyal'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 3, col: 0},
    end: {row: 4, col: 1},
    secondaryValue: '(30%)',
    value: '2,000',
    color: '#7594EF',
    name: 'Dormant',
    onHoverActiveGroups: ['Almost lost'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 0, col: 2},
    end: {row: 1, col: 3},
    secondaryValue: '(40%)',
    value: '80',
    color: '#133AAF',
    name: 'Loyal',
    onHoverActiveGroups: ['Champions'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 2, col: 2},
    end: {row: 2, col: 2},
    secondaryValue: '(20%)',
    value: '500',
    color: '#3E69EB',
    name: 'Needs attention',
    onHoverActiveGroups: ['Loyal', 'Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 3, col: 2},
    end: {row: 4, col: 2},
    secondaryValue: '(10%)',
    value: '8,000',
    color: '#3E69EB',
    name: 'Almost lost',
    onHoverActiveGroups: ['Active', 'Promising'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 4, col: 3},
    end: {row: 4, col: 3},
    secondaryValue: '(20%)',
    value: '200',
    color: '#194AE5',
    name: 'Promising',
    onHoverActiveGroups: ['Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 2, col: 3},
    end: {row: 3, col: 4},
    secondaryValue: '(30%)',
    value: '2,000',
    color: '#133AAF',
    name: 'Active',
    onHoverActiveGroups: ['Loyal', 'Champions'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 4, col: 4},
    end: {row: 4, col: 4},
    secondaryValue: '(40%)',
    value: '80',
    color: '#194AE5',
    name: 'New',
    onHoverActiveGroups: ['Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
  {
    start: {row: 0, col: 4},
    end: {row: 1, col: 4},
    secondaryValue: '(20%)',
    value: '500',
    color: '#0E287C',
    name: 'Champions',
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'Move customers to Champions or Loyal',
  },
];

const mockRFMData = {
  data: [
    {
      name: '5',
      data: [
        {key: '1', value: 100},
        {key: '2', value: 90},
        {key: '3', value: 80},
        {key: '4', value: 100},
        {key: '5', value: 100},
      ],
    },
    {
      name: '4',
      data: [
        {key: '1', value: 90},
        {key: '2', value: 80},
        {key: '3', value: 70},
        {key: '4', value: 100},
        {key: '5', value: 100},
      ],
    },
    {
      name: '3',
      data: [
        {key: '1', value: 80},
        {key: '2', value: 70},
        {key: '3', value: 60},
        {key: '4', value: 50},
        {key: '5', value: 40},
      ],
    },
    {
      name: '2',
      data: [
        {key: '1', value: 70},
        {key: '2', value: 60},
        {key: '3', value: 50},
        {key: '4', value: 40},
        {key: '5', value: 30},
      ],
    },
    {
      name: '1',
      data: [
        {key: '1', value: 60},
        {key: '2', value: 50},
        {key: '3', value: 40},
        {key: '4', value: 30},
        {key: '5', value: 20},
      ],
    },
  ],
  xAxisOptions: {
    labelFormatter: (value) => `F${value + 1}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `R${value + 1}`,
  },
};

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

const data = mockRFMData.data;
const TOOLTIP_HEIGHT = 120;
const TOOLTIP_WIDTH = 250;

export function Grid(props: GridProps) {
  const {defaultTheme} = usePolarisVizContext();
  const [xAxisHeight, setXAxisHeight] = useState(40);
  const [yAxisWidth, setYAxisWidth] = useState(50);

  const [hoveredGroups, setHoveredGroups] = useState<Set<string>>(new Set());
  const [hoveredGroup, setHoveredGroup] = useState<CellGroup | null>(null);
  const {ref: containerRef, setRef, entry} = useResizeObserver();
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const dimensions = useMemo(
    () => ({
      width: entry?.contentRect.width ?? 300,
      height: entry?.contentRect.height ?? 200,
    }),
    [entry],
  );

  const yAxisLabelWidth = useMemo(() => {
    if (!data || data.length === 0) return 50;
    const maxLabelLength = Math.max(...data.map((row) => row.name.length));
    return Math.min(Math.max(maxLabelLength * 8, 50), dimensions.width * 0.2);
  }, [dimensions.width]);

  const handleGroupHover = useCallback(
    (group: CellGroup | null, event: React.MouseEvent) => {
      if (group) {
        const activeGroups = new Set([
          group.name,
          ...(group.onHoverActiveGroups ?? []),
        ]);
        setHoveredGroups(activeGroups);
        setHoveredGroup(group);
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = entry.target?.getBoundingClientRect();

        if (!containerRect) return;

        const leftSpace = rect.left - containerRect.left;
        const rightSpace = containerRect.right - rect.right;
        const bottomSpace = containerRect.bottom - rect.bottom;
        const topSpace = rect.top - containerRect.top;

        // Assuming tooltip width of 200px and height of 100px
        const leftOffset = 10;
        const topOffset = 10;
        const bottomOffset = 35;

        let x;
        let y;
        let placement;
        if (leftSpace >= TOOLTIP_WIDTH) {
          // Position on the left
          x = rect.left - containerRect.left - TOOLTIP_WIDTH;
          y = rect.top - containerRect.top;
          placement = 'left';
        } else if (bottomSpace >= TOOLTIP_HEIGHT) {
          // Position at the bottom
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.bottom - containerRect.top;
          placement = 'bottom';
        } else {
          // Position at the top
          x =
            rect.left - containerRect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
          y = rect.top - containerRect.top - TOOLTIP_HEIGHT;
          placement = 'top';
        }
        console.log(placement);
        setTooltipInfo({
          x,
          y,
          placement,
          groupName: group.name,
          groupDescription: group.description || 'No description available',
          groupGoal: group.goal || 'No goal available',
        });
      } else {
        setHoveredGroups(new Set());
        setHoveredGroup(null);
        setTooltipInfo(null);
      }
    },
    [entry, yAxisLabelWidth],
  );

  const handleGroupClick = useCallback(
    (group: CellGroup | null, event: React.MouseEvent) => {
      setIsTooltipVisible((isTooltipVisible) => !isTooltipVisible);
    },
    [],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
        setHoveredGroups(new Set());
        setTooltipInfo(null);
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
    if (!sourceGroup || !sourceGroup.onHoverActiveGroups) return null;

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
          y: group1.end.row * cellHeight,
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

    return sourceGroup.onHoverActiveGroups.map((targetGroupName) => {
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

  const {
    id,
    isAnimated,
    theme = defaultTheme,
    labelFormatter = (value) => `${value}`,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const chartWidth = dimensions.width - yAxisLabelWidth - Y_AXIS_LABEL_OFFSET;
  const chartHeight = dimensions.height - xAxisHeight;

  const cellWidth = chartWidth / data[0].data.length;
  const cellHeight = chartHeight / data.length;

  const rawChartPositions = useChartPositions({
    height: Math.max(chartHeight, 1),
    width: Math.max(chartWidth, 1),
    xAxisHeight: Math.max(xAxisHeight, 0),
    yAxisWidth: yAxisLabelWidth + Y_AXIS_LABEL_OFFSET,
  });

  const chartPositions = useMemo(() => {
    const yAxisTotalWidth = yAxisWidth + Y_AXIS_LABEL_OFFSET + 120;
    return {
      chartXPosition: rawChartPositions.chartXPosition ?? yAxisTotalWidth,
      chartYPosition: 0,
      drawableHeight: dimensions.height - xAxisHeight,
      drawableWidth:
        rawChartPositions.drawableWidth ?? dimensions.width - yAxisTotalWidth,
      xAxisBounds: {
        x: rawChartPositions.xAxisBounds?.x ?? yAxisTotalWidth,
        y: dimensions.height - xAxisHeight,
        width: dimensions.width - yAxisTotalWidth,
        height: xAxisHeight,
      },
      yAxisBounds: {
        x: 120,
        y: 0,
        width: yAxisWidth,
        height: dimensions.height - xAxisHeight,
      },
    };
  }, [rawChartPositions, dimensions, xAxisHeight, yAxisWidth]);

  const renderHeatmap = () => {
    return cellGroups.map((group, index) => {
      const groupWidth = (group.end.col - group.start.col + 1) * cellWidth;
      const groupHeight = (group.end.row - group.start.row + 1) * cellHeight;
      const groupValue = group.value;
      const groupSecondaryValue = group.secondaryValue;
      const isHovered = hoveredGroups.has(group.name);
      let opacity = 1;

      if (hoveredGroups.size > 0 && !isHovered) {
        opacity = 0.3;
      }

      const mainFontSize = Math.min(cellWidth, cellHeight) / 4;
      const secondaryFontSize = mainFontSize * 0.8;
      const groupNameOffset = 10;
      return (
        <g
          key={`group-${index}`}
          onMouseEnter={(event) => handleGroupHover(group, event)}
          onMouseLeave={(event) => {
            if (!isTooltipVisible && !isMouseInCell(event, group)) {
              handleGroupHover(null, null);
            }
          }}
          onClick={(event) => handleGroupClick(group, event)}
          className={styles.animatedArrow}
        >
          <rect
            x={xScale(group.start.col)}
            y={group.start.row * cellHeight}
            width={groupWidth}
            height={groupHeight}
            fill={getColor(group)}
            opacity={opacity}
          />
          <text
            x={xScale(group.start.col) + groupWidth / 2}
            y={group.start.row * cellHeight + groupHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            opacity={opacity}
          >
            <tspan fontSize={`${mainFontSize}px`}>
              {labelFormatter(groupValue)}
            </tspan>
            <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
              {groupSecondaryValue}
            </tspan>
          </text>
          <text
            x={xScale(group.start.col) + groupNameOffset}
            y={group.start.row * cellHeight + groupNameOffset}
            textAnchor="start"
            dominantBaseline="hanging"
            fontSize={`${Math.min(cellWidth, cellHeight) / 6}px`}
            fill="white"
            opacity={opacity}
          >
            {group.name}
          </text>
        </g>
      );
    });
  };

  const renderGridLines = () => {
    if (tooltipInfo) {
      return null;
    }
    const verticalLines = xLabels.map((_, index) => (
      <line
        key={`vline-${index}`}
        x1={xScale(index)}
        y1={0}
        x2={xScale(index)}
        y2={chartHeight}
        stroke="black"
        strokeWidth="1"
        opacity={0.1}
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
        stroke="black"
        strokeWidth="1"
        opacity={0.1}
      />,
    );

    const horizontalLines = data.map((_, index) => (
      <line
        key={`hline-${index}`}
        x1={0}
        y1={index * cellHeight}
        x2={chartWidth}
        y2={index * cellHeight}
        stroke="black"
        strokeWidth="1"
        opacity={0.1}
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
        stroke="black"
        strokeWidth="1"
        opacity={0.1}
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
      label: row.name,
      formattedValue: row.name,
      // Center the label vertically in the cell
      yOffset: index * cellHeight + cellHeight / 2,
    }));
  }, [cellHeight]);

  const xLabels = useMemo(() => data[0].data.map((cell) => cell.key), []);

  const xAxisLabelWidth = chartWidth / xLabels.length;

  const xScale = useMemo(
    () => scaleLinear().domain([0, xLabels.length]).range([0, chartWidth]),
    [xLabels.length, chartWidth],
  );

  const isMouseInCell = useCallback(
    (event: React.MouseEvent, group: CellGroup) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const cellLeft = xScale(group.start.col);
      const cellTop = group.start.row * cellHeight;
      const cellRight = xScale(group.end.col + 1);
      const cellBottom = (group.end.row + 1) * cellHeight;

      return x >= cellLeft && x <= cellRight && y >= cellTop && y <= cellBottom;
    },
    [xScale, cellHeight],
  );

  const renderTooltip = () => {
    if (!tooltipInfo) return null;

    const {x, y, placement, groupName, groupDescription, groupGoal} =
      tooltipInfo;
    const padding = 10;

    let transform;
    switch (placement) {
      case 'left':
        transform = `translate(${x} ${y})`;
        break;
      case 'bottom':
        transform = `translate(${x} ${y})`;
        break;
      case 'top':
        transform = `translate(${x} ${y})`;
        break;
      default:
        transform = `translate(${x} ${y})`;
    }

    return (
      <g transform={transform}>
        <rect
          width={TOOLTIP_WIDTH}
          height={TOOLTIP_HEIGHT}
          rx={12}
          ry={12}
          fill="white"
          stroke="lightgray"
          strokeWidth={1}
        />

        <foreignObject
          x={padding}
          y={padding}
          width={TOOLTIP_WIDTH - 2 * padding}
          height={TOOLTIP_HEIGHT - 2 * padding}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '12px',
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordWrap: 'break-word',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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
              }}
            >
              {groupDescription}
            </div>

            <div
              style={{
                zIndex: 9999,
                display: 'flex',
                gap: '5px',
                padding: '4px',
                alignItems: 'center',
                background: 'lightgray',
                marginTop: '12px',
                borderRadius: '4px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                style={{height: '10px', width: '14px'}}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>

              <p
                style={{
                  margin: '0',
                  fontSize: '12px',
                  lineHeight: '1.2',
                  color: '#27272a',
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

  const yAxisLabelWidth2 = 230;

  return (
    <ChartContainer id={id} isAnimated={isAnimated} data={data} theme={theme}>
      <div id="container" ref={setRef} style={{width: '100%', height: '90%'}}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <text
            x={
              chartPositions.yAxisBounds.y -
              chartPositions.yAxisBounds.height / 2
            }
            y={
              chartPositions.yAxisBounds.y +
              chartPositions.yAxisBounds.height / 2
            }
            textAnchor="start"
            dominantBaseline="middle"
            fontSize="14"
            fill="#6b7177"
            transform={`rotate(-90, 20, ${dimensions.height / 2}) translate(${
              yAxisLabelWidth2 / 2
            }, 0) `}
          >
            Frequency + Monetary value score
          </text>
          <YAxis
            ticks={yTicks}
            width={yAxisLabelWidth}
            textAlign="right"
            ariaHidden
            x={0}
            y={0}
          />
          <g
            transform={`translate(${yAxisLabelWidth + Y_AXIS_LABEL_OFFSET}, 0)`}
          >
            {renderHeatmap()}
            {renderGridLines()}
            {renderArrows()}
          </g>
          <XAxis
            allowLineWrap={false}
            labels={xLabels}
            labelWidth={xAxisLabelWidth}
            onHeightChange={setXAxisHeight}
            x={yAxisLabelWidth + Y_AXIS_LABEL_OFFSET}
            y={chartPositions.xAxisBounds.y + Y_AXIS_LABEL_OFFSET}
            xScale={xScale}
            ariaHidden
          />

          <text
            x={
              chartPositions.xAxisBounds.x +
              chartPositions.xAxisBounds.width / 2
            }
            y={dimensions.height + 30}
            textAnchor="middle"
            dominantBaseline="bottom"
            fontSize="14"
            fill="#6b7177"
          >
            Recency score
          </text>

          {renderTooltip()}
        </svg>
      </div>
    </ChartContainer>
  );
}

Grid.displayName = 'Grid';
