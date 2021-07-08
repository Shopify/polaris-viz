# Legend

Used on multiseries charts to indicate which color is associated with which series.

## Example

<img src="legend.png" alt="Legend example image showing first-time and returning series." />

```tsx
const series: LegendData = [
  {
    name: 'First-time',
    data: [],
    color: 'teal',
  },
  {
    name: 'Returning',
    color: 'purple',
  },
];

return <Legend series={series} />;
```

## Usage

With the exception of the `NormalizedStackedBarChart`, Polaris Viz components do not include a legend by default. This is to keep the component layout and style flexible. Add a `<Legend />` to the `<MultiSeriesBarChart />`, `<LineChart />`, or `<StackedAreaChart />` when they display multiple series.

## LegendData

The props interface for `<Legend />` accepts a series type, which is the same type provided to the chart. It looks like this:

```typescript
interface Series {
  name: string;
  color: string | GradientStop[];
  lineStyle?: LineStyle;
  data?: Data[];
}
[];
```

### name

The string used as the name of the series.

### color

The color that will be used in a square or line preview of the series. `color` accepts any valid CSS color or GradientStop array.

### lineStyle

| type                  | default       |
| --------------------- | ------------- |
| `'solid' \| 'dashed'` | `'undefined'` |

If a `lineStyle` is provided, a line preview will be displayed instead of a square. The `lineStyle` type determines if the drawn line for the series is a solid or dashed line.

### data

For convenience, data may be provided as part of the Series interface, so it can be shared with the chart component, however it is not required.
