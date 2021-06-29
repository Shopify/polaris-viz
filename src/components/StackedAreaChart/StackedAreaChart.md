# Stacked area chart

Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives.

It's reccomended that you use a legend whenever displaying multiseries data. To display one, use the <a href="../Legend/Legend.md">`<Legend />` component</a>.

## Example

<img src="stacked-area-chart.png" alt="Stacked area chart example image" />

```tsx
const series = [
  {
    name: 'First-time',
    data: [
      {label: 'January', rawValue: 4237},
      {label: 'February', rawValue: 5024},
      {label: 'March', rawValue: 5730},
      {label: 'April', rawValue: 5587},
      {label: 'May', rawValue: 5303},
      {label: 'June', rawValue: 5634},
      {label: 'July', rawValue: 3238},
    ],
    color: 'teal',
  },
  {
    name: 'Returning',
    data: [
      {label: 'January', rawValue: 5663},
      {label: 'February', rawValue: 7349},
      {label: 'March', rawValue: 9795},
      {label: 'April', rawValue: 7396},
      {label: 'May', rawValue: 7028},
      {label: 'June', rawValue: 12484},
      {label: 'July', rawValue: 4878},
    ],
    color: 'purple',
  },
];

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const formatYAxisLabel = (value?: number) => {
  const formatter = new Intl.NumberFormat('en').format;
  if (value == null) {
    return '-';
  }

  return formatter(value);
};

const renderTooltipContent: StackedAreaChartProps['renderTooltipContent'] = ({
  data,
  title,
}) => {
  const formatTooltipValue = (val: number) =>
    new Intl.NumberFormat('en').format(val);

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
  <StackedAreaChart
    series={series}
    xAxisLabels={labels}
    formatYAxisLabel={formatYAxisLabel}
    renderTooltipContent={renderTooltipContent}
    skipLinkText="Skip chart content"
  />
);
```

## Usage

The stacked area chart interface looks like this:

```typescript
interface StackedAreaChartProps {
  xAxisLabels: string[];
  series: Series[];
  opacity?: number;
  isAnimated?: boolean;
  formatXAxisLabel?(value: string, index?: number, data?: string[]): string;
  formatYAxisLabel?(value: number): string;
  renderTooltipContent?: (data: RenderTooltipContentData): React.ReactNode;
  skipLinkText?: string;
}
```

This component derives its size from its parent container and fills the width of its parent's container.

### The `Series` type

The `Series` type allows the user to define the color of each series. Its interface looks like this:

```typescript
interface Series {
  name: string;
  data: {label: string; rawValue: number | null}[];
  color?: string;
}
```

#### name

| type     |
| -------- |
| `string` |

The name for the series. This appears in the tooltip.

#### data

| type                                          |
| --------------------------------------------- |
| `{label: string, rawValue: number \| null}[]` |

The array that the chart uses to plot the area. Null values are not displayed.

#### color

| type    | default     |
| ------- | ----------- |
| `string` | `'rgb(71, 193, 191)'` |

It allows you to pass any CSS color.

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

### Required Props

#### series

| type       |
| ---------- |
| `Series[]` |

The prop to determine the chart's drawn area. Each `Series` object corresponds to an area drawn on the chart, and is explained in greater detail [above](#series).

### Optional Props

#### formatXAxisLabel

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis. This is only called if there is a value passed in for `xAxisLabels`.

#### formatYAxisLabel

| type                       | default                       |
| -------------------------- | ----------------------------- |
| `(value: number): string;` | `(value) => value.toString()` |

The `formatYAxisLabel` function formats the values displayed on the yAxis and in the tooltip.

### xAxisLabels

| type       | default |
| ---------- | ------- |
| `string[]` | `[]`    |

The labels to display on the x axis of the chart. If no labels are passed, there are no labels rendered on the x axis of the chart.

### opacity

| type     | default |
| -------- | ------- |
| `number` | `1`     |

Determines the opacity of all area shapes. Consider reducing the opacity below 1 if seeing the grid lines behind the areas is important to your use case.

### isAnimated

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to animate the chart when it is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.

#### renderTooltipContent

| type                                                 |
| ---------------------------------------------------- |
| `(data: RenderTooltipContentData): React.ReactNode;` |

This accepts a function that is called to render the tooltip content. By default it calls `formatYAxisLabel` to format the the tooltip value and passes it to `<TooltipContent />`. For more information about tooltip content, read the [tooltip content documentation](/src/components/TooltipContent/TooltipContent.md).

#### skipLinkText

| type     |
| -------- |
| `string` |

If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.
