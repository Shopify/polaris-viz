# Stacked area chart

Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives.

## Example

<img src="stacked-area-chart.png" alt="Stacked area chart example image" />

```tsx
const series = [
  {
    label: 'First-time',
    data: [4237, 5024, 5730, 5587, 5303, 5634, 3238],
    color: 'primary',
  },
  {
    label: 'Returning',
    data: [5663, 7349, 9795, 7396, 7028, 12484, 4878],
    color: 'secondary',
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
  />
);
```

## Usage

The stacked area chart interface looks like this:

```typescript
interface StackedAreaChartProps {
  xAxisLabels: string[];
  series: Series[];
  chartHeight?: number;
  accessibilityLabel?: string;
  opacity?: number;
  isAnimated?: boolean;
  formatXAxisLabel?(value: string, index?: number, data?: string[]): string;
  formatYAxisLabel?(value: number): string;
  renderTooltipContent?: (data: RenderTooltipContentData): React.ReactNode;
}
```

This component derives its size from its parent container and fills the width of its parent's container. It has a default height of `250`, which is configurable via the `chartHeight` prop. The `chartHeight` specifically affects the height of chart, and does not include or affect the height of the legend.

### The `Series` type

The `Series` type allows the user to define the color of each series. Its interface looks like this:

```typescript
{
  label: string;
  data: Data[];
  color: Color;
}
```

#### data

| type               |
| ------------------ |
| `number \| null[]` |

The array that the chart uses to plot the area. Null values are not displayed.

#### label

| type     |
| -------- |
| `string` |

The label for the series. This appears in the chart legend and tooltip.

#### color

It allows you to pass any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md) for the `color` value.

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

The prop to determine the chart's drawn area. Each `Series` object corresponds to an area drawn on the chart, and is explained in greater detail above.

### Optional Props

#### accessibilityLabel

| type     | default      |
| -------- | ------------ |
| `string` | empty string |

Visually hidden text for screen readers.

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

#### chartHeight

| type     | default |
| -------- | ------- |
| `number` | `250`   |

Determines the height of the chart.

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
