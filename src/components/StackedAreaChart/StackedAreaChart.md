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

const xAxisLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

const formatYAxisLabel = (value?: number) => {
  const formatter = new Intl.NumberFormat('en').format;
  if (value == null) {
    return '-';
  }

  return formatter(value);
};

return (
  <StackedAreaChart
    formatYAxisLabel={formatYAxisLabel}
    xAxisLabels={xAxisLabels}
    series={series}
  />
);
```

## Usage

The stacked area chart interface looks like this:

```typescript
{
  xAxisLabels: string[];
  series: Series[];
  chartHeight?: number;
  accessibilityLabel?: string;
  formatXAxisLabel?(value: string, index?: number, data?: string[]): string;
  formatYAxisLabel?(value: number): string;
  tooltipSumDescriptor?: string;
  opacity?: number;
  isAnimated?: boolean;
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

### color

It allows you to pass any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md) for the `color` value.

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

### tooltipSumDescriptor

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

The text used to describe the total value of all series at a given point. If a descriptor isn't given, the total will not be displayed in the tooltip.

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
