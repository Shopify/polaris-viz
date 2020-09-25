# Polaris Viz

Polaris Viz is a data visualization React component library. It was built to help Shopify merchants better understand their data.

## Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/polaris-viz --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/polaris-viz
```

## Usage

If your app is set up to consume `esnext` builds, import components where you want to use them and the styles will automatically be applied.

If your app is not set up for `esnext`, import the styles where you import components from the library:

```js
import '@shopify/polaris-viz/styles.css';
```

## Components

Components inherit their sizes from their containers, so place your component inside an element with a width and height specified.

1. [Normalized stacked bar chart](#normalized-stacked-bar-chart)
2. [Sparkline](#sparkline)

### Normalized stacked bar chart

<img src="src/components/NormalizedStackedBar/normalized-stacked-bar-chart.png"/>

Used for positive datasets with two to four items.

[View documentation →](src/components/NormalizedStackedBar/NormalizedStackedBar.md)

### Sparkline

<img src="src/components/Sparkline/sparkline.png"/>

Used in small sizes to give an overview of how a metric has performed over time.

[View documentation →](src/components/Sparkline/Sparkline.md)

### Line chart

<img src="src/components/LineChart/line-chart.png"/>

Used to show change over time, comparisons, and trends.

[View documentation →](src/components/LineChart/LineChart.md)

### Bar chart

<img src="src/components/BarChart/bar-chart.png"/>

Used to show comparison across categories.

[View documentation →](src/components/BarChart/BarChart.md)

### Grouped bar chart

<img src="src/components/GroupedBarChart/grouped-bar-chart.png"/>

Used to show comparison of different types, across categories.

[View documentation →](src/components/GroupedBarChart/GroupedBarChart.md)

### Stacked area chart

<img src="src/components/StackedAreaChart/stacked-area-chart.png"/>

Used to compare multiple series of data and display the total value.

[View documentation →](src/components/StackedAreaChart/StackedAreaChart.md)

## Contributing

Pull requests are welcome.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris-viz/blob/master/LICENSE.md) based on MIT. The license restricts Polaris Viz usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
