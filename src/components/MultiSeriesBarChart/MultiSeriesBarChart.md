# Multi-series bar chart

Used to show comparison of different types, across categories.

## Example

| Grouped                                                                                  | Stacked                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <img src="grouped-bar-example.png" alt="Multi-series bar chart grouped example image" /> | <img src="stacked-bar-example.png" alt="Multi-series bar chart stacked example image" /> |

```tsx
const series = [
  {
    color: 'primary',
    label: 'Breakfast',
    data: [3, 7, 4, 8, 10, 0, 1],
  },
  {
    color: 'secondary',
    label: 'Lunch',
    data: [4, 3, 5, 15, 8, 10, 2],
  },
  {
    color: 'tertiary',
    label: 'Dinner',
    data: [7, 2, 6, 12, 10, 5, 3],
  },
];

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const formatYAxisLabel = (val: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumSignificantDigits: 3,
  }).format(val);

const renderTooltipContent: MultiSeriesBarChartProps['renderTooltipContent'] = ({
  data,
  title,
}) => {
  const formatTooltipValue = (val: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(val);

  const formattedData = data.map(({label, value, color}) => ({
    color,
    label,
    value: formatTooltipValue(value),
  }));

  const total = data.reduce((totalValue, {value}) => totalValue + value, 0);

  return (
    <TooltipContent
      title={title}
      data={formattedData}
      total={{label: 'Total', value: formatTooltipValue(total)}}
    />
  );
};

return (
  <MultiSeriesBarChart
    formatYAxisLabel={formatYAxisLabel}
    labels={labels}
    series={series}
    chartHeight={250}
    isStacked={isStacked}
    renderTooltipContent={renderTooltipContent}
  />
);
```

## Usage

The mult-series bar chart interface looks like this:

```typescript
{
  series: Data[];
  labels: string[];
  accessibilityLabel?: string;
  chartHeight?: number;
  timeSeries?: boolean;
  isStacked?: boolean;
  formatXAxisLabel?(value: string, index?: number, data?: string[]): string;
  formatYAxisLabel?(value: number): string;
  renderTooltipContent?: (data: RenderTooltipContentData): React.ReactNode;
}
```

You can access this interface by importing `MultiSeriesBarChartProps`.

This component derives its size from its parent container and fills the width of its parent's container. It has a default height of `250`, which is configurable via the `chartHeight` prop. The `chartHeight` specifically affects the height of chart, and does not include or affect the height of the legend.

### The `RenderTooltipContentData` type

The `RenderTooltipContentData` type looks very similar to the `Series` type. Its interface looks like this:

```tsx
interface RenderTooltipContentData {
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
  title: string;
}
```

The distinction between the `RenderTooltipContentData` and series `Data` types is that `RenderTooltipContentData` is for a single data point, instead of an entire series of data.

### Required props

#### series

| type                                              |
| ------------------------------------------------- |
| `{data: number[], color: Color, label: string}[]` |

The data prop to determine the chart's drawn area. Each series object contains a `data` array, which contains all of the values for that given group. The `color` attribute accepts any [Polaris Viz color](documentation/Polaris-Viz-colors.md). The `label` attribute gives a name to each series (or group) of data.

#### labels

| type       |
| ---------- |
| `string[]` |

The labels for the x-axis of the chart. This array should be equal in length to each of the `data` arrays in the `series` prop.

### Optional props

#### accessibilityLabel

| type     | default      |
| -------- | ------------ |
| `string` | empty string |

Visually hidden text for screen readers.

#### chartHeight

| type     | default |
| -------- | ------- |
| `number` | `250`   |

Determines the height of the chart.

#### formatXAxisLabel

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis.

#### formatYAxisLabel

| type                       | default                       |
| -------------------------- | ----------------------------- |
| `(value: number): string;` | `(value) => value.toString()` |

This utility function is called for every y axis value when the chart is drawn.

#### timeSeries

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

This indicates to the chart if the data provide is time series data. If `true`, the x-axis will display fewer labels as needed according to the data.

#### isStacked

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

This changes the grouping of the bars. If `true` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group. To see an example of stacked vs. grouped orientations, refer to the images above.

#### renderTooltipContent

| type                                                 |
| ---------------------------------------------------- |
| `(data: RenderTooltipContentData): React.ReactNode;` |

This accepts a function that is called to render the tooltip content. By default it calls `formatYAxisLabel` to format the the tooltip value and passes it to `<TooltipContent />`. For more information about tooltip content, read the [tooltip content documentation](/src/components/TooltipContent/TooltipContent.md).
