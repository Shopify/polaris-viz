# Line chart

Used to show change over time, comparisons, and trends.

It's reccomended that you use a legend whenever displaying multiseries data. To display one, use the <a href="../Legend/Legend.md">`<Legend />` component</a>.

## Example

<img src="line-chart.png" alt="Line chart example image" />

```tsx
const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 333, label: '2020-04-01T12:00:00'},
      {rawValue: 797, label: '2020-04-02T12:00:00'},
      {rawValue: 234, label: '2020-04-03T12:00:00'},
      {rawValue: 534, label: '2020-04-04T12:00:00'},
      {rawValue: -132, label: '2020-04-05T12:00:00'},
      {rawValue: 159, label: '2020-04-06T12:00:00'},
      {rawValue: 239, label: '2020-04-07T12:00:00'},
      {rawValue: 708, label: '2020-04-08T12:00:00'},
      {rawValue: 234, label: '2020-04-09T12:00:00'},
      {rawValue: 645, label: '2020-04-10T12:00:00'},
      {rawValue: 543, label: '2020-04-11T12:00:00'},
      {rawValue: 89, label: '2020-04-12T12:00:00'},
      {rawValue: 849, label: '2020-04-13T12:00:00'},
      {rawValue: 129, label: '2020-04-14T12:00:00'},
    ],
    color: [
      {
        offset: 0,
        color: '#08CA9B',
      },
      {
        offset: 85,
        color: 'rgba(92,105,208,0.8)',
      },
      {
        offset: 100,
        color: 'rgba(92,105,208,0.8)',
      },
    ],
    lineStyle: 'solid' as 'solid',
    areaColor: 'rgba(92,105,208,0.5)',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 709, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 710, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
      {rawValue: 623, label: '2020-03-13T12:00:00'},
      {rawValue: 21, label: '2020-03-14T12:00:00'},
    ],
    color: '#D3D3D3',
    lineStyle: 'dotted' as 'dotted',
  },
];

const xAxisLabels = series[0].data.map(({label}) => label);

function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'numeric',
  });
}

function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  }).format(value);
}

const renderTooltipContent: LineChartProps['renderTooltipContent'] = ({
  data,
}) => {
  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  function formatTooltipLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const formattedData = data.map(
    ({name, point: {label, value}, color, lineStyle}) => ({
      name,
      color,
      lineStyle,
      point: {
        value: formatTooltipValue(value),
        label: formatTooltipLabel(label),
      },
    }),
  );

  return <LineChartTooltipContent data={formattedData} />;
};

const props = {
  series,
  isAnimated: true,
  renderTooltipContent,
  xAxisOptions: {
    xAxisLabels: xAxisLabels,
    labelFormatter: formatXAxisLabel,
    useMinimalLabels: true,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
    integersOnly: true,
  },
  skipLinkText = 'Skip chart content',
  theme: "Default"
};

return <LineChart {...props} />;
```

## Usage

The line chart interface looks like this:

```typescript
interface LineChartProps {
  series: Series[];
  isAnimated?: boolean;
  xAxisOptions: {
    xAxisLabels: string[];
    labelFormatter?(value: string, index?: number, data?: string[]): string;
    useMinimalLabels?: boolean;
  };
  yAxisOptions?: {
    labelFormatter?(value: number): string;
    integersOnly?: boolean;
  };
  renderTooltipContent?: (data: RenderTooltipContentData): React.ReactNode;
  skipLinkText?: string;
  emptyStateText?: string;
}
```

This component derives its size from its parent container and fills the width of its parent's container.

### The `Series` type

The `Series` type gives the user a lot of flexibility to define exactly what each series/line should look like. Its interface looks like this:

```typescript
{
  name: string;
  data: {
    label: string;
    rawValue: number;
  }[];
  color?: SeriesColor;
  lineStyle?: LineStyle;
  areaColor?: string;
}
```

Note: the configuration of color, line style and area color on the series type overrides the defaults set by the theme provider.

#### name

| type     |
| -------- |
| `string` |

The name of the series.

#### data

| type                                  |
| ------------------------------------- |
| `{label: string, rawValue: number}[]` |

The array of objects that the chart uses to plot the line.

#### color

| type                                           | default   |
| ---------------------------------------------- | --------- |
| `string \| { color: string, offset: number }[]` | `primary` |

This accepts any CSS color or gradient. If these values have transparency, the points will be rendered at full opacity while the line will use the original opacity.

#### lineStyle

| type                              | default   |
| --------------------------------- | --------- |
| `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |

The lineStyle type determines if the drawn line for the series is a solid or dashed line.

#### areaColor

| type                 | default     |
| -------------------- | ----------- |
| `string | undefined` | `undefined` |

The areaColor property determines the color for the gradient area to be used for that series. If none is specified, a gradient area will not be rendered.

If `series` may be an empty array, provide <a href="#emptyStateText">`emptyStateText`</a> to communicate the empty state to screenreaders.

### The `RenderTooltipContentData` type

The `RenderTooltipContentData` type looks very similar to the `Series` type. Its interface looks like this:

```tsx
interface RenderTooltipContentData {
  data: {
    name: string;
    point: {
      label: string;
      value: number;
    };
    style?: {
      color?: Color;
      lineStyle?: LineStyle;
    };
  }[];
}
```

The distinction between the `RenderTooltipContentData` and `Series` types is that `RenderTooltipContentData` is for a single data point, instead of an entire series of data.

### Required props

#### series

| type       |
| ---------- |
| `Series[]` |

The prop to determine the chart's drawn area. Each `Series` object corresponds to a line drawn on the chart, and is explained in greater detail above.

#### xAxisOptions: xAxisLabels

| type       | default |
| ---------- | ------- |
| `string[]` | `[]`    |

The labels to display on the x axis of the chart and in a data table used for screenreaders.

### Optional props

#### isAnimated

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to animate the lines and gradient when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.

#### renderTooltipContent

| type                                                 |
| ---------------------------------------------------- |
| `(data: RenderTooltipContentData): React.ReactNode;` |

This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<LineChartTooltipContent />`. For more information about tooltip content, read the [tooltip content documentation](/src/components/TooltipContent/TooltipContent.md).

#### skipLinkText

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.

#### emptyStateText

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Used to indicate to screenreaders that a chart with no data has been rendered, in the case that an empty array is passed as the series data. It is strongly recommended that this is included if the series prop could be an empty array.

#### xAxisOptions

An object including the following proprties that define the appearance of the xAxis. Only xAxisLabels is mandatory.

##### useMinimalLabels

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

If set to true, a chart that would typically show more than three xAxis labels will instead show a maximum of three labels.

##### showTicks

| type      | default |
| --------- | ------- |
| `boolean` | true    |

Whether to show ticks connecting the xAxis labels to their corresponding grid line.

##### labelFormatter

| type                                                        | default                       |
| ----------------------------------------------------------- | ----------------------------- |
| `(value: string, index?: number, data?: string[]): string;` | `(value) => value.toString()` |

This accepts a function that is called to format the labels when the chart draws its X axis.

#### yAxisOptions

An object including the following optional proprties that define the appearance of the yAxis.

##### labelFormatter

| type                       | default                       |
| -------------------------- | ----------------------------- |
| `(value: number): string;` | `(value) => value.toString()` |

This utilty function is called to format the labels for every y axis value when the chart is laid out.

##### integersOnly

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Only use whole numbers for y axis ticks.

### theme

| type      | default |
| --------- | ------- |
| `string` | `default` |

The theme that the chart will inherit its styles from. Additional themes must be provided to the theme provider. Individual line styles can be overwritten as part of the series prop.
