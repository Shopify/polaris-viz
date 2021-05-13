# Sparkline

Used in small sizes to give an overview of how a metric has performed over time.

## Example

<img src="sparkline.png" alt="Sparkline example image" />

```tsx
<div style={{width: '200px', height: '50px'}}>
  <Sparkline
    series={[
      {
        color: 'colorPurple',
        areaStyle: 'gradient',
        offsetRight: 50,
        offsetLeft: 12,
        data: [
          {x: 0, y: 100},
          {x: 1, y: 200},
          {x: 2, y: 300},
          {x: 3, y: 400},
          {x: 4, y: 400},
          {x: 5, y: 1000},
          {x: 6, y: 200},
          {x: 7, y: 800},
          {x: 8, y: 900},
          {x: 9, y: 200},
          {x: 10, y: 400},
        ],
      },
      {
        color: 'pastComparison',
        areaStyle: 'none',
        lineStyle: 'dashed',
        data: [
          {x: 0, y: 10},
          {x: 1, y: 20},
          {x: 2, y: 30},
          {x: 3, y: 40},
          {x: 4, y: 40},
          {x: 5, y: 400},
          {x: 6, y: 20},
          {x: 7, y: 80},
          {x: 8, y: 90},
          {x: 9, y: 20},
          {x: 10, y: 40},
        ],
      },
    ]}
    accessibilityLabel="Customer growth over time"
    isAnimated
  />
</div>
```

## Usage

The sparkline interface looks like this:

```typescript
{
  series: {color: Color, areaStyle: AreaStyle, lineStyle: LineStyle, hasPoint: boolean, data: Coordinates[]}[];
  accessibilityLabel?: string;
  isAnimated?: boolean;
}
```

This component determines its width and height based off its parent element. The typical usage is to wrap this component in a div that has a height/width set, like:

```tsx
<div style={{height: '200px', width: '50px'}}>
  <Sparkline {...props} />
</div>
```

### Required props

#### The series type

| type                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{data: Coordinates[], color?: Color, areaStyle?: AreaStyle, lineStyle?: LineStyle, hasPoint?: boolean, offsetLeft?: number; offsetRight?: number}[]` |

The sparkline can show one data series or a set of comparison data series.

##### data

| type                                     |
| ---------------------------------------- |
| `{x: number | null, y: number | null}[]` |

The prop to determine the chart's drawn area. If null is provided, the line will not be drawn for that area.

##### color

| type    | default     |
| ------- | ----------- |
| `Color` | `colorTeal` |

The sparkline stroke and fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

##### areaFillStyle

| type                      | default |
| ------------------------- | ------- |
| `none | solid | gradient` | `none`  |

Determines whether to fill in the area beneath the line and what kind of shading to use.

##### lineStyle

| type             | default |
| ---------------- | ------- |
| `solid | dashed` | `solid` |

Determines the style of line used for the series.

##### hasPoint

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to highlight the last data point of the series with a circle.

##### offsetLeft

| type     | default |
| -------- | ------- |
| `number` | `0`     |

The amount of pixels to add as a left margin to the series.

##### offsetRight

| type     | default |
| -------- | ------- |
| `number` | `0`     |

The amount of pixels to add as a right margin to the series.

---

### Optional props

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

#### hasSpline

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Whether to curve the line between points.
