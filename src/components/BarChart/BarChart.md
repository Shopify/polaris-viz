# Bar chart

Used to show comparison across categories.

## Example

<img src="bar-chart.png" alt="Bar chart example image" />

```tsx
const data = [
  {rawValue: 3.19, label: 'Chicago Hot Dog'},
  {rawValue: 6.29, label: 'Italian Beef'},
  {rawValue: 4.79, label: 'Polish Sausage'},
  {
    rawValue: 0.6,
    label: 'Hot Peppers',
  },
  {rawValue: 2.69, label: 'French Fries'},
  {rawValue: 4.19, label: 'Cake Shake'},
];

const formatYValue = (val) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumSignificantDigits: 3,
  }).format(val);

return <BarChart formatYValue={formatYValue} color="primary" data={data} />;
```

## Usage

The bar chart interface looks like this:

```typescript
{
  data: {rawValue: number, label: string}[];
  accessibilityLabel?: string;
  barMargin?: 'Small' | 'Medium' | 'Large' | 'None';
  color?: Color;
  formatXAxisLabel?(value: string, index: number): string;
  formatYValue?(value: number): string;
  highlightColor?: Color;
  timeSeries?: boolean;
}
```

### Required props

#### data

| type                                  |
| ------------------------------------- |
| `{rawValue: number, label: string}[]` |

The array of objects that the chart uses to draw the chart.

### Optional props

#### accessibilityLabel

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Visually hidden text for screen readers.

#### barMargin

| type                                       | default  |
| ------------------------------------------ | -------- |
| `'Small' \| 'Medium' \| 'Large' \| 'None'` | `Medium` |

This sets the margin between each of the bars. A value of `None` will make the bars look as if they are one continuous element.

#### color

| type    | default       |
| ------- | ------------- |
| `Color` | `colorPurple` |

The bar fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

#### formatXAxisLabel

| type                                      | default                       |
| ----------------------------------------- | ----------------------------- |
| `(value: string, index: number): string;` | `(value) => value.toString()` |

This accepts a function that is called when the chart draws its X axis.

#### formatYValue

| type                      | default                       |
| ------------------------- | ----------------------------- |
| `(value: number): string` | `(value) => value.toString()` |

This accepts a function that is called when the Y value (`rawValue`) is formatted for the tooltip.

#### highlightColor

| type    | default       |
| ------- | ------------- |
| `Color` | `colorPurple` |

The bar fill color when you hover over a bar in the chart. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

#### timeSeries

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

This indicates to the chart if the data provide is time series data. If `true`, the x-axis will display fewer labels as needed according to the data.
