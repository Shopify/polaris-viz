# Sparkline

Used in small sizes to give an overview of how a metric has performed over time.

## Example

<img src="sparkline.png" alt="Sparkline example image" />

```tsx
<div style={{width: '200px', height: '50px'}}>
  <Sparkline
    data={[
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
    ]}
    accessibilityLabel="Customer growth over time"
    color="primary"
    includeArea
    useAnimation
  />
</div>
```

## Usage

The sparkline interface looks like this:

```typescript
{
  data: Coordinates[];
  accessibilityLabel?: string;
  color?: Color;
  includeArea?: boolean;
  useAnimation?: boolean;
}
```

This component determines its width and height based off its parent element. The typical usage is to wrap this component in a div that has a height/width set, like:

```tsx
<div style={{height: '200px', width: '50px'}}>
  <Sparkline {...props} />
</div>
```

### Required props

#### data

| type                       |
| -------------------------- |
| `{x: number, y: number}[]` |

The prop to determine the chart's drawn area.

---

### Optional props

#### accessibilityLabel

| type     | default     |
| -------- | ----------- |
| `string` | `undefined` |

Visually hidden text for screen readers.

#### color

| type    | default     |
| ------- | ----------- |
| `Color` | `colorTeal` |

The sparkline stroke and fill color. This accepts any [Polaris Viz accepted color](/documentation/Polaris-Viz-colors.md).

#### includeArea

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Determines whether or not to shade in the area beneath the line.

#### useAnimation

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

Determines whether to animate the chart on state changes.
