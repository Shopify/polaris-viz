# Multi-series bar chart

Used to show comparison of different types, across categories.

## Example

| Grouped                                                                                  | Stacked                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <img src="grouped-bar-example.png" alt="Multi-series bar chart grouped example image" /> | <img src="stacked-bar-example.png" alt="Multi-series bar chart stacked example image" /> |

```tsx
const series = [
  {
    name: 'Breakfast',
    color: 'primary',
    highlightColor: 'primaryProminent',
    data: [
      {label: 'Monday', rawValue: 3},
      {label: 'Tuesday', rawValue: 7},
      {label: 'Wednesday', rawValue: 4},
      {label: 'Thursday', rawValue: 8},
      {label: 'Friday', rawValue: 10},
      {label: 'Saturday', rawValue: 0},
      {label: 'Sunday', rawValue: 1},
    ],
  },
  {
    name: 'Lunch',
    color: 'secondary',
    highlightColor: 'secondaryProminent',
    data: [
      {label: 'Monday', rawValue: 4},
      {label: 'Tuesday', rawValue: 3},
      {label: 'Wednesday', rawValue: 5},
      {label: 'Thursday', rawValue: 15},
      {label: 'Friday', rawValue: 8},
      {label: 'Saturday', rawValue: 10},
      {label: 'Sunday', rawValue: 2},
    ],
  },
  {
    name: 'Dinner',
    color: 'tertiary',
    highlightColor: 'tertiaryProminent',
    data: [
      {label: 'Monday', rawValue: 7},
      {label: 'Tuesday', rawValue: 2},
      {label: 'Wednesday', rawValue: 6},
      {label: 'Thursday', rawValue: 12},
      {label: 'Friday', rawValue: 10},
      {label: 'Saturday', rawValue: 5},
      {label: 'Sunday', rawValue: 3},
    ],
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
interface MultiSeriesBarChartProps {
  series: Series[];
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

This component derives its size from its parent container and fills the width of its parent's container. It has a default height of `250`, which is configurable via the `chartHeight` prop. The `chartHeight` specifically affects the height of chart, and does not include or affect the height of the legend.

### The `Series` type

#### series

The `Series` type gives the user a lot of flexibility to define exactly what each bar group should look like. Its interface looks like this:

```typescript
{
  name: string;
  data: {
    label: string;
    rawValue: number;
  }[];
  color?: Color;
  highlightColor?: Color;
}
```

#### name

| type     |
| -------- |
| `string` |

The name of the series/group.

#### data

| type                                  |
| ------------------------------------- |
| `{label: string, rawValue: number}[]` |

The array of objects that the chart uses to draw the groups.

#### color

| type    | default     |
| ------- | ----------- |
| `Color` | `'primary'` |

This accepts any [Polaris Viz color](/documentation/Polaris-Viz-colors.md) value, and corresponds to the color of the bar for that series.

#### highlightColor

| type    | default     |
| ------- | ----------- |
| `Color` | `'primary'` |

This accepts any [Polaris Viz color](/documentation/Polaris-Viz-colors.md) value, and corresponds to the color of the bar for that series when you hover over a bar group. It defaults to `primary`. The four 'prominent' Polaris Viz colors (`primaryProminent`, `secondaryProminent`, `tertiaryProminent`, `quaternaryProminent`) exist as a good option for a complimentary hover color.

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

| type       |
| ---------- |
| `Series[]` |

The prop to determine the chart's drawn area. Each `Series` object corresponds to a group drawn on the chart, and is explained in greater detail [above](#the-series-type).

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
