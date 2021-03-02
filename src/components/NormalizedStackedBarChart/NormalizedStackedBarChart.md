# Normalized stacked bar chart

Used for positive datasets with two to four items. If your dataset has more than four items, consider grouping the fourth item and the remainder into an “other” category before passing data to the component.

## Example

<img src="normalized-stacked-bar-chart.png" alt="Normalized stacked bar chart example image" />

```tsx
<NormalizedStackedBarChart
  data={[
    {
      label: 'Direct',
      value: 200,
      formattedValue: '$200',
      comparisonMetric: {
        metric: '5%',
        trend: 'positive',
        accessibilityLabel: 'Increase of',
      },
    },
    {
      label: 'Facebook',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '5%',
        trend: 'negative',
        accessibilityLabel: 'Decrease of',
      },
    },
    {
      label: 'Twitter',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '0%',
        trend: 'neutral',
        accessibilityLabel: 'Neutral',
      },
    },
    {
      label: 'Google',
      value: 20,
      formattedValue: '$20',
    },
  ]}
  accessibilityLabel="A chart showing the breakdown of ad revenue"
  colors={['primary', 'secondary', 'tertiary', 'quaternary']}
  orientation="horizontal"
  size="large"
/>
```

## Usage

The normalized stacked bar chart interface looks like this:

```typescript
{
  data: Data[];
  accessibilityLabel?: string;
  colors?: Color[];
  orientation?: Orientation;
  size?: Size;
}
```

This component derives its size from its parent container. When the Normalized stacked bar chart is oriented horizontally, it is constrained by the parent's width; in vertical orientation, it's constrained by the parent's height.

### The `Data` type

The `Data` type gives the user the ability to define how the bars should look like. Its interface looks like this:

```typescript
{
  label: string;
  value: number;
  formattedValue: string;
  comparisonMetric?: ComparisonMetricShape;
}
```

#### label

| type     |
| -------- |
| `string` |

The name of the bar. This appears in the chart legend.

#### value

| type     |
| -------- |
| `number` |

The value to compute the width of each bar,

#### formattedValue

| type     |
| -------- |
| `string` |

A readable version of the value (e.g "\$5"). This appears in the chart legend.

#### comparisonMetric

| type
| -------------------------------------------------------------------------------------------- |
| `{trend: 'netural' \| 'positive' \| 'negative', metric: string, accessibilityLabel: string}` |

An optional object that adds a comparison metric on the end of the label. Trend determines the direction and color of the arrow, metric is the actual label displayed, and the accessibilityLabel covers the SVG only.

### Required props

#### data

| type     |
| -------- |
| `Data[]` |

The prop to determine the chart's drawn area. Each `Data` object corresponds to a bar drawn on the chart, and is explained in greater detail above.

### Optional props

#### accessibilityLabel

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Visually hidden text for screen readers.

#### colors

| type      | default                                                         |
| --------- | --------------------------------------------------------------- |
| `Color[]` | `['colorPurpleDark', 'colorBlue', 'colorTeal', 'colorSkyDark']` |

An array of colors that determines the fill colors of each bar. The colors are applied sequentially to the chart. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

#### orientation

| type                     | default      |
| ------------------------ | ------------ |
| `horizontal \| vertical` | `horizontal` |

Determines the orientation of the chart.

#### size

| type             | default |
| ---------------- | ------- |
| `small \| large` | `small` |

Determines the thickness of the chart.
