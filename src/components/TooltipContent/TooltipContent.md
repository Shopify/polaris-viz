# Tooltip content

Used to format content within a chart's tooltip.

## Example

<img src="tooltip-content.jpg" alt="Tooltip Content example image. It shows an example of TooltipContent, LineChartTooltipContent, and BarChartTooltipContent" />

```tsx
const tooltipContentData: TooltipContentProps['data'] = [
  {
    color: 'purple',
    label: 'Hot dogs',
    value: '10',
  },
  {
    color: 'green',
    label: 'Hamburgers',
    value: '14',
  },

  {
    color: 'grey',
    label: 'Fries',
    value: '21',
  },
];

const lineChartTooltipContentData: LineChartTooltipContentProps['data'] = [
  {
    name: 'Hot Dogs',
    point: {
      label: 'January 1st, 2021',
      value: '10',
    },
    color: 'purple',
    lineStyle: 'solid',
  },
  {
    name: 'Hot Dogs',
    point: {
      label: 'December 1st, 2020',
      value: '12',
    },
    color: 'grey',
    lineStyle: 'dashed',
  },
];

const barChartAnnotation = {
  dataIndex: 1,
  width: 5,
  color: '#ccc',
  tooltipData: {
    label: 'Median: ',
    value: '1.5',
  },
};

return (
  <div>
    <TooltipContent
      title="January 1st, 2021"
      data={tooltipContentData}
      total={{
        label: 'Total',
        value: '45',
      }}
    />

    <LineChartTooltipContent data={lineChartTooltipContentData} />

    <BarChartTooltipContent
      label="January 1st, 2021"
      value="10"
      annotation={barChartAnnotation}
    />
  </div>
);
```

## Usage

Polaris Viz charts provide a default tooltip, but sometimes you need more control. The bar chart, line chart, multi-series bar chart, and stacked area chart components expose a `renderTooltipContent` callback. This allows you to return JSX to customize the content inside of a tooltip.

You can reuse the same components that Polaris Viz uses to format tooltip content. It is recommended to use the `<TooltipContent />` component with the multi-series bar chart and stacked area chart. Use `<LineChartTooltipContent />` for line chart tooltips and `<BarChartTooltipContent />` for bar chart tooltips.

No formatting will be applied in any case to values passed to tooltip content components. They expect pre-formatted values.

**Note:** These components are meant to be used with the `renderTooltipContent` callback.

### TooltipContent

The props interface for `<TooltipContent />` looks like this:

```typescript
interface TooltipContentProps {
  title?: string;
  data: {
    color: string | GradientStop[];
    label: string;
    value: string;
  }[];
  total?: null | {
    label: string;
    value: string;
  };
}
```

#### Required props

##### data

| type                                            |
| ----------------------------------------------- |
| `{color:string | GradientStop[]; label: string; value: number}[]` |

Each member of the `data` array corresponds to a row in the `<TooltipContent />` object. The value for `color` corresponds to the fill color for the square preview, and accepts any CSS color or GradientStop[].

#### Optional props

##### title

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

The title to display at the top of the tooltip.

##### total

| type                                    | default     |
| --------------------------------------- | ----------- |
| `{label: string; value: string} | null` | `undefined` |

This allows you to add a total row at the bottom of all the data rows.

### LineChartTooltipContent

The props interface for `<LineChartTooltipContent />` looks like this:

```typescript
interface LineChartTooltipContentProps {
  data: {
    name: string;
    point: {
      label: string;
      value: string;
    };
    color?: string | GradientStop[];
    lineStyle?: LineStyle;
  }[];
}
```

This is meant to be used alongside `<LineChart />`.

#### Required props

##### name

| type     |
| -------- |
| `string` |

The name associated with the data point's series

##### point

| type                             |
| -------------------------------- |
| `{label: string; value: number}` |

The values to display for the given data point.

#### Optional props

##### color

| type    | default       |
| ------- | ------------- |
| `string | GradientStop[]` | None |

Accepts any CSS color or GradientStop[].

##### lineStyle

| type        | default |
| ----------- | ------- |
| `LineStyle` | `solid` |

This sets the style for the line drawn next to the point label. Accepts `solid` and `dashed`, and defaults to `solid`.

### BarChartTooltipContent

The props interface for `<BarChartTooltipContent />` looks like this:

```typescript
interface BarChartTooltipContentProps {
  label: string;
  value: string;
  annotation?: Annotation;
}
```

This is meant to be used alongside `<BarChart />`.

#### Required props

##### label

| type     |
| -------- |
| `string` |

The label to display on the tooltip.

##### value

| type     |
| -------- |
| `string` |

The value to display on the tooltip.

#### Optional props

##### annotation.tooltipData

| type                             |
| -------------------------------- |
| `{label: string, value: string}` |

The annotation `label` and `value` will be shown in the tooltip content above the other tooltip values.
