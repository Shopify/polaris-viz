# Bar chart

Used to show comparison across categories.

## Example

<img src="bar-chart.png" alt="Bar chart example image" />

```tsx
const data = [
  {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
  {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
  {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
  {
    rawValue: 25.6,
    label: '2020-01-04T12:00:00Z',
  },
  {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
  {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
];

function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'short',
  });
}

function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumSignificantDigits: 2,
  }).format(value);
}

function formatTooltipLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTooltipValue(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
}

function renderTooltip({label, value}: {label: string; value: number}) {
  const formattedLabel = formatTooltipLabel(label);
  const formattedValue = formatTooltipValue(value);

  return <BarChartTooltip label={formattedLabel} value={formattedValue} />;
}

return (
  <BarChart
    data={data}
    color="primary"
    formatXAxisLabel={formatXAxisLabel}
    formatYAxisLabel={formatYAxisLabel}
    renderTooltip={renderTooltip}
  />
);
```

## Usage

The bar chart interface looks like this:

```typescript
{
  data: {rawValue: number, label: string}[];
  accessibilityLabel?: string;
  barMargin?: 'Small' | 'Medium' | 'Large' | 'None';
  color?: Color;
  formatXAxisLabel?(value: string, index?: number, data?: string[]): string;
  formatYAxisLabel?(value: number): string;
  renderTooltip?({label, value}: {lable: string, value: string}): React.ReactNode;
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

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis.

#### formatYAxisLabel

| type                      | default                       |
| ------------------------- | ----------------------------- |
| `(value: number): string` | `(value) => value.toString()` |

This accepts a function that is called when the Y value (`rawValue`) is formatted for the tooltip and for the Y Axis.

#### renderTooltip

| type                                                                 |
| -------------------------------------------------------------------- |
| `({label, value}: {label: string; value: number}): React.ReactNode;` |

This accepts a function that is called to render the tooltip markup. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<BarChartTooltip />`. Note that this only affects the content inside the `<TooltipContainer />`. The container provides the positioning and border for the content.

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
