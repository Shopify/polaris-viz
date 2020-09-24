# Line chart

Used to show change over time, comparisons, and trends.

## Example

<img src="line-chart.png" alt="Line chart example image" />

```tsx
const formatAxisValue = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'CAD',
  currencyDisplay: 'narrowSymbol',
}).format;
const formatY = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'CAD',
}).format;

const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 2251, label: 'April 01, 2020'},
      {rawValue: 12132.2, label: 'April 02, 2020'},
      {rawValue: 5000, label: 'April 03, 2020'},
      ...
    ],
    style: {
      color: 'primary',
    },
    formatY,
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 5200, label: 'March 01, 2020'},
      {rawValue: 7000, label: 'March 02, 2020'},
      {rawValue: 1000, label: 'March 03, 2020'},
      ...
    ],
    style: {
      color: 'pastComparison',
      lineStyle: 'dashed' as 'dashed',
    },
    formatY,
  },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-CA', {day: 'numeric', month: 'numeric'});
const xAxisLabels = series[0].data.map(
  ({label}) => `${formatDate(new Date(label))}`,
);

return (
  <LineChart
    xAxisLabels={xAxisLabels}
    formatYAxisValue={formatYAxisValue}
    series={series}
  />
);
```

## Usage

The Line chart interface looks like this:

```typescript
{
  series: Series[];
  accessibilityLabel?: string;
  chartHeight?: number;
  formatYAxisValue?(value: number): string;
  xAxisLabels?: string[];
}
```

This component derives its size from its parent container and fills the width of its parent's container. It has a default height of `250`, which is configurable via the `chartHeight` prop. The `chartHeight` specifically affects the height of chart, and does not include or affect the height of the legend.

### The `Series` type

The `Series` type gives the user a lot of flexibility to define exactly what each series/line should look like. Its interface looks like this:

```typescript
{
  data: {
    label: string;
    rawValue: number;
  }[];
  name: string;
  formatY?(value: number): string;
  style?: {
    color?: Color;
    lineStyle?: LineStyle;
  };
}
```

#### data

| type                                  |
| ------------------------------------- |
| `{label: string, rawValue: number}[]` |

The array of objects that the chart uses to plot the line.

#### name

| type     |
| -------- |
| `string` |

The name of the series. This appears in the chart legend.

#### formatY

| type                      | default            |
| ------------------------- | ------------------ |
| `(value: number): string` | `formatYAxisValue` |

The `formatY` function is used to format `rawValue` for the tooltip. This falls back to whatever function is passed to `formatYAxisValue`.

#### style

| type                                               | default                                      |
| -------------------------------------------------- | -------------------------------------------- |
| `{color?: Color, lineStyle?: 'dashed' \| 'solid'}` | `{color: 'colorPurple', lineStyle: 'solid'}` |

The `style` prop accepts an object to configure the given series' style. It allows you to pass any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md) for the `color` value.

### Required Props

#### series

| type       |
| ---------- |
| `Series[]` |

The prop to determine the chart's drawn area. Each `Series` object corresponds to a line drawn on the chart, and is explained in greater detail above.

### Optional Props

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

#### formatYAxisValue

| type                       | default                     |
| -------------------------- | --------------------------- |
| `(value: number): string;` | `` (value) => `${value}` `` |

This utilty function is called when the chart is laid out for every y axis value.

### xAxisLabels

| type       | default |
| ---------- | ------- |
| `string[]` | `[]`    |

The labels to display on the x axis of the chart. If no labels are passed, there are no labels rendered on the x axis of the chart.
