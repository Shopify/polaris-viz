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

function renderTooltipContent({label, value}: {label: string; value: number}) {
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

  const formattedLabel = formatTooltipLabel(label);
  const formattedValue = formatTooltipValue(value);

  return (
    <BarChartTooltipContent label={formattedLabel} value={formattedValue} />
  );
}

return (
  <BarChart
    data={data}
    barOptions={{color: 'primary'}}
    xAxisOptions={{labelFormatter: formatXAxisLabel}}
    yAxisOptions={{labelFormatter: formatYAxisLabel}}
    renderTooltipContent={renderTooltipContent}
    skipLinkText="Skip chart content"
  />
);
```

## Usage

The bar chart interface looks like this:

```typescript
interface BarChartProps {
  data: {
    rawValue: number;
    label: string;
    barOptions?: {
      color: Color;
    };
  }[];
  renderTooltipContent?({
    label,
    value,
  }: {
    lable: string;
    value: string;
  }): React.ReactNode;
  skipLinkText?: string;
  emptyStateText?: string;
  barOptions?: {
    innerMargin?: 'Small' | 'Medium' | 'Large' | 'None';
    outerMargin?: 'Small' | 'Medium' | 'Large' | 'None';
    color?: Color;
    highlightColor?: Color;
    hasRoundedCorners?: boolean;
  };
  gridOptions?: {
    showHorizontalLines?: boolean;
    color?: string;
    horizontalOverflow?: boolean;
  };
  xAxisOptions?: {
    labelFormatter?(value: string, index?: number, data?: string[]): string;
    showTicks?: boolean;
    labelColor?: string;
    useMinimalLabels?: boolean;
  };
  yAxisOptions?: {
    labelFormatter?(value: number): string;
  };
  annotations?: {
    dataIndex: number;
    width: number;
    color: string;
    ariaLabel?: string;
    xOffset?: number;
    tooltipData?: {
      label: string;
      value: string;
    };
  }[];
}
```

In order for the user to have visual feedback that a bar has been selected, it is recommended that a `highlightColor`, which is different to the `color`, is passed in for this component. If a `highlightColor` is not provided, the browser's default outline treatment will be used when the bar is focused.

### Required props

#### data

| type                                                               |
| ------------------------------------------------------------------ |
| `{rawValue: number, label: string, barOptions?: {color: Color}}[]` |

The array of objects that the chart uses to draw the chart.
If `data` may be an empty array, provide <a href="#emptyStateText">`emptyStateText`</a> to communicate the empty state to screenreaders.

#### Optional data props

##### barOptions

An optional object including the following proprties that define the appearance of an individual bar.

###### color

| type    | default   |
| ------- | --------- |
| `Color` | `primary` |

The individual bar fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

### Optional props

#### isAnimated

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.

#### renderTooltipContent

| type                                                                 |
| -------------------------------------------------------------------- |
| `({label, value}: {label: string; value: number}): React.ReactNode;` |

This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<BarChartTooltipContent />`. For more information about tooltip content, read the [tooltip content documentation](/src/components/TooltipContent/TooltipContent.md).

#### skipLinkText

| type     |
| -------- |
| `string` |

If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.

#### emptyStateText

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Used to indicate to screenreaders that a chart with no data has been rendered, in the case that an empty array is passed as the data. It is strongly recommended that this is included if the data prop could be an empty array.

#### barOptions

An optional object including the following proprties that define the appearance of the bar.

##### innerMargin

| type                                       | default  |
| ------------------------------------------ | -------- |
| `'Small' \| 'Medium' \| 'Large' \| 'None'` | `Medium` |

This sets the margin between each of the bars. A value of `None` will make the bars look as if they are one continuous element. See [documentation](https://github.com/d3/d3-scale/blob/master/README.md#band_paddingInner) for more info.

##### outerMargin

| type                                       | default |
| ------------------------------------------ | ------- |
| `'Small' \| 'Medium' \| 'Large' \| 'None'` | `None`  |

This sets the margin before and after all bars. A value of `None` will have bars start at the Y axis and end at the edge of the chart. See [documentation](https://github.com/d3/d3-scale/blob/master/README.md#band_paddingOuter) for more info.

##### color

| type    | default   |
| ------- | --------- |
| `Color` | `primary` |

The bar fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

##### highlightColor

| type    | default   |
| ------- | --------- |
| `Color` | `primary` |

The bar fill color when you hover over a bar in the chart. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

##### hasRoundedCorners

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Rounds the top corners of each bar, in the case of positive numbers. Rounds the bottom corners for negatives.

The color used for axis labels.

#### gridOptions

An object including the following optional proprties that define the grid.

##### showHorizontalLines

| type      | default |
| --------- | ------- |
| `boolean` | `true`  |

Whether to show lines extending from the yAxis labels through the chart.

##### horizontalOverflow

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether the lines should extend through the width of the entire chart.

##### color

| type     | default                |
| -------- | ---------------------- |
| `string` | `"rgb(223, 227, 232)"` |

The color of the grid lines.

#### xAxisOptions

##### labelFormatter

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis.

##### labelColor

| type     | default                |
| -------- | ---------------------- |
| `string` | `'rgb(223, 227, 232)'` |

The color used for axis labels.

##### useMinimalLabels

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

If set to true, a chart with more than three xAxis labels will show a maximum of three labels. This option is useful when timeseries data is displayed.

##### showTicks

| type      | default |
| --------- | ------- |
| `boolean` | `true`  |

Whether to show ticks connecting the xAxis labels to their corresponding grid line.

#### yAxisOptions

##### labelFormatter

| type                      | default                       |
| ------------------------- | ----------------------------- |
| `(value: number): string` | `(value) => value.toString()` |

This accepts a function that is called when the Y value (`rawValue`) is formatted for the tooltip and for the Y Axis.

##### labelColor

| type     | default                |
| -------- | ---------------------- |
| `string` | `'rgb(223, 227, 232)'` |

The color used for axis labels.

#### annotations

| type                                                  |
| ----------------------------------------------------- |
| `{dataIndex: number, width: number, color: string}[]` |

An optional array of objects that the chart uses to draw annotations on the bars.

- The `dataIndex` should be a unique value. If two are more of the same values are provided. The last provided one is used.

- `width` is used to determine the annotation line `strokeWidth`.

- `color` can be [any valid CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) such as a named color, hex, rgb, or rgba value.

##### Optional annotation props

##### xOffset

| type     | default |
| -------- | ------- |
| `number` | `0.5`   |

Used to move the annotation line between the start and end of the bar that it is annotating. Use a value ranging from 0 to 1.

- 0 is the start of the bar.
- 0.5 is the center of the bar.
- 1 is the end of the bar.

##### ariaLabel

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Used to indicate to screenreaders that an annotation line has been rendered. It is strongly recommended that this is included.

##### tooltipData

| type                             |
| -------------------------------- |
| `{label: string, value: string}` |

The annotation `label` and `value` will be shown in the tooltip content above the other tooltip values.
