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
      {rawValue: 2251, label: '2020-04-01T12:00:00'},
      {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
      {rawValue: 5000, label: '2020-04-03T12:00:00'},
      {rawValue: 7200, label: '2020-04-04T12:00:00'},
      {rawValue: 1500, label: '2020-04-05T12:00:00'},
      {rawValue: 6132, label: '2020-04-06T12:00:00'},
      {rawValue: 3100, label: '2020-04-07T12:00:00'},
      {rawValue: 2200, label: '2020-04-08T12:00:00'},
      {rawValue: 5103, label: '2020-04-09T12:00:00'},
      {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
      {rawValue: 4004, label: '2020-04-11T12:00:00'},
      {rawValue: 6000, label: '2020-04-12T12:00:00'},
      {rawValue: 5500, label: '2020-04-13T12:00:00'},
      {rawValue: 7000, label: '2020-04-14T12:00:00'},
    ],
    color: 'primary',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 5200, label: '2020-03-01T12:00:00'},
      {rawValue: 7000, label: '2020-03-02T12:00:00'},
      {rawValue: 1000, label: '2020-03-03T12:00:00'},
      {rawValue: 2000, label: '2020-03-04T12:00:00'},
      {rawValue: 5000, label: '2020-03-05T12:00:00'},
      {rawValue: 1000, label: '2020-03-06T12:00:00'},
      {rawValue: 2000, label: '2020-03-07T12:00:00'},
      {rawValue: 5000, label: '2020-03-08T12:00:00'},
      {rawValue: 4000, label: '2020-03-09T12:00:00'},
      {rawValue: 11200, label: '2020-03-10T12:00:00'},
      {rawValue: 2000, label: '2020-03-11T12:00:00'},
      {rawValue: 3000, label: '2020-03-12T12:00:00'},
      {rawValue: 2000, label: '2020-03-13T12:00:00'},
      {rawValue: 3000, label: '2020-03-14T12:00:00'},
    ],
    color: 'pastComparison',
    lineStyle: 'dashed' as 'dashed',
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
    currency: 'CAD',
    currencyDisplay: 'symbol',
    maximumSignificantDigits: 1,
  }).format(value);
}

const renderTooltipContent: LineChartProps['renderTooltipContent'] = ({
  data,
}) => {
  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  function formatTooltipLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const formattedData = data.map(({name, point: {label, value}, style}) => ({
    name,
    style,
    point: {
      value: formatTooltipValue(value),
      label: formatTooltipLabel(label),
    },
  }));

  return <LineChartTooltipContent data={formattedData} />;
};

return (
  <LineChart
    series={series}
    xAxisOptions={{
      xAxisLabels,
      labelFormatter: formatXAxisLabel,
    }}
    yAxisOptions={{labelFormatter: formatYAxisLabel}}
    renderTooltipContent={renderTooltipContent}
    skipLinkText="Skip chart content"
  />
);
```

## Usage

The line chart interface looks like this:

```typescript
interface LineChartProps {
  series: Series[];
  isAnimated?: boolean;
  lineOptions?: {
    hasSpline?: boolean;
    width?: number;
  };
  xAxisOptions: {
    xAxisLabels: string[];
    labelFormatter?(value: string, index?: number, data?: string[]): string;
    hideXAxisLabels?: boolean;
    useMinimalLabels?: boolean;
    showTicks?: boolean;
    labelColor: string;
  };
  yAxisOptions?: {
    labelFormatter?(value: number): string;
    labelColor: string;
  }
  gridOptions?: {
    showVerticalLines?: boolean;
    showHorizontalLines?: boolean;
    horizontalOverflow?: boolean;
    color?: string;
  }
  crossHairOptions?: {
    width?: number;
    color?: string;
    opacity?: number;
  }
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
  color?: Color;
  lineStyle?: LineStyle;
  areaColor?: string;
}
```

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

| type    | default   |
| ------- | --------- |
| `Color` | `primary` |

This accepts any [Polaris Viz color](/documentation/Polaris-Viz-colors.md) value.

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

##### hideXAxisLabels

| type      | default |
| --------- | ------- |
| `boolean` | false   |

Whether to visually hide the x axis labels on the chart. The labels will still be displayed to screenreaders.

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

##### labelColor

| type     | default                |
| -------- | ---------------------- |
| `string` | `'rgb(223, 227, 232)'` |

The color used for axis labels.

#### yAxisOptions

An object including the following optional proprties that define the appearance of the yAxis.

##### labelFormatter

| type                       | default                       |
| -------------------------- | ----------------------------- |
| `(value: number): string;` | `(value) => value.toString()` |

This utilty function is called to format the labels for every y axis value when the chart is laid out.

##### labelColor

| type     | default                |
| -------- | ---------------------- |
| `string` | `'rgb(223, 227, 232)'` |

The color used for axis labels.

#### lineOptions

An object including the following optional proprties that define the appearance of the line.

##### hasSpline

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to curve the lines between points.

##### width

| type     | default |
| -------- | ------- |
| `number` | `2`     |

The width of the lines drawn between points.

#### gridOptions

An object including the following optional proprties that define the grid.

##### showVerticalLines

| type      | default |
| --------- | ------- |
| `boolean` | `true`  |

Whether to show lines extending from the xAxis labels through the chart.

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

#### CrossHairOptions

An object including the following optional proprties that define the crosshair.

##### width

| type     | default |
| -------- | ------- |
| `number` | `5`     |

The width of the crosshair.

##### color

| type     | default                |
| -------- | ---------------------- |
| `string` | `'rgb(223, 227, 232)'` |

The color of the crosshair.

##### opacity

| type     | default |
| -------- | ------- |
| `number` | `1`     |

Whether to curve the line between points.

The opacity of the crosshair.
