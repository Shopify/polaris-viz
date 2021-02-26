## PieChart

Used to render a pie chart for visualization

## Example

```typescript jsx
function PieChartVisualization() {
  return (
    // A width so the pie chart and legend does not try to take the full width of the screen
    <div style={{width: '500px'}}>
      <PieChart data={mockProps} outerRadius={150} />
    </div>
  );
}
```

## Props
```typescript
interface Props {
  data: DataProps[];
  outerRadius: number;
  innerRadius?: number;
  animation?: boolean;
}
```

## data

The data you want to pass in the following format

```typescript
export interface DataProps {
  label: string;
  value: number;
  formattedValue: string;
}
```

## outerRadius

The outside radius of the pie chart

## innerRadius (optional)

Set to outerRadius / 2 by default. The inside radius of the pie chart.

## animation (optional)

Set to enabled by default. If animation should be disabled / enabled.
