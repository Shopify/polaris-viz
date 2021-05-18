# Changelog

## Unreleased

### Changed

- Increased the minimum bar height for 0 values to 2px from 1px in `<BarChart />` and `<MultiSeriesBarChart />`
- Increased the border radius of rounded bars to 4px from 3px in `<BarChart />` and `<MultiSeriesBarChart />`
- Increased size of ColorPreview on Legend and Tooltip, as well as modifying its border-radius

### Fixed

- 0 values not showing a min height bar in grouped `<MultiSeriesBarChart />`

### Added

- `integersOnly` prop to `yAxisOptions` for `<LineChart />`, `<BarChart />`, and `<MultiSeriesBarChart />`

## [0.13.2] - 2021-05-17

### Changed

- `<LineChart/>` gradient area now has soft faded left/right edges instead of hard edges

## [0.13.1] - 2021-05-14

### Fixed

- Fixes border radius not being applied to animated bars

### Added

- `<LineChart/>` `lineOptions` now include `pointStroke` which changes the stroke of the active point

### Changed

- The `<BarChart/>` annotation prop now accepts a string as a color and does not apply opacity by default

## [0.13.0] - 2021-05-13

### Addded

- Options for the `<Sparkline />` and `<Sparkbar />` to accept `null` data and left and right offsets for their data series.

### Changed

- Replaced `curveMonotoneX` by `curveStepRounded` in `LineChart` and `Sparkline`.
- Updated min bar height to be 1px for 0 values in `<BarChart />` and grouped `<MultiSeriesBarChart />`.

### Fixed

- Fixed a bug in `<MultiSeriesBarChart />` that was causing the chart to crash when no labels were passed to the chart (in the case of an empty state).
- Charts now resize correctly when being printed out.
- Added a minimum bar height for the bars in the `<Sparkbar />` component.
- When there was only one data point for an animated line chart, an error was being thrown.

## [0.12.3] - 2021-05-12

### Fixed

- When `process.env.NODE_ENV === 'test'` a default width and height of 500px is provided so consumers of Polaris Viz don't need to set up any mocks for ResizeObserver (or container widths/heights).

## [0.12.2] - 2021-05-11

### Fixed

- Removes text selection from visualizations so they work better on mobile/touch devices

## [0.12.1] — 2021-05-10

### Fixed

- yAxis ticks sometimes getting cut off
- `<SparkLine/>` and `<Sparkbar/>` stroke dasharray treatment is consistent at all sizes
- Components now resize when their container resizes, not just when the page resizes

## [0.12.0] — 2021-05-10

### Fixed

- `<SparkLine/>` and `<Sparkbar/>` now rerender with the correct size when the container change its width or height
- `<Sparkbar />` Bar radius is now proportional to the bar width
- Added `@juggle/resize-observer` library as a peer and dev dependency

## [0.11.3] — 2021-05-10

### Changed

- `<MultiSeriesBarChart/>`, `<BarChart />` and `<LineChart/>` yScale will allow data to overflow the highest tick if the highest value is less than half way to the next tick

## [0.11.2] — 2021-05-07

### Fixed

- yAxis line height is no longer inherited
- xAxis bar chart ticks are not shown when minimal labels are selected, or when they are disabled

## [0.11.1] — 2021-05-07

### Added

- `horizontalOverflow` and `horizontalMargin` to `gridOptions` for `<MultiSeriesBarChart/>`, `<BarChart />` and `<LineChart/>`, as well as `backgroundColor` to the `yAxisOptions`

### Fixed

- Bar chart xAxis label overlap when useMinimalLabels is set

### Changed

- Increased margin between x axis and labels from 8px to 24px

## [0.11.0] — 2021-05-06

### Added

- `outerMargin` prop to `<BarChart/>` and `<MultiSeriesBarChart/>`

### Changed

- renamed `barOptions.margin` to `innerMargin` for `<BarChart/>` and `<MultiSeriesBarChart/>`

### Fixed

- Line chart legend no longer shows square preview

## [0.10.2] — 2021-05-05

### Fixed

- Reverts dev dependency changes that broke deploy

## [0.10.1] — 2021-05-05

### Added

- Export `Color` and `GradientStop` types

### Fixed

- `<BarChart />` data type

## [0.10.0] — 2021-05-04

### Added

- `margin` prop to `barOptions` for `<MultiSeriesBarChart/>`
- Allow individual bar colors for `<BarChart />`
- Add gradient color options for `<MultiSeriesBarChart />`

### Removed

- `highLightColor` from `<MultiSeriesBarChart />` `barOptions` prop

## [0.9.4] — 2021-05-04

### Added

- Dark mode colors to Color type

## [0.9.3] — 2021-05-03

### Fixed

- Performance regression in `<LineChart/>`

### Added

- Check window is defined before accessing window methods
- Added new dark mode colors

## [0.9.2] — 2021-04-29

### Added

- Allow gradients to be use for `<LineChart/>` and `<BarChart />`

### Changed

