# Sparkbar

Used in small sizes to give an overview of how a metric has performed over time.

## Example

<img src="sparkbar.png" alt="Sparkbar example image" />

```tsx
<div style={{width: '200px', height: '50px'}}>
  <Sparkbar
    data={[100, 200, 300, 400, 400, 1000, 200, 800, 900, 200, 400]}
    accessibilityLabel="A bar chart showing orders over time for the past 11 weeks. The minimum is 100 orders and the maximum is 1,000 orders, compared to an average of 500 orders during previous 11-week period."
    isAnimated
    comparison={[
      {x: 0, y: 500},
      {x: 1, y: 500},
      {x: 2, y: 500},
      {x: 3, y: 500},
      {x: 4, y: 500},
      {x: 5, y: 500},
      {x: 6, y: 500},
      {x: 7, y: 500},
      {x: 8, y: 500},
      {x: 9, y: 500},
      {x: 10, y: 500},
    ]}
    dataOffsetRight={50}
    dataOffsetLeft={12}
  />
</div>
```

## Usage

The sparkbar interface looks like this:

```typescript
{
  data: (number | null)[];
  comparison?: number;
  color?: Color;
  accessibilityLabel?: string;
  isAnimated?: boolean;
  barFillStyle?: 'solid' | 'gradient'
  dataOffsetRight?: number;
  dataOffsetLeft?: number;
}
```

This component determines its width and height based off its parent element. The typical usage is to wrap this component in a div that has a height/width set, like:

```tsx
<div style={{height: '200px', width: '50px'}}>
  <Sparkbar {...props} />
</div>
```

### Required props

#### data

| type                |
| ------------------- |
| `(number | null)[]` |

The prop to determine the chart's bars. Null bars will not be plotted. Bars with the value of `0` will render a very small bar to indicate the presence of the value.

### Optional props

#### comparison

| type                      | default     |
| ------------------------- | ----------- |
| `{x: number; y: number;}` | `undefined` |

The prop to determine the comparison line for the chart.

#### color

| type    | default     |
| ------- | ----------- |
| `Color` | `colorTeal` |

The sparkbar stroke and fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

#### accessibilityLabel

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Visually hidden text for screen readers.

#### isAnimated

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Determines whether to animate the chart on state changes.

### barFillStyle

| type               | default |
| ------------------ | ------- |
| `solid | gradient` | `solid` |

Determines whether what kind of shading to use to fill the bars.

##### dataOffsetLeft

| type     | default |
| -------- | ------- |
| `number` | `0`     |

The amount of pixels to add as a left margin to the bar data.

##### dataOffsetRight

| type     | default |
| -------- | ------- |
| `number` | `0`     |

The amount of pixels to add as a right margin to the bar data.
