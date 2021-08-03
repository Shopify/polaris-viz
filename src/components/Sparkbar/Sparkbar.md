# Sparkbar

Used in small sizes to give an overview of how a metric has performed over time.

## Example

<img src="sparkbar.png" alt="Sparkbar example image" />

```tsx

  const props = {
    theme: 'default',
    data: [
      3, 7, 7, 5, 33, 2, 3, 0, 3, 5, 6, 6, 23, 5, 8, 1, 3, 12,
    ],
    comparison: [
      {x: 0, y: 4.2,
      {x: 1, y: 4.2},
      {x: 2, y: 4.2},
      {x: 3, y: 4.2},
      {x: 4, y: 4.2},
      {x: 5, y: 4.2},
      {x: 6, y: 4.2},
      {x: 7, y: 4.2},
      {x: 8, y: 4.2},
      {x: 9, y: 4.2},
      {x: 10, y: 4.2},
      {x: 11, y: 4.2},
      {x: 12, y: 4.2},
      {x: 13, y: 4.2},
      {x: 14, y: 4.2},
      {x: 15, y: 4.2},
      {x: 16, y: 4.2},
      {x: 17, y: 4.2},
    ],
    color: 'green',
    dataOffsetRight: 12,
    dataOffsetLeft: 12,
    isAnimated: true,
    accessibilityLabel="A bar chart showing orders over time for the past 18 weeks. The minimum is 0 orders and the maximum is 33 orders, compared to an average of 4.2 orders during previous 18-week period."
  };

return (<div style={{width: '200px', height: '50px'}}>
          <Sparkbar {...props} />
        </div>);
```

## Usage

The sparkbar interface looks like this:

```typescript
{
  theme?: string;
  data: (number | null)[];
  comparison?: number;
  accessibilityLabel?: string;
  isAnimated?: boolean;
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

#### theme

| type     | default |
| -------- | ------- |
| `string` | `default`|

The theme that the chart will inherit its color and container styles from.

#### comparison

| type                      | default     |
| ------------------------- | ----------- |
| `{x: number; y: number;}` | `undefined` |

The prop to determine the comparison line for the chart.


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