- `showArea` for `<LineChart/>` series prop replaced by `areaColor`

## [0.9.1] — 2021-04-27

### Added

- `<Sparkbar />` component
- Annotations prop to `<BarChart />`

## [0.9.0] — 2021-04-26

### Added

- Ability to show point at the end of a `<Sparkline />` series
- `emptyStateText` and empty state handling to `<MultiSeriesBarChart />`
- `<LinePreview />` and `<SquareColorPreview />` components are now exported
- `useMinimalLabels` option added to the `<BarChart />` and `<LineChart />` `xAxisOptions` prop
- Animated points on the line chart is `isAnimated` is true

### Changed

- The line chart and bar chart APIs now allow for custom configuration of chart element appearances. Some top-level props are now nested within more specific object props to configure the appearance of the chart.

### Removed

- The timeseries prop has been removed from bar charts, in favour of using that label handling by default (when there is not enough room for all diagonal labels, some will be dropped).

## [0.8.1] — 2021-04-20

### Added

- `dotted` lineStyle to `LineChart`
- `emptyStateText` and empty state handling to `<BarChart />`
- `isAnimated` prop to `LineChart`, `BarChart` and `MultiSeriesBarChart`

## [0.8.0] — 2021-04-14

### Added

- `background`, `border`, `border-radius`, and `padding` to each `TooltipContent` styles
- Added `emptyStateText` and empty state handling to `<LineChart />`

### Removed

- `background`, `border`, `border-radius`, and `padding` from `TooltipContainer` styles

## [0.7.3] - 2021-04-07

## Added

- Storybook

## [0.7.2] - 2021-03-25

### Fixed

- Remove unneccessary focus outline on elements

## [0.7.1] - 2021-03-24

## Added

- Rounded corners option to bar chart components

### Fixed

- Improved responsiveness of `<LineChart />` on touch devices
- Stopped `<BarChart />` being announced as unlabelled image on screenreaders

## [0.7.0] - 2021-03-23

### Added

- `hasSpline` option to the `<LineChart />` and `<Sparkline />`
- `skipLinkText` to `<MultiSeriesBarChart/>`

### Removed

- The `accessibilityLabel` prop from `<MultiSeriesBarChart/>` in favour of a more complete accessibility approach

## [0.6.2] - 2021-03-19

### Changed

- Updated Polaris Tokens dependency

## [0.6.1] - 2021-03-16

### Fixed

- Line chart performance
- Handling for all negative datasets
- Use initial ticks to calculate yAxis width

## [0.6.0] - 2021-03-15

### Changed

- The `Legend` component is now separate from the `LineChart`, `MultiSeriesBarChart` and `StackedAreaChart` components and must be added manually

### Removed

- The `chartHeight`prop on the `LineChart`, `MultiSeriesBarChart` and `StackedAreaChart` components. These components will now inherit the chart's height from their parent element.

## [0.5.4] - 2021-03-11

### Fixed

- Barcharts with many bars use a better range and no longer have a tooltip bug.

## [0.5.3] - 2021-03-10

### Changed

- Updates Node version to 12.20.1

### Fixed

- Label calculation and spacing improvements
- Allow non-unique line chart series

## [0.5.2] - 2021-03-05

### Fixed

- Fixed a bug causing labels to take up less space than available on the line chart and area chart

## [0.5.1] - 2021-03-02

### Added

- `comparisonMetric` to `NormalizedStackedBarChart` labels

## [0.5.0] - 2021-02-25

### Added

- `<LineChart/>` gradient fill style

### Fixed

- `<LineChart/>`, `<BarChart/>`, `<StackedAreaChart/>` and `<MultiSeriesBarChart />` spacing of the axis labels and legends

### Changed

- Removed the accessibilityLabel from `<NormalizedStackedBarChart/>`, component is accessible by default

## [0.4.0] - 2021-02-24

### Changed

- Removed the `accessibilityLabel` prop from `<LineChart/>` and `<BarChart/>` in favour of a more complete accessibility approach
- `<LineChart/>` now requires `xAxisLabels`
- `<Sparkline />` now accepts a `series` prop instead of `data` and universal styling props, so that multiple data series can be displayed and individually configured

### Added

- `skipLinkText` to `<LineChart/>` and `<BarChart/>`
- `hideXAxisLabels` prop to `<LineChart/>`

## [0.3.0] - 2021-02-10

### Changed

