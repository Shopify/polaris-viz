# Bar chart

Used to show comparison across categories.

## Example

<img src="bar-chart.png" alt="Bar chart example image" />

```tsx
function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en-CA', {
    maximumSignificantDigits: 2,
  }).format(value);
}

function renderTooltipContent({label, value}: {label: string; value: number}) {
  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en-CA').format(value);
  }

  const formattedValue = formatTooltipValue(value);

  return <BarChartTooltipContent label={label} value={formattedValue} />;
}

const props = {
  data: [
    {label: 'Monday', rawValue: 174},
    {label: 'Tuesday', rawValue: 8},
    {label: 'Wednesday', rawValue: 22},
    {label: 'Thursday', rawValue: 50},
    {label: 'Friday', rawValue: 89},
    {label: 'Saturday', rawValue: 30},
    {label: 'Sunday', rawValue: 10},
  ],
  skipLinkText: 'Skip chart content',
  xAxisOptions: {
    useMinimalLabels: true,
    labelColor: 'rgb(220, 220, 220)',
  },
  yAxisOptions: {
    integersOnly: true,
    labelFormatter: formatYAxisLabel,
  },
  isAnimated: true,
  renderTooltipContent: {renderTooltipContent},
  skipLinkText: 'Skip chart content',
  theme: 'Default'
};

return <BarChart {...props} />;
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
    label: string;
    value: string;
  }): React.ReactNode;
  skipLinkText?: string;
  emptyStateText?: string;
  xAxisOptions?: {
    labelFormatter?(value: string, index?: number, data?: string[]): string;
    useMinimalLabels?: boolean;
  };
  yAxisOptions?: {
    labelFormatter?(value: number): string;
    integersOnly?: boolean;
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
  theme?: string;
}
```

### Required props

#### data

| type                                                               |
| ------------------------------------------------------------------ |
| `{rawValue: number, label: string, barOptions?: {color: string}}[]` |

The array of objects that the chart uses to draw the chart.
If `data` may be an empty array, provide <a href="#emptyStateText">`emptyStateText`</a> to communicate the empty state to screenreaders.

#### Optional data props

##### barOptions

An optional object including the following proprties that define the appearance of an individual bar.

###### color

| type    | default   |
| ------- | --------- |
| `string` | The color of the series. |

The individual bar fill color.

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

#### theme

| type     | default     |
| -------- | ----------- |
| `string` | `Default` |

The theme controls the visual appearance of the chart, its axis and grid.

#### xAxisOptions

##### labelFormatter

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis.

##### useMinimalLabels

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

If set to true, a chart with more than three xAxis labels will show a maximum of three labels. This option is useful when timeseries data is displayed.

#### yAxisOptions

##### labelFormatter

| type                      | default                       |
| ------------------------- | ----------------------------- |
| `(value: number): string` | `(value) => value.toString()` |

This accepts a function that is called when the Y value (`rawValue`) is formatted for the tooltip and for the Y Axis.

##### integersOnly

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Only use whole numbers for y axis ticks

#### annotations

| type                                                           |
| -------------------------------------------------------------- |
| `{dataIndex: number, width: number, color: Color \| string}[]` |

An optional array of objects that the chart uses to draw annotations on the bars.

- The `dataIndex` should be a unique value. If two are more of the same values are provided. The last provided one is used.

- `width` is used to determine the annotation line `strokeWidth`.

- `color` can be a Color token or [any valid CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) such as a named color, hex, rgb, or rgba value.

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