- Removed the accessibilityLabel from [`<StackedAreaChart/>`](https://github.com/Shopify/polaris-viz/blob/master/src/)

### Added

- `skipLinkText` prop to [`<StackedAreaChart/>`](https://github.com/Shopify/polaris-viz/blob/master/src/)

### Fixed

- Added default max y-axis value for charts with all zero data

## [0.2.0] - 2021-02-03

### Changed

- Unified the data/series interfaces for [`<BarChart />`](src/components/BarChart/BarChart.md#data), [`<LineChart />`](src/components/LineChart/LineChart.md#the-series-type)), [`<MultiSeriesBarChart />`](src/components/MultiSeriesBarChart/MultiSeriesBarChart.md#the-series-type), and [`<StackedAreaChart />`](src/components/StackedAreaChart/StackedAreaChart.md#the-series-type)

### Added

- Added a default color utility which unifies the default colors provided in the `<BarChart />`, `<LineChart />`, `<MultiSeriesBarChart />`, and `<StackedAreaChart />`

### Fixed

- Long label handling for the `<BarChart />`, `<LineChart />`, `<MultiSeriesBarChart />`, and `<StackedAreaChart />`

## [0.1.1] - 2021-01-11

### Fixed

- Separate READMEs for NPM and Github

## [0.1.0] - 2021-01-11

### Added

- Added `renderTooltipContent` callback to `<BarChart />`, `<LineChart />`, `<MultiSeriesBarChart />`, and `<StackedAreaChart />`
- Added `<TooltipContent />`, `<LineChartTooltipContent />`, and `<BarChartTooltipContent />`

### Changed

- Removed the `formatY` prop on the `LineChartProps` `series` interface (replaced by `renderTooltipContent`)
- Removed the `tooltipSumDescriptor` prop on the `StackedAreaChartProps` interface (replaced by `renderTooltipContent`)
- `<NormalizedStackedBar />` has been renamed to `<NormalizedStackedBarChart />`

### Fixed

- Horizontal `<NormalizedStackedBarChart />` does not prematurely wrap label text

## [0.0.20] - 2020-12-08

### Added

- Added formatting functions for axes labels (`formatXAxisLabel` and `formatYAxisLabel`) to `<BarChart>`, `<LineChart>`, `<MultiSeriesBarChart>`, and `<StackedAreaChart>`

### Changed

- `formatYValue` on `<BarChart>` has been renamed to `formatYAxisLabel`
- `formatYValue` on `<MultiSeriesBarChart>` has been renamed to `formatYAxisLabel`
- `formatYAxisValue` on `<LineChart>` has been renamed to `formatYAxisLabel`
- `formatYAxisValue` on `<StackedAreaChart>` has been renamed to `formatYAxisLabel`

## [0.0.19] - 2020-11-04

### Changed

- Renamed `<GroupBarChart />` to `<MultiSeriesBarChart />`
- Updated `<MultiSeriesBarChart />` documentation

### Added

- Added the `isStacked` bolean prop to `<MultiSeriesBarChart />`
- Added `<StackedBarGroup />` to `<MultiSeriesBarChart />` to allow for vertically stacked bars

### [0.0.18] - 2020-10-09

### Fixed

- Made axes and label colors consistent

### [0.0.17] - 2020-10-02

### Fixed

- `<Sparkline />` no longer animates on resize

### Changed

- `<Sparkline />` adds an option for a gradient fill style
- `<Sparkline />` `useAnimation` prop is renamed to `isAnimated`

### Added

- `<StackedAreaChart />`

## [0.0.16] - 2020-09-18

### Fixed

- `<LineChart />` prop improvements to rename `x` to `label` and `y` to `rawValue`
- `<LineChart />` displays label value on tooltip rather than Series name
- `<LineChart />` returns null when empty data is passed in
- Reduces time before chart components are rendered

## [0.0.15] - 2020-09-10

### Added

- New viz colors

### Changed

- Removed ColorScheme option from `<NormalizedStackedBar />`

## [0.0.14] - 2020-08-12

### Fixed

- `<LineChart />` yScale improvements
- `<NormalizedStackedBar />` do not show bar for 0 values
- `<BarChart />`, `<GroupedBarChart />` long label handling

## [0.0.13] - 2020-08-05

### Fixed

- `<Sparkline />` animation on resize
- `<LineChart />` first and last labels getting cut off

## [0.0.12] - 2020-07-27

### Added

- `<GroupedBarChart />` component

## [0.0.11] - 2020-07-08

### Added

- Vertical `<BarChart />` component

## [0.0.10] - 2020-06-17

### Changed

- `<LineChart />` uses tighter y-axis label spacing

## [0.0.9] - 2020-06-08

### Fixed

- Use relative imports to fix `esnext` build problems (https://github.com/Shopify/polaris-viz/pull/57)

## [0.0.8] - 2020-06-05

### Added

- Line chart component

## [0.0.7] - 2020-06-02

### Changed

- Move React and React DOM to dev dependencies

## [0.0.6] - 2020-02-25

### Changed

- Unpin React version in dependencies

## [0.0.5] - 2020-02-24

### Added

Sparkline component

## [0.0.4] - 2020-02-04

### Changed

- Remove unused dependencies
- Fix documentation image link

## [0.0.3] - 2020-02-04

### Changed

- Remove use of Emotion styled components in favour of Sass
- Use .esnext file extensions in esnext directory, as required for consumption of Esnext files by Sewing Kit

## [0.0.2] - 2020-01-15

### Added

- NormalizedStackedBar chart is now available
