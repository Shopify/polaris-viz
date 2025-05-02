# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

- Render xAxis annotations after yAxis annotations in `<LineChart />` and `<StackedAreaChart />`.

## [16.15.1] - 2025-05-01

### Fixed

- Fixed issue where a smaller `yAxisOptions.maxYOverride` would always be overtaken by the maxY value.

## [16.15.0] - 2025-04-29

### Removed

- Removed `Show more annotations` button. We now render all available annotations.

### Changed

- Tweaks annotation pill visuals.

## [16.14.0] - 2025-04-25

### Added

- Added `yAxisOptions.ticksOverride` property to render custom yAxis ticks instead of the yScale generated values.
- Added `legendPosition` to `<BarChart />`, `<LineChart />`, `<LineChartPredictive />`, `<LineChartRelational />`& `<StackedAreaChart />`.

### Changed

- Allow `yAxisOptions.maxYOverride` to be used when chart has data.
- Added `bar.gap` value to override the spacing between `VerticalBarChart` bars.

## [16.13.0] - 2025-04-22

- No updates. Transitive dependency bump.

## [16.12.1] - 2025-04-16

- No updates. Transitive dependency bump.

## [16.12.0] - 2025-03-27

### Changed

- Add support for custom annotiation content rendering using `renderAnnotationContent`
- Improved funnel chart scaling feature with logarithmic scale
- Improved null value handling in Funnel Chart

## [16.11.0] - 2025-03-10

### Changed

- Explicitly set `line-height` for `<FunnelChartNext />` tooltips

## [16.10.1] - 2025-03-05

- No updates. Transitive dependency bump.

## [16.8.0] - 2025-03-03

### Added

- Added `trend` value to `DataPoint` to render `<TrendIndicator />` in tooltips.

## [16.7.1] - 2025-03-03

- No updates. Transitive dependency bump.

## [16.7.0] - 2025-02-28

### Removed

- Removed `.npmrc`

## [16.6.2] - 2025-02-26

- No updates. Transitive dependency bump.

## [16.6.1] - 2025-02-26

- No updates. Transitive dependency bump.

## [16.6.0] - 2025-02-26

### Changed

- Bump `node` version to `18.20.0`.

## [16.5.0] - 2025-02-26

### Added

- NPM provenance statement

### Changed

- Bumped Lerna and Node version

## [16.4.0] - 2025-02-25

### Changed

- Allow `LineChart` to render multiple comparison series.

## [16.3.0] - 2025-02-21

- No updates. Transitive dependency bump.

## [16.2.0] - 2025-02-18

### Changed

- Do not render inactive items in the tooltip when a `DataSeries` is hovered/focused.

## [16.0.0] - 2025-02-13

### Removed

- **Breaking change** Removed `limited` from `seriesColors` in `Theme`.
- Removed gradients from limited color series.

## [15.10.0] - 2025-02-11

- No updates. Transitive dependency bump.

## [15.9.0] - 2025-02-05

### Added

-  Added tooltip support for `<DonutChart />`

### Changed

- Changed default series icon indicator for non-line charts to a circle from a square.

## [15.8.1] - 2025-01-21

### Fixed

- Fixed issue in `<SimpleBarChart />` where the trend indicator was not being positioned correctly when the value was `null`.
- Fixed issue in `<SimpleBarChart />` where labels are not positioned correctly when all values were negative and `0`.

## [15.8.0] - 2025-01-16

### Fixed

- Fixed issue in `<LineChartRelational />` where the `percentileIndex` was not being set correctly.

### Added

- Added Tooltips to `<FunnelChartNext />`

## [15.7.0] - 2025-01-08

### Fixed

- Fixed issue in `<StackedArea />` where changing data series length would cause the chart to throw an error

### Changed

- Removed main percentage label from `<FunnelChartNext />`

### Fixed

- Double formatting in Donut Chart label calculations
- Changed `<TooltipTitle />` to avoid overflow when displaying long titles without spaces.

## [15.6.1] - 2024-12-18

### Changed

- Removed funnel segment tooltips from `<FunnelChartNext />`.

## [15.6.0] - 2024-12-18

### Added

- Added `<FunnelChartNext />` and `<SparkFunnelChart />`.


## [15.5.0] - 2024-12-17

### Fixed

- Bar chart animation when value goes from positive to negative or vice versa

### Added

- Added support for responsive legends in `<LineChartRelational />`

## [15.4.0] - 2024-12-10

### Changed

- Changed `<LineChart />` tooltip positioning to align with the crosshair when on a touch device.
- Changed `<BarChart />` tooltip positioning to align with the top of the chart on a touch device.

## [15.3.5] - 2024-12-05

### Added

- Added dashed `lineStyle` support for custom legends in `<LineChartRelational />`

### Fixed

- Fixed issue where tooltips were not positioned correctly when tabbing through points in `<LineChart />`.

## [15.3.4] - 2024-12-03


### Fixed

- Fixed issue where `<DonutChart />` would run the `seriesNameFormatter` for multiple times on a `<Legend />`.

## [15.3.3] - 2024-12-02

### Added

- Disabled group treatment on RFMGrid visualization
- Call to actions on RFMGrid tooltips

### Fixed

- Do not show ellipsis if only one character is truncated
- Fixed an issue with the `<StackedAreaChart />` that would cause the chart to break when series length increases

### Changed

- Refactored containers bounds into a hook and moved to chart context. `<ChartContainer />` now uses the new `useContainerBounds` hook.
- Tooltips on touch devices now only show after a short delay.

## [15.3.2] - 2024-11-20

### Fixed

- Tooltip positioning when the grid is inside a container with overflow: hidden.
- Tooltip positioning when the grid has multiple instances.

### Changed

- Changed `TOUCH_FONT_SIZE` constant to `12px`.

### Changed

- Refactored tooltip logic to move individual chart logic into `<TooltipWrapper />`.

## [15.3.1] - 2024-11-18

- No updates. Transitive dependency bump.

## [15.3.0] - 2024-11-18

### Added

- Increase font size of labels and legends when viewing charts on a touch device.

## [15.2.1] - 2024-11-05

- No updates. Transitive dependency bump.

## [15.2.0] - 2024-11-04

### Added

- New visualization `<Grid />`

## [15.1.3] - 2024-10-31

### Fixed

- Reduced small chart check to 125px

## [15.1.2] - 2024-10-29

### Fixed

- Infinity check

## [15.1.1] - 2024-10-28

### Fixed

- Fixed tooltip positioning bug

## [15.1.0] - 2024-10-24

### Fixed

- How the line chart, area chart and vertical bar chart are rendered when their height is less than 200px.
- Fixed issues in charts when non-finite numbers were passed to them.

## [15.0.7] - 2024-10-18

### Fixed

- Fixed issue where tooltips did not account for scroll position when rendered below the viewport bounds.

- Fixed issue where tooltips used chart bounds instead of viewport bounds to determine position.

## [15.0.6] - 2024-10-11

### Fixed

- Fixed changelog issue

## [15.0.5] - 2024-10-11

- Fixed an issue where the bar chart collapsed if a value of Infinity was passed to it.

## [15.0.4] - 2024-09-26

- No updates. Transitive dependency bump.

## [15.0.3] - 2024-09-25

### Changed

- Changed logic around how we determine the longest trend width. We now measure the longest trend width for each positive and negative side without associating with the longest date series value.


## [15.0.2] - 2024-09-24

### Fixed

- Fixed issue where xAxisFormatter would be run for yAxis annotations.

## [15.0.1] - 2024-09-24

### Fixed

- Fixed an issue in the `LineChart` where the crosshair and tooltip were incorrectly positioned for single data points. The animation logic now correctly bypasses for single data points, ensuring accurate positioning.
- Fixed an issue where `DataSeries` with different lengths would crash the `StackedAreaChart`.

## [15.0.0] - 2024-09-16

### Changed

- **Breaking change** The keys used to display `<Annotiatons />` are now formatted with the `xAxisOptions.labelFormatter` method.

## [14.9.1] - 2024-09-13

- No updates. Transitive dependency bump.

## [14.9.0] - 2024-09-13

### Added

- Added `scrollContainer` prop to charts that use a portal (`BarChart`, `LineChart`, `StackedAreaChart`) for their tooltips. This allows consumers to render charts in a scrollable container and still position the tooltips in the correct position.

## [14.8.0] - 2024-09-06

### Changed

- Render line for all `0` values in `<SparkLineChart />` at the bottom of the container.

### Fixed

- Bug in the `LineChart`. Render individual points for comparison data when surrounded by null values.

## [14.7.0] - 2024-08-30

### Changed

- Updated `<DonutChart />` to show empty state when all values are zero
- Changed `RenderInnerValueContent` type to include dimensions

## [14.6.0] - 2024-08-21

### Changed

- Updated `<DonutChart />` arc thickness size

## [14.5.1] - 2024-08-07

### Changed

- Changed `<DonutChart />` arc thickness to be smaller when container height is small
- Changed `<DonutChart />` svg positioning to take up more space
- Changed `<DonutChart />` table legend spacing

## [14.5.0] - 2024-08-02

### Changed

- Dynamically calculate the inner value content font size of the `DonutChart` based on the diameter to improve responsiveness and scaling across different screen sizes.

- Replaced `UpChevron` and `DownChevron` components with `TrendIndicator` in the `ComparisonMetric` component. This change applies to the `DonutChart` and the `SimpleNormalizedChart`, standardizing the display of trend directions across these visualizations.

## [14.4.0] - 2024-07-25

### Changed

- Updated default font-size to 11px
- Removed focus state on click for LegendItem

## [14.3.0] - 2024-07-19

### Fixed

- Bug in LegendItem that affected calculations in useLegendOverflow. Correct min-width is now used.

### Changed

- Default position of `<LegendContainer />` changed from `'bottom-right'` to bottom

## [14.2.0] - 2024-07-12

### Added

- Added `hideLegendOverflow` prop to `<LineChart />` to all toggling of legend overflow behaviour

### Changed

- Changed `<DonutChart />` table legend width to only take as much space as the content requires.

## [14.1.2] - 2024-07-11

- No updates. Transitive dependency bump.

## [14.1.1] - 2024-07-10

- No updates. Transitive dependency bump.

## [14.1.0] - 2024-07-10

### Added

- `maxYOverride` prop to `yAxisOptions` for `<LineChart />`, `<BarChart />`, and `<StackedAreaChart />`

## [14.0.0] - 2024-07-03

### Changed

- Renamed `seriesColors.upToEight` to `seriesColors.limited`.
- Removed `Olive` & `Orange` colors from `Light` theme.

### Fixed

- Fixed issue where `<TrendIndicator />` `svg` would render very wide when a font-weight was used that wasn't included in `character-width-offsets.json`.

## [13.4.1] - 2024-06-20

### Changed

- Bump `<TrendIndicator />` font weight to 650;

## [13.4.0] - 2024-06-19

### Changed

- Changed `<StackedAreaChart />` to use a react portal to allow tooltips to render outside the bounds of the chart.

## [13.3.0] - 2024-06-17

### Changed

- Use `Inter` as the default initial font.

## [13.2.1] - 2024-06-17

### Changed

- Removed comparison color from labels in `<SimpleBarChart />`.
- Updated `<TrendIndicator />` negative color to neutral grey.

## [13.2.0] - 2024-05-27

### Changed

- Fixed issue where `<RelatedAreas />` would crash when the incoming data change had a different shape.
- Changed `<MissingDataArea />` to mask out areas with data instead of rendering separate `rect` elements for each area of missing data.

### Removed

- Removed animation from `<RelatedAreas />`.

### Added

- Added support for bucketing data into a "Other" group for Bar chart and Donut charts
- Added `maxSeries` prop to Bar chart and Donut chart
- Added `renderBucketLegendLabel` prop to Bar chart and Donut chart

## [13.1.2] - 2024-05-03

### Added

- Re-export `fillMissingDataPoints`.

## [13.1.1] - 2024-05-03

### Added

- Export `fillMissingDataPoints`.

## [13.1.0] - 2024-04-23

### Removed

- Removed different gradient origins when data set is all positive, all negative or mixed. Origin is now always from the line down.

## [13.0.1] - 2024-04-16

### Changed

- Fallback to default theme instead of throwing an error when an unused theme value is passed to the `theme` prop.

## [13.0.0] - 2024-04-15

### Changed

- **Breaking change** Changed default theme to `Light`.
- **Breaking change** Removed `Uplift` theme.
- **Breaking change** Renamed `Default` theme to `Dark`.

## [12.5.0] - 2024-04-04

### Added

- Added `seriesNameFormatter` prop to `<BarChart />`, `<ComboChart />`, `<LineChart />`, `<LineChartPredictive />`, `<LineChartRelational />`, `<SimpleBarChart />` & `<StackedAreaChart />`.

## [12.4.2] - 2024-04-04

### Changed

- Fill missing values for SparkLine charts
- Made `<DonutChart />` animation delay based on slice count, not a set `index * 100ms`.

## [12.4.1] - 2024-04-03

### Fixed

- Fixed issue where `<DonutChart />` overflow legends wouldn't use the `seriesNameFormatter`.

## [12.4.0] - 2024-04-03

### Added

- Added `seriesNameFormatter` prop to `<DonutChart />` to allow consumers to format the series name.

## [12.3.0] - 2024-04-02

### Changed

- Limit `<DonutChart />` legends from taking up more than 50% of the chart width.

## [12.2.2] - 2024-04-01

- No updates. Transitive dependency bump.

## [12.2.1] - 2024-04-01

- No updates. Transitive dependency bump.

## [12.2.0] - 2024-04-01

### Added

- Added `seriesNameFormatter` prop to `<SimpleNormalizedChart />` to allow consumers to format the series name.

## [12.1.0] - 2024-04-01

### Added

- Set `enableHideOverflow` on `<LegendContainer />` in `<HorizontalBarChart />` to render `+ X more` when legends flow outside the chart bounds.

## [12.0.0] - 2024-03-25

### Added

- Added `tooltip.shape` override value to `DataSeries.styleOverride`.
- **Breaking change** Added custom legend to `<LineChartRelational />`.


### Changed

- **Breaking change** `<LineChartRelational />` no longer renders all lines in the `DataSeries[]`. Any `DataSeries` with `metadata.relatedIndex` will only render the area in the chart.
- **Breaking change** `metadata.relatedIndex` should now refer to the single "median" index and not the next index to draw the area to.

## [11.1.0] - 2024-03-19

### Changed

- Added `PolarisUpliftTheme` to better support extending the Uplift theme.

## [11.0.0] - 2024-03-12

### Changed

- **Breaking change** Renamed `useRenderTooltipContent()` to `getTooltipContentRenderer()`.

## [10.7.2] - 2024-03-06

- No updates. Transitive dependency bump.

## [10.7.1] - 2024-03-06

- No updates. Transitive dependency bump.

## [10.7.0] - 2024-03-06

- No updates. Transitive dependency bump.

## [10.6.0] - 2024-03-04

### Added

- Added the group sum labels for the Horizontal Stacked Bar Chart.

### Fixed

- Fixed the positioning of the `<ZeroLine />` for the Stacked Horizontal Chart when all values are negative.

### Changed

- Allow `useWatchActiveSeries` to accept `null` as an `id` to disable attaching events.

### Added

- Export `setActiveSeriesListener()`.

## [10.5.2] - 2024-02-22

### Added

- Export missing types

## [10.5.1] - 2024-02-21

### Added

- Pass missing `id` down to `<ChartContainer />` in all charts.

## [10.4.3] - 2024-02-16

### Added

- Added support to hide overflowing LegendItems in vertical legends

### Fixed

- Fixed issue where trend indicators could extend past the chart bounds in `<SimpleBarChart />` when passing a value of `undefined` to `TrendIndicator.value`.

## [10.4.2] - 2024-02-12

### Fixed

- Use text element instead of foreignObject for HorizontalBars labels

## [10.4.1] - 2024-02-01

### Fixed

- Change z-index of HiddenLegendTooltip

## [10.4.0] - 2024-01-31

### Changed

- Hide overflowing LegendItems in LineChart, VerticalBarChart, and StackedAreaChart legends.
- Update useColorVisionEvents to accept a root prop


### Fixed

- Pass down renderHiddenLegendLabel to child components in BarChart and StachkedAreaChart

## [10.3.2] - 2024-01-22

- No updates. Transitive dependency bump.

## [10.3.1] - 2024-01-17

- No updates. Transitive dependency bump.

## [10.3.0] - 2024-01-12

- No updates. Transitive dependency bump.

## [10.2.1] - 2024-01-08

- No updates. Transitive dependency bump.

## [10.2.0] - 2024-01-08

### Added

-  Added support for showing values and trends in `<DonutChart />` legend with new prop `showLegendValues`.

## [10.1.0] - 2023-12-04

### Added

- Experimental feature to define a `fillValue` for a `DataSeries` which Polaris Viz will use to backfill missing data points

## [10.0.1] - 2023-11-16

- No updates. Transitive dependency bump.

## [10.0.0] - 2023-11-16

### Changed

- We now assume that linear charts `<LineChart />`, `<LineChartRelational />` & `<StackedAreaChart />` have matching keys in each data set. Any keys that do not have matching data sets will be filled so all charts contain the same keys.

## [9.18.2] - 2023-11-15

### Fixed

- Fixed issue where stacked `<BarChart />`, `<AnimatedLine />` & `<AnimatedArea />` would still have a staggered delay when rendering bars/groups if `isAnimated: false`.

## [9.18.1] - 2023-11-14

### Fixed

- Fixed issue where `<BarChart />` would still have a staggered delay when rendering bars/groups if `isAnimated: false`.

## [9.18.0] - 2023-11-07

### Changed

- Added an offset to y-axis labels for `<LineChart />` to accommodate variations in font rendering

## [9.17.1] - 2023-11-07

- No updates. Transitive dependency bump.

## [9.17.0] - 2023-11-07

- No updates. Transitive dependency bump.

## [9.16.0] - 2023-10-17

- No updates. Transitive dependency bump.

## [9.15.0] - 2023-10-17

### Changed

- `<SimpleBarChart />` with all zero values will now render to the left of the chart instead of the middle.

## [9.14.0] - 2023-10-02

### Changed

-  Changed `RenderInnerValueContent` type to include active index


## [9.13.0] - 2023-09-26

### Fixed

- Fixed issue where `<BarChart />` bar width would be 1px when data changes from all 0 values to data with non-zero values.

### Changed

-  Changed `<DonutChart />` to include 0 or negative values in data.
-  Changed `<DonutChart />` to show any number of data points.
-  Updated `<DonutChart />` wrapper to take full height of container and center contents.

## [9.12.0] - 2023-09-19

- No updates. Transitive dependency bump.

## [9.11.0] - 2023-09-12

### Fixed

- Fixed issue where chart would not resize on height change

## [9.10.7] - 2023-09-06

### Changed

-  Changed `<DonutChart />` to not show 0 or negative values.
-  Changed `<DonutChart />` to only show a maximum of 5 data points.
-  Updated `<DonutChart />` default styles.
-  Changed `<TrendIndicator />` font-size to 11px from 12px.
-  Changed `<TrendIndicator />` font-weight to 450 from 600.

## [9.10.6] - 2023-08-24

- No updates. Transitive dependency bump.

## [9.10.5] - 2023-08-23

### Changed

- Changed `<DonutChart />` to show value of hovered item in the center.

### Fixed

- Fixed issue in `<LineChart />` where tooltip would be rendered in the wrong position when performance was impacted.
- Fixed issue in `<StackedArea />` where changing data to new data with different length would cause the chart to throw

## [9.10.4] - 2023-08-09

- No updates. Transitive dependency bump.

## [9.10.3] - 2023-08-09

- No updates. Transitive dependency bump.

## [9.10.2] - 2023-08-09

### Fixed

- Fixed issue where tabbing through `<LineChart />` points wouldn't position the tooltip near the chart.

## [9.10.1] - 2023-08-08

- No updates. Transitive dependency bump.

## [9.10.0] - 2023-08-03

### Changed

- Changed `<LineChart />` and `vertical` `<BarChart />` to use a react portal to allow tooltips to render outside the bounds of the chart.

## [9.9.0] - 2023-07-26

### Fixed

- Fixed issue where hover effects would not be triggered for the entire bar in `<BarChart />` and `<SimpleBarChart />`.

### Added

- Added ability to set a fixed width for `<LineChart />` `<YAxis />` labels.

## [9.8.1] - 2023-07-20

### Removed

- Removed outline from `<svg>` tag when focused.

## [9.8.0] - 2023-07-13

### Added

- Added `onError` prop to all charts that consume `<ErrorBoundary />`.

## [9.7.0] - 2023-07-13

- No updates. Transitive dependency bump.

## [9.6.2] - 2023-07-12

### Fixed

- Fixed issue where passing a value of `undefined` to `TrendIndicator.value` would cause `<SimpleBarChart />` to crash.

## [9.6.1] - 2023-07-06

- No updates. Transitive dependency bump.

## [9.6.0] - 2023-07-06

### Added

- Added ability to set default theme directly in `<PolarisVizProvider />`.

## [9.5.1] - 2023-07-05

- No updates. Transitive dependency bump.

## [9.5.0] - 2023-07-05

### Fixed

- Fixed an issue where the label width was getting subtracted from the available space twice in `<SimpleBarChart>`.
- Fixed an issue where horizontal bars with trend indicators would not be rendered to scale in `<SimpleBarChart>`.

## [9.4.0] - 2023-06-21

- No updates. Transitive dependency bump.

## [9.3.6] - 2023-06-14

- No updates. Transitive dependency bump.

## [9.3.5] - 2023-06-14

### Changed

- Set tab-index to `-1` to stop `<TrendIndicator />` from allowing it to be tabbed into.

### Added

- Added `legendPosition` to `SimpleBarChartProps`.

## [9.3.4] - 2023-06-13

### Fixed

- Clamp negative widths in `SimpleBarChart` to a min of `1px`.

## [9.3.3] - 2023-06-08

### Fixed

- Fixed issue where negative values in `SimpleBarChart` with `TrendIndicators` would bleed outside the chart.

## [9.3.2] - 2023-05-25

### Fixed

- Fixed issue where empty keys would be used when data had multiple empty data keys.

## [9.3.1] - 2023-05-23

### Added

- Added `yAxisOptions` to `SimpleBarChartProps`.

## [9.3.0] - 2023-05-03

### Added

- Added `metadata.trends[]` to `SimpleBarChartProps` to allow `<TrendIndicator />`'s to render inline.

### Fixed

- Fix ErrorText positioning in ChartSkeleton.

## [9.2.2] - 2023-04-25

- No updates. Transitive dependency bump.

## [9.2.1] - 2023-04-24

### Fixed

- Changed invalid `fill-rule` and `clip-rule` DOM properties.

## [9.2.0] - 2023-04-17

### Changed

- Allow `<MissingDataArea />` to render wherever values are `null` instead of at the end of the chart.

### Fixed

- Fixed issue with `<BarChart />` hover zones being too short.

## [9.1.1] - 2023-04-12

- No updates. Transitive dependency bump.

## [9.1.0] - 2023-04-12

### Removed

- Removed `size` from `TrendIndicatorProps`.
- Removed background rect from `<TrendIndicator />`.

## [9.0.1] - 2023-04-06

- No updates. Transitive dependency bump.

## [9.0.0] - 2023-04-05

- No updates. Transitive dependency bump.

## [8.0.0] - 2023-04-05

### Added

- `<LineChartRelational />` component to support Benchmarks.
- `useExternalHideEvents()` & `setHiddenItems()` to allow consumers to toggle visibility of series in `<LineChartRelational />` & `<LineChart>`.

### Changed

- Reduced `<LineChart />` hit area from `40px` to `15px`.
- Renamed `renderLinearComparisonTooltip()` to `renderLinearTooltipContent()`.

### Fixed

- Fixed `<LinePreview />` right side being cut off.
- Don't render `<TooltipSeriesName />` when a group doesn't have any visible items.

## [8.2.0] - 2023-03-08

### Fixed

- Stop the `<LineChart />` tooltip from covering the current active crosshair.

## [8.1.1] - 2023-02-17

- No updates. Transitive dependency bump.

## [8.1.0] - 2023-02-17

- No updates. Transitive dependency bump.

## [8.0.5] - 2023-02-15

- No updates. Transitive dependency bump.

## [8.0.4] - 2023-02-09

### Fixed

- Fixed `<LineChart />` points not animating correctly.
- Fixed `<LineChart />` points displaying incorrecly if `DataSeries` had `null` values.

## [8.0.3] - 2023-02-09

- No updates. Transitive dependency bump.

## [8.0.2] - 2023-02-08

- No updates. Transitive dependency bump.

## [8.0.1] - 2023-02-08

- No updates. Transitive dependency bump.

## [8.0.0] - 2023-02-08

### Changed

- Change `RenderInnerValueContent` type introduced in `7.12.0`.
- Updated `react` and `react-dom` to `18.2.0`.

## [7.16.1] - 2023-01-26

- No updates. Transitive dependency bump.

## [7.16.0] - 2023-01-26

### Fixed

- Use the `showLegend` and `size` properties in loading state for `<SimpleNormalizedChart />`
- Fixed bug where hover events in `<LineChart />` were not working.
- Fixed positioning issue in `<DonutChart />` where inner value content is not centered properly.

## [7.15.0] - 2023-01-26

- No updates. Transitive dependency bump.

## [7.14.1] - 2023-01-25

- No updates. Transitive dependency bump.

## [7.14.0] - 2023-01-24

### Fixed

- Fixed `<LineSeries />` single line hover events not firing.
- Fixed annotations x position in `<LineChart />` being offset from actual value.
- Fixed x-axis annotations not rendering if the x-axis labels have been formatted with `xAxisOptions.labelFormatter`.

## [7.13.1] - 2023-01-18

### Fixed

- Use the `theme.chartContainer.backgroundColor` property for the shimmer in loading state for `<DonutChart />`
- Use the `theme.arc.thickness` property in loading/error states for `<DonutChart />`
- Change positioning of `ValueHorizontalContainer` so that value does not overlap label

### Changed

- Fixed the size difference between success and loading/error states for `<DonutChart />`

## [7.13.0] - 2023-01-13

- No updates. Transitive dependency bump.

## [7.12.0] - 2023-01-05

### Fixed

- Use correct width for `<HorizontalGridLines />` in `<BarChart />` based on `grid.horizontalOverflow` value.
- Export `ColorVisionInteractionMethods` type
- Use flexbox instead of grid for parent element of `renderLegendContent()` in `<SimpleNormalizedChart />`.

### Added

- Added `arc` property to `PartialTheme` to allow override of the default theme option for `<DonutChart />`.
- Added `legendFullWidth` prop to `<DonutChart />`
- Added `renderInnerValueContent` prop to `<DonutChart />`.
- Added `pillOpacity` to `AnnotationsTheme` and updated `LIGHT_THEME` annotations properties.

## [7.11.1] - 2022-12-05

- No updates. Transitive dependency bump.

## [7.11.0] - 2022-12-01

- No updates. Transitive dependency bump.

## [7.10.0] - 2022-11-28

### Changed

- When determining which `DataSeries[].data` to use for labels, use either the first item in the data array when lengths match or the array with the longest length.

## [7.9.0] - 2022-11-18

- No updates. Transitive dependency bump.

## [7.8.1] - 2022-11-15

### Fixed

- Fixed `<LineChart />` tooltip being offset from the mouse/pointer position.

## [7.8.0] - 2022-11-09

### Fixed

- Fixed issue in `<ComboChart />` where wrong `yScale` could be used which rendered the `<Tooltip />` component outside the chart bounds.

## [7.7.1] - 2022-11-04

- No updates. Transitive dependency bump.

## [7.7.0] - 2022-11-02

### Changed

- Fixed the case where the `LineChart` was not properly inheriting the theme theme passed to the chart.

- Fixed `<LineSeries />` path being cut off when data was along the bottom of the chart.
- We no longer inset `<LineChart />`'s `<XAxis>`.
- Don't render last label on `<LineChart />` or `<StackedAreaChart />`.
- Use `DataSeries` with longest series length when building `<XAxis>` labels.

## [7.6.0] - 2022-10-25

- No updates. Transitive dependency bump.

## [7.5.1] - 2022-10-18

- No updates. Transitive dependency bump.

## [7.5.0] - 2022-10-18

### Changed

- Bumped the following packages: `d3-array@^3.2.0`, `d3-color@^3.1.0`, `d3-path@^3.0.1`, `d3-scale@^4.0.2` & `d3-shape@^3.1.0`.

### Fixed

- If a tooltip does not contain any data, it is not rendered.

## [7.4.5] - 2022-10-12

- No updates. Transitive dependency bump.

## [7.4.4] - 2022-10-06

- No updates. Transitive dependency bump.

## [7.4.3] - 2022-10-06

### Fixed

- Fixed bug where `<LineChart />` crosshair would be too far from current mouse position when hovering points.

## [7.4.2] - 2022-10-04

- No updates. Transitive dependency bump.

## [7.4.1] - 2022-10-04

- No updates. Transitive dependency bump.

## [7.4.0] - 2022-10-03

### Added

- Added `OpacityScale` utility.

## [7.3.2] - 2022-09-26

- No updates. Transitive dependency bump.

## [7.3.1] - 2022-09-19

### Added

- Added animations to vertical stacked `<BarChart />'.
- Added data change animations to vertical `<BarChart />'.

### Fixed

- Fixed position of dot in SparkLineCharts when series use non-numeric data keys.

## [7.3.0] - 2022-08-31

### Fixed

- Fixed an issue where charts would crash when empty `DataSeries.data` array was empty.

## [7.2.0] - 2022-08-31

### Fixed

- Fixed diagonal labels jumping around in cases where the threshold was too close.

## [7.1.0] - 2022-08-31

### Changed

- Don't inset `<LineSeries />` when labels are hidden.

### Fixed

- Fixed horizontal bar charts not animating their bars in on mount.
- Fixed links from `polaris-viz.shopify.io` to `polaris-viz.shopify.com` in documentation.
- Fixed `theme` not being passed to `<ChartSkeleton />`.

## [7.0.0] - 2022-08-12

### Fixed

- Fixed bug where points in `<StackedAreaChart />` were in the wrong positions when `StackedAreaChart.isAnimated=false`.
- Fixed missing stroke for `<LineChart />` & `<StackedAreaChart />` points in `Default` theme.

### Changed

- Replaced `bar.hasRoundedCorners` with `bar.borderRadius` which now accepts a `number`

## [6.6.1] - 2022-08-10

### Fixed

- Fixed position of dot in SparkLineCharts when series use non-numeric data keys

## [6.6.0] - 2022-08-05

### Changed

- Removed `dataOffsetLeft` and `dataOffsetRight` props from `SparkBarChart` and unified them under the `TargetLine` prop.

### Added

- Loading and Error states to all charts.
- Data change animations to all charts.
- Added `theme` prop to `<ChartSkeleton />`.

### Fixed

- Fixed issue where color vision updates to groups would affect all charts on the page. Now changes are scoped to each chart.

### Added

- Added `xAxisOptions.allowLineWrap` to toggle line wrapping in xAxis labels.

## [6.5.0] - 2022-08-03

### Added

- Added `ColorScale` utility.

## [6.4.0] - 2022-08-03

- No updates. Transitive dependency bump.

## [6.3.0] - 2022-07-29

### Fixed

- Improved perceived performance of tooltips for large data sets in `BarChart`, `LineChart` & `StackedAreaChart`.

## [6.2.0] - 2022-07-27

### Added

- `ChartErrorBoundary` around every chart to catch unhandled errors that prevent the chart from rendering

### Fixed

- `HorizontalBarChart` and `VerticalBarChart` don't display a bar if a passed value is null or missing.

### Added

- Render xAxis and dual yAxis annotations in `<ComboChart />`.
- Render labels for each axis in `<ComboChart />`.

## [6.1.0] - 2022-07-21

### Removed

- Removed `theme` prop from all non-exported components. `theme` is now provided from `<PolarisProvider >`.

## [6.0.3] - 2022-07-20

### Fixed

- Fixed issue where `grid.horizontalMargin` was not being applied to `<YAxis />` in `<VerticalBarChart />`, `<LineChart />` & `<StackedAreaChart />`;

## [6.0.2] - 2022-07-20

### Fixed

- Fixed height calculation from `useLegends()`.

## [6.0.1] - 2022-07-18

### Fixed

- Added `<DonutChart/>` to list of exported components

## [6.0.0] - 2022-07-18

### Fixed

- Added null checks in `SimpleBarChart` and `HorizontalBarChart` to avoid crashes when `data` prop changes

### Added

- Added loading and error states to `<DonutChart/>`.
- Added `type` prop to `<ChartSkeleton/>`.
- Added `legendPosition` prop to `<DonutChart />`.
- Renamed `labelPosition` prop to `legendPosition` in `<SimpleNormalizedChart />`
- Added yAxis annotations to `<LineChart />` & `<StackedAreaChart />`

## [5.0.0] - 2022-07-07

### Added

- Added `<ComboChart />`.

## [4.1.1] - 2022-07-06

- No updates. Transitive dependency bump.

## [4.1.0] - 2022-07-06

### Added

- Added `annotations` to `StackedAreaChartProps` and `LineChartProps`.

### Removed

- `bar.innerPadding` and `bar.outerPadding`

### Changed

- Sped up `<BarChart/>` animations for large, single series data sets.

### Fixed

- `<SimpleBarChart/>` label positions on Safari
- `FunnelChart` labels in Safari

## [4.0.0] - 2022-06-23

### Added

- `tooltipOptions.keyFormatter` to `<LineChart/>`, `<BarChart/>` and `<StackedAreaChart/>`
- `tooltipOptions.valueFormatter` to `<LineChart/>`, `<BarChart/>` and `<StackedAreaChart/>`
- `tooltipOptions.titleFormatter` to `<LineChart/>`, `<BarChart/>` and `<StackedAreaChart/>`

### Changed

- `<LineChart />` now supports series that are shorter than the X-Axis.
- `renderTooltipContent` is now nested inside `tooltipOptions` in `<LineChart/>`, `<BarChart/>` and `<StackedAreaChart/>`
- `useLegend` hook now accepts `DataGroup[]` and `DataSeries[]`
- `<SimpleNormalizedChart/>` now displays an empty bar when data values are all zero or no data is passed

## [3.0.0] - 2022-06-20

### Added

- Introduces `useUniqueId` and `useComponentDidMount` hooks

### Changed

- Annotations on `<BarChart />` now display new design with optional content on hover/focus.

### Removed

- Removed `tooltipContent` from `Annotations` type. Content is no longer displayed in the `<BarChart />` tooltip.
- Removed `annotations` from `<HorizontalBarChart />`.

## [2.1.0] - 2022-06-17

### Added

- introduces a new `<DonutChart />` component

### Fixed

- LineChart and SparkLine lines being cropped on the top
- LineChart and SparkLine lines animation playing from the middle instead of from the bottom
- Cropped labels on the YAxis

## [2.0.0] - 2022-06-09

### Added

- `<SimpleNormalizedChart/>` series colors can now be overwritten by using the `color` key in the `DataSeries` passed to the `data` prop
- `<SimpleNormalizedChart/>` when passing `DataSeries.isComparison: true` to the `data` prop, the corresponding bar will now use the coparison color defined in the `Theme`
- Added `value` prop to `<LegendItem />`.

### Changed

- `<SimpleNormalizedChart/>` now accepts `DataSeries[]` in `data` prop, instead of `DataPoint[]`
- Changed `@juggle/resize-observer` library as dependency.
- Stop tooltip from rendering outside of `<BarChart />` when only a single series is provided.

## [1.11.1] - 2022-06-02

### Changed

- Bumped `simple-plist` to `1.3.1`.

## [1.11.0] - 2022-06-02

- No updates. Transitive dependency bump.

## [1.10.3] - 2022-05-27

### Changed

- `theme` is now optional for `<ChartSkeleton />`, `<Legend />` & `<TooltipContent />`.

## [1.10.2] - 2022-05-26

### Fixed

- Fixed issue where `<LineSeries />` would crash if the `data` array was empty.

## [1.10.1] - 2022-05-26

### Changed

- Updated react-spring to v9.4.5

## [1.10.0] - 2022-05-25

### Changed

- `ChartProps` and `DEFAULT_CHART_PROPS` are now used on `<LineChart/>`, `<BarChart/>`, `<SimpleBarChart/>`, `<SparkBarChart/>`, `<SparklineChart/>` and `<StackedAreaChart/>`

## [1.9.3] - 2022-05-25

### Fixed

- LineChart `theme` prop is optional again

## [1.9.2] - 2022-05-24

### Changed

- Use print-color-adjust instead of color-adjust to prevent webpack warnings in consumers using `autoprefix`

## [1.9.0] - 2022-05-24

### Added

- Added `FunnelChart` component

## [1.8.0] - 2022-05-19

### Added

- Re-export `ChartState` type  from `@shopify/polaris-viz-core`
- Export `ChartSkeleton` subcomponent

### Changed

- Revert tooltip change introduced in `1.3.1`.
- Use `getBoundingClientRect()` to accurately measure characters for `character-widths.json`.

## [1.7.1] - 2022-05-18

- No updates. Transitive dependency bump.

## [1.7.0] - 2022-05-18

- No updates. Transitive dependency bump.

## [1.6.0] - 2022-05-17

### Added

- Added `ChartSkeleton` component

### Changed

- Fix issue where `<SparkLineChart />` doesn't go to the containers right edge.
- Changed `line.sparkArea` to `line.hasArea` from line theme.
- `line.hasArea` now accepts a boolean to determine when we render the area below a line series.

### Removed

- Removed `line.style` & `line.hasPoint` from line theme.

## [1.5.0] - 2022-05-04

### Added

- Added `legend.backgroundColor` to the Theme definition
- Fixed missing `themes` prop in ThemeDefinitions storybook documentation

### Removed

- Removed `lineStyle` from `LineChartProps`.

### Changed

- Moved `getColorVisionStylesForActiveIndex()`, `getColorVisionEventAttrs()`, `getAverageColor()`, `changeGradientOpacity()` and `changeColorOpacity()` to `polaris-viz-core`.
- Use `<LineSeries />` for `LineChart` and `StackedAreaChart`.


## [1.4.0] - 2022-04-20

### Changed

- Tooltips will now stick along the yAxis (or xAxis for horizontal charts).
- All charts use a unified `useYAxis()` hook instead of 3 slightly different  implementations.

## [1.3.1] - 2022-04-18

### Changed

- Tooltips will now stick along the yAxis (or xAxis for horizontal charts).

## [1.3.0] - 2022-04-18

### Changed

- Renamed `Annotation.tooltipData.label` to `key`.
- Renamed `theme.tooltip.valueColor` to `textColor`.
- Renamed `theme.tooltip.labelColor` to `titleColor`.
- Renamed `theme.tooltip.labelColor` to `titleColor`.
- Changed `LegendData.iconType` to `shape` which now accepts the `Shape` type.
- Changed `useLegend()` `type` to `shape` which now accepts the `Shape` type.

## [1.2.1] - 2022-04-13

- No updates. Transitive dependency bump.

## [1.2.0] - 2022-04-13

### Changed

- All components now use the core `XAxisOptions` & `YAxisOptions` types.
- All label formatters now use the core `LabelFormatter` type.

### Removed

- Removed `xAxisLabels` from `LinearXAxisOptions.xAxisOptions`.
- Removed `StringLabelFormatter` & `NumberLabelFormatter` types.

### Added

- `chartContainer.minHeight` and `chartContainer.minSparkChartHeight` to the theme definition

### Fixed

- Charts will now render if the parent container doesn't have a fixed size. Min height from the theme will be used as fallback.

## [1.1.0] - 2022-03-28

### Added

- Added logic to either truncate labels, display them diagonally or horizontally based on container size.
- `LinearXAxisLabels` to `<LineChart>` & `<StackedAreaChart />`.
- `LinearXAxisLabels` will now drop labels for space and allow 2 lines of truncation.

### Changed

- `xAxisOptions` renamed to `LinearXAxisOptions` for linear charts.
- `LinearXAxisOptions.labels` renamed to `LinearXAxisOptions.xAxisLabels`.

### Removed

- Removed `wrapLabels` from `BarChart.xAxisOptions`.
- Removed `useMinimalLabels` from `xAxisOptions`.

### Added

- `<LegendContainer />` now uses `grid.horizontalMargin` to match consumer spacing inside the chart container.

## [1.0.5] - 2022-03-23

### Changed

- Changed `@react-spring/web` dependency to version `9.2.6`

### Added

- Added logic to either truncate labels, display them diagonally or horizontally based on container size.
- `LinearXAxisLabels` to `<LineChart>` & `<StackedAreaChart />`.
- `LinearXAxisLabels` will now drop labels for space and allow 2 lines of truncation.

### Changed

- `xAxisOptions` renamed to `LinearXAxisOptions` for linear charts.
- `LinearXAxisOptions.labels` renamed to `LinearXAxisOptions.xAxisLabels`.

### Removed

- Removed `wrapLabels` from `BarChart.xAxisOptions`.
- Removed `useMinimalLabels` from `xAxisOptions`.

### Fixed

- Removed focus outline on `<StackedAreaChart />` and `<LineChart />`.
- Fixed issue where color vision events wouldn't correctly update when first interaction was a keyboard event.


### Added

- `<LegendContainer />` now uses `grid.horizontalMargin` to match consumer spacing inside the chart container.

## [1.0.4] - 2022-03-14

- No updates. Transitive dependency bump.

## [1.0.3] - 2022-03-14

### Changed

- Removed duplicated types from `@shopify/polaris-viz`: `Color`, `BarTheme`,`DataSeries`,`Theme`,`PartialTheme`,`GradientStop`,`DataPoint` now imported from ``@shopify/polaris-viz-core`

## [1.0.2] - 2022-03-14

- No updates. Transitive dependency bump.

## [1.0.1] - 2022-03-11

- No updates. Transitive dependency bump.

## [1.0.0] - 2022-03-11

### Changed

- `@shopify/polaris-viz` is now three packages: `@shopify/polaris-viz` (our web, React library), `@shopify/polaris-viz-native` (our mobile, React Native library) and `@shopify/polaris-viz-core` (the library under the hood that powers both consumer-facing libraries).
- For new React Native consumers, we are releasing our React Native package with two initial components: `SparkLineChart` and `SparkBarChart`. We're planning to add other components in the near future.
- To update to 1.0.0 please ensure that you're using `PolarisVizProvider` as it's now mandatory whenever using `polaris-viz` in your app. Please also
note that there have been some other changes to the library that have also been released with this version. Please see the "Fixed" section below.

### Fixed

- Color preview square wasn't showing on `<StackedAreaChart/>` tooltip
- `<Sparkbar />` bar shape is now configurable by the theme bar.hasRoundedCorners property
- `<SimpleNormalizedChart />` overlapping labels when chart was vertical
- Bug where `showLabels=false` would cause `<SimpleBarChart >` to render with 0 opacity.
- Bug where vertical `<SimpleNormalizedChart />` would use the wrong index for color vision interactions.
- Bug causing the animated `<LineChart />` to break when hovered over if empty data was provided

## [0.29.0] - 2022-01-20

### Added

- Added `<Legends />` component.
- Added `showLegend` to `BarChartProps`, `LineChartProps` and `StackedAreaChartProps` to control the visibility of `<Legends >`.
- Added Color Vision a11y interactions to all non-Spark charts.

### Changed

- `LegendProps.series` renamed to `LegendProps.data`.
- `LegendProps.data[].lineStyle` was removed. Use `LegendProps.data[].isComparison` to show a dotted line.
- `LegendProps.data[].iconType` was added. Use `solid` to display a rectangle icon and `line` to display a line icon.

### Removed

- Removed legacy `<Legend >` component.

### Fixed

- Removed focus outline on `<StackedAreaChart />` and `<LineChart />`.
- Fixed issue where color vision events wouldn't correctly update when first interaction was a keyboard event.

## [0.28.7] - 2022-01-20

### Fixed

- Prevent tooltips from rendering outside `<ChartContainer/>`
- Fixed a bug that prevented Firefox from using `Print` theme on `<SimpleNormalizedChart/>`
- Fixed opacity not applying to `<SparkLineChart />` area when animation is disabled.
- Fixed bug where `<BatChart />` would restart animation on every data change.

### Changed

- Changed loaded animation in `<StackedAreaChart />` from left to right to bottom up.

## [0.28.5] - 2022-01-14

### Changed

- Added extra conditionals in `HorizontalBarChart` to prevent crashing of the component when `data` prop changes.

### Added

- Added `Print` theme. This theme gets automatically applied when printing charts. Can be overwritten through the [PolarisVizProvider](https://polaris-viz.shopify.io/?path=/docs/docs-themes-customizing--page)

## [0.28.4] - 2022-01-06

### Added

- Added `activeIndex` to `TooltipData` so consumers have access to the current hovered data.
- Re-added `xAxisOptions.isuseMinimalLabels` to `BarChartProps`.

## [0.28.3] - 2022-01-04

### Changed

- Filter down ticks on horizontal `<BarChart />` based on chart size.
- Added `10px` of space between `<TooltipContent />` elements.

### Fixed

- Fixed tooltip position when first bar has largest value in series in `<BarChart />`.
- Fixed tooltip position when all values are 0 in horizontal `<BarChart />`.
- Fixed issue where tooltip would still be visible when chart lost focus.

### Added

- Add `<ChartContainer />` to `<SimpleNormalizedChart />` so it inherits the print styles.

## [0.28.2] - 2021-12-13

- Replaced `theme.line.dottedStrokeColor` by `theme.seriesColors.comparison`

## [0.28.0] - 2021-12-07

[0.28.0 Migration Guide](https://docs.google.com/document/d/1iO05cV5POYAjXI6HAiVXBHo7jWdMA7_ad3w08KQ52Dg)

### Added

- Added `direction` to `BarChartProps` to switch between `vertical` and `horizontal` charts.

### Changed

- Renamed `series` to `data` in `StackedAreaChartProps`.
- Changed `StackedAreaChartProps.data` to use `DataSeries[]`.
- Changed `BarChartProps.data` to use `DataSeries[]`.
- Renamed `isStacked` to `type` in `BarChartProps`.
- `type` now accepts `default | stacked` to change between stacked or individual bar groups.
- Renamed `Annotation.xOffset` to `offset`.
- Renamed `Annotation.dataIndex` to `dataSeriesIndex`.
- Added `dataPointIndex` to `Annotation`.
- Renamed `series` to `data` in `LineChartProps`.
- Changed `LineChartProps.data` to use `DataSeries[]`.

### Removed

- Removed `<MultiSeriesBarChart />`.
- Removed `<HorizontalBarChart />`.

## [0.27.0] - 2021-12-01

[0.27.0 Migration Guide](https://docs.google.com/document/d/1iO05cV5POYAjXI6HAiVXBHo7jWdMA7_ad3w08KQ52Dg)

### Added

- Added `<SimpleBarChart />`.

### Removed

- Removed `isSimple` from `HorizontalBarChartProps`.

### Changed

- Renamed `isStacked` to `type` in `HorizontalBarChartProps`.
- `type` now accepts `default | stacked` to change between stacked or individual bar groups.
- Renamed `series` to `data` in `HorizontalBarChartProps`.
- Renamed `<NormalizedStackedBarChart />` to `<SimpleNormalizedChart />`.
  - Removed `data.formattedValue`. The component now accepts a `labelFormatter` root prop for formatting the `data.value` value.
  - Removed `data.comparisonMetric`. The component now accepts a `comparisonMetric` prop.
  - Renamed `SimpleNormalizedChart.orientation` to `SimpleNormalizedChart.direction`.

## [0.26.1] - 2021-12-01

### Added

- Added `position: relative` to `@chart-container` mixin.

## [0.26.0] - 2021-11-29

[0.26.0 Migration Guide](https://docs.google.com/document/d/1iO05cV5POYAjXI6HAiVXBHo7jWdMA7_ad3w08KQ52Dg)

### Added

- Horizontal overflow style to `<StackedAreaChart />`, which were unintentionally removed
- Use `<ChartContainer />` in `<SparkBarChart />`.
- Use `<ChartContainer />` in `<SparkLineChart />`.

### Changed

- Renamed `<Sparkbar />` to `<SparkBarChart />`.
- Renamed `<Sparkline />` to `<SparkLineChart />`.
- Moved `offsetLeft` & `offsetRight` from `SparkLineChartProps.series` to `SparkLineChartProps`.
- Renamed `series` to `data` in `SparkLineChartProps`.

### Removed

- `area`, `lineStyle`, and `hasPoint` from `SparkLineChartProps.series`.
- `barColor` and `comparison` from `SparkBarChartProps`. These props are now available on the `DataSeries` as `color` and `isComparison`.

## [0.25.7] - 2021-11-26

### Fixed

- Fixes bug in Safari WebViews pre iOS14 that can cause to throw a type error.

## [0.25.6] - 2021-11-26

- Skipped

## [0.25.5] - 2021-11-26

### Fixed

- Fixes issue where removal of series in a `<HorizontalBarChart />` can lead to throwing of a TypeError.

## [0.25.4] - 2021-11-25

### Changed

- Use average color between gradient stops for `<LineChart />` area color.

## [0.25.3] - 2021-11-22

- Add unique id to series colors used in `<HorizontalBarChart />`.

## [0.25.2] - 2021-11-22

### Changed

- Correctly truncate long group labels in `<HorizontalBarChart />`.

## [0.25.1] - 2021-11-16

### Added

- Horizontal overflow style to `<StackedAreaChart />`, which were unintentionally removed

## [0.25.0] - 2021-11-12

### Added

- Added `renderTooltipContent` prop to `<HorizontalBarChart />`.

## [0.24.2] - 2021-11-11

### Changed

- Chart components resizing and printing behaviour is now centralized in `<ChartContainer />`.
- Most charts are printed using the light theme, however any prop color overrides will still apply when printed. Charts that do not have this treatment yet are `<Sparkline />`, `<Sparkbar />` and `<NormalizedStackedBarChart />`.

### Fixed

- "Reduce Motion" was not respected in `<BarChart />` and `<Sparkbar />`.

### Added

- Added rounded corners to `stacked` versions of `<HorizontalBarChart />` & `<MultiSeriesBarChart />`.

## [0.24.1] - 2021-11-02

### Fixed

- Fixed issue where the element to measure in `getTextHeight()` was not wrapped.

## [0.24.0] - 2021-11-01

### Changed

- This project uses Node 16 as part of development on this project. There are no expected consumer-facing changes.

### Added

- Added `labelPosition` prop with default value `top-left` to `<NormalizedStackedBarChart />`.

## [0.23.1] - 2021-10-27

### Changed

- Upgrade React to version 17. Updates the `peerDependencies` to allow React 16 or 17. No consumer-facing changes are expected.

### Added

- Added animations to `<NormalizedStackedBarChart />`.

## [0.23.0] - 2021-10-27

### Added

- Added `<HorizontalBarChart />`.
- Added `grid.showHorizontalLines` theme option to `<StackedAreaChart />`.

## [0.22.0] - 2021-10-22

### Changed

- Switch the build system to use `loom` instead of a mix of `sewing-kit`, `rollup`, `typescript`, and other custom-built functionality. We now provide builds with CommonJS, ESM, and ESNext output.
- **Breaking change** The build output has moved. See `build/{cjs,esm,esnext}` for the various formats. Types have also moved to `build/ts/src`. See https://github.com/Shopify/web/pull/50652 for an example of how these changes might impact your project.
- **Breaking change** CSS class names are no longer prefixed and namedspaced in the same way. If you are targeting Polaris Viz elements, please [create an issue](https://github.com/Shopify/polaris-viz/issues/new) so we can talk about your scenario.
  - Before: `.PolarisViz-ChartContainer`, `.PolarisViz-Chart__BarGroup`, etc
  - After: `._ChartContainer_tub85_3`, `._BarGroup_ysryh_7`, etc
- **Potentially breaking change** We now generate a proper ESNext build that should _not_ require any workarounds when integrating with Webpack and `sewing-kit` (provided [`sewing-kit >= 0.135.0`](https://github.com/Shopify/sewing-kit/blob/main/CHANGELOG.md#01350---2020-08-19)).
- **Potentially breaking change** We now target [`@shopify/browserslist-config`](https://github.com/Shopify/web-configs/tree/main/packages/browserslist-config) for browser support. See the full list of changes [here](https://www.diffchecker.com/GYbqZwse). Most notably , we've dropped explicit support for the following browsers:
  - Safari < 13.1
  - iOS Safari < 12.2
  - Internet Explorer 11

#### Developer Changes

- We no longer support "absolute" import paths in our tests. This allowed us to import components via `import {Thing} from 'components/Thing'`, but now you must use the relative path (e.g. `import {Thing} from '../../components/Thing'`). This allow our build tools to be consistent and not needing to add support in different ways (e.g. `jest`, `rollup`, `storybook`).

## [0.21.5] - 2021-10-21

### Added

- Horizontal overflow style to `<StackedAreaChart />`

## [0.21.4] - 2021-10-20

### Added

- Charts with `xAxisOptions` have the option to disable text wrapping of xAxis labels

### Fixed

- `<StackedAreaChart />` stroke is cut off if it reaches the top of the chart
- Various xAxis label bugs that caused labels to truncate too early
- Apply yAxis formatter to default tooltip on `<LineChart />`

## [0.21.3] - 2021-10-15

### Fixed

- Circular dependency in `<LineChart />`
- Theme.line.strokeColor now gets applied to StackedAreaChart
- Theme.line.lineStyle and Theme.line.hasPoint now gets applied to Sparkline
- Fixed issue with tooltips extended too far right when hovering last point.

## [0.21.2] - 2021-09-29

### Changed

- Storybook is now used for documentation and is deployed using Github Pages
- Line chart animates from the top up, instead of horizontally

### Fixed

- Charts at very small sizes no longer get cut off at the bottom

## [0.21.1] - 2021-09-23

### Added

- Hiding the xAxis is now possible on the `<BarChart />`, `<MultiseriesBarChart />` and `<StackedAreaChart />`
- Added logic to push `<TooltipContainer>` away from `<BarChart />` & `<MultiseriesBarChart />` to not obscure bars.

### Fixed

- xAxis labels are no longer cut off on charts at small widths when they contain mostly numbers
- Fixed measurement logic around labels for small charts.
- Removed stray semi-colons in BarChart component

### Changed

- Improved performance when mounting data sets in `<BarChart />` & `<MultiseriesBarChart />`.

## [0.20.3] - 2021-09-14

- Fixed the direction of the gradient on the horizontal `<NormalizedStackedBarChart />` legend
- Remove change that made data required in `<Legend />` props

## [0.20.2] - 2021-09-13

### Fixed

- Fixed the direction of the gradient on the horizontal `<NormalizedStackedBarChart />`
- Gradient not being applied properly to `<Sparkbar>`

### Changed

- Individual bar colors can no longer be overwritten in  `<Sparkbar>`, but the bar color over all can be overwritten by using the `barColor` prop

## [0.20.0] - 2021-09-10

- Removed `tslib` as a dependency entirely. This change inlines the helpers used by TypeScript. The result is that the bundle is a little smaller (e.g. ~2KB after minification and gzip), and dependency issues become a non-problem.

## [0.19.1] - 2021-09-10

### Fixed

- A bug where the Sparkline's line would not show when displaying all 0s and the Point is present

### Changed

- `<StackedAreaChart />` UX improvements (animation, added line to top of chart, reduced opacity)

## [0.19.0] - 2021-09-09

### Added

- Added `seriesColors.single`  in theme definition

## [0.19.0-9] - 2021-09-08

### Added

- Added `xAxisOption.hide` option in `<LineChart>` to override the theme option.

### Changed

- yAxis labels now default to right aligned in `<MultiSeriesBarChart>`.

## [0.19.0-1] - 2021-09-01

### Added

- Added `Light` theme.
- Export `Color` type.
- `<LineChartTooltipContent>` now uses series colors.

### Changed

- `<Legend>` now defaults to using series colors.
- `<SparkLine>` dashed lines no longer show point.
- Made `color` optional in `LegendData`.

### Fixed

- Non-solid lines in `<LineChart />` were not being set to `dottedStrokeColor` correctly.
- Fixed wrong color being applied when `lineType` was not provided.

## [0.19.0-0] - 2021-08-31

### Added

- `PolarisVizProvider` to support theming charts
- The `theme` to prop to `<BarChart />`, `<LineChart />`, `<Sparkline />`, `<StackedAreaChart />` and `<Sparkbar />`
- `<Sparkline />` supports the dotted line style
- `<Sparkline />`, `<StackedAreaChart />` and `<Sparkbar />` support gradient fills
- `<Legend />` text is now configurable via the theme

### Removed

- Polaris Tokens strings are no longer accepted as colors. Any valid CSS color can now be provided as a color to charts, and in some cases gradients can be specified by supplying an array of gradient stops.
- `barOptions`, `gridOptions`, `xAxisOptions.showTicks`, `xAxisOptions.labelColor` and `yAxisOptions.labelColor` from `BarChartProps` and `LineChartProps`.
- `barFillStyle` and `color` props are removed from the `<Sparkbar />` component and are inherited from the chart's theme
- `opacity` prop from `<StackedAreaChart />`. Opaque colors can now be directly specified in the series color prop or theme.
- `colors` prop from  `<NormalizedStackedBarChart />`

### Changed

- `<BarChart />`, `<LineChart />`, `<Sparkline />`, `<NormalizedStackedBarChart />`, `<MultiSeriesBarChart />` and `<Sparkbar />` styles now are defined through themes in `PolarisVizProvider` instead of props. For more details check the [migration guide](https://docs.google.com/document/d/1VxfcgBbTNwjmYix1jGuDMgqDgIdehTgQbVZpER7djeU/edit?usp=sharing)
- change indicators on the  `<NormalizedStackedBarChart />` can now have their colors configured externally, which applies the color to the metric and percentage change
- `SparkChartData` now accepts `value` and `color` properties, instead of `number | null`, to allow individual bars to override the `seriesColors`.

### Fixed

- in `<Sparkbar />`, align comparison bar and bars.
- `<NormalizedStackedBarChart />` no longer overflows its container by a few pixels
- [Updates `serialize-javascript` package](https://github.com/Shopify/polaris-viz/pull/477). No consumer-facing changes are expected.

## [0.18.2] - 2021-08-17

- [Updates dev dependencies](https://github.com/Shopify/polaris-viz/pull/474). No consumer-facing changes are expected.

## [0.18.1] - 2021-08-11

### Fixed

- Comparison data is used in the `<Sparkbar />` scale

## [0.18.0] - 2021-08-10

### Fixed

- Fixes `<BarChart />` when very large datasets are displayed
- Fixes background color not showing when printing `<NormalizedStackedBarChart />`.

### Changed

- removes @shopify/css-utilities in favour of adding our own utility
- lowers d3-path dependency to a version matching d3-shape's dependency
- replaces lodash.isequal with smaller option fast-deep-equal
- adds a resolution for d3-array so we only have one version of the package in our library
- Add xmlns and specific height & width values to svgs tags

## [0.17.2] - 2021-06-23

### Changed

- Explicitly specifies `tslib@^2.1.0` instead of `tslib@^2.1` in an attempt to fix duplicated packages in `web`

## [0.17.1] - 2021-06-17

### Changed

- Adds `tslib@^2.1` to our package `dependencies` to avoid different versions of `tslib` resolving and breaking our code.

## [0.17.0] - 2021-06-16

POTENTIALLY BROKEN -- This release implicitly depends on `tslib>=2.1.0` but other projects may not explicitly be using `tslib>=2.1.0`. For example, this version sporadically breaks in `web` since the version of `tslib` in `web` resolves to `^1`.

It is not advised to use this version -- stick to `0.16.1` or wait for `0.17.1` which will fix this issue.

### Changed

- Upgrades our build tools to the latest major versions. We **do not** expect any change in behavior for consumers of Polaris Viz.

## [0.16.1] - 2021-06-09

### Fixed

- Improves the performance of the `<LineChart />` by reducing label measurements
- Ensures the xAxis is always shown for bar charts and `<LineChart />`

## [0.16.0] - 2021-05-26

### Changed

- Upgrades `react-spring` to version `9.1.2`, which offers improved types, new features, and fixes memory leaks. We don't expect this upgrade to change the functionality of any of our components.

## [0.15.1] - 2021-05-25

### Fixed

- Fixed an issue in Safari version `<14` where `window.matchMedia('print').addEventListener` is not supported.

## [0.15.0] - 2021-05-20

### Changed

- Zero value min-height bars are not enabled by default in `<BarChart />` and `<MultiSeriesBarChart />`
- The `useMinimalLabels` prop for `<BarChart />` will not use a middle label when there are an even number of bars below 12

### Fixed

- Min height bars not being shown when all bars are negative in `<BarChart />` and `<MultiSeriesBarChart />`

## [0.14.1] - 2021-05-18

### Fixed

- 0 value not always being included for `<LineChart />` yScale

## [0.14.0] - 2021-05-18

### Changed

- Increased the minimum bar height for 0 values to 2px from 1px in `<BarChart />` and `<MultiSeriesBarChart />`
- Increased the border radius of rounded bars to 4px from 3px in `<BarChart />` and `<MultiSeriesBarChart />`
- Increased size of ColorPreview on Legend and Tooltip, as well as modifying its border-radius
- `<LineChart />` will now render `<Point />` at full opacity if the color value has transparency

### Fixed

- 0 values not showing a min height bar in grouped `<MultiSeriesBarChart />`
- Chart xAxis label space now factors in `horizontalMargin`

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

### Added

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

## [0.12.1] - 2021-05-10

### Fixed

- yAxis ticks sometimes getting cut off
- `<SparkLine/>` and `<Sparkbar/>` stroke dasharray treatment is consistent at all sizes
- Components now resize when their container resizes, not just when the page resizes

## [0.12.0] - 2021-05-10

### Fixed

- `<SparkLine/>` and `<Sparkbar/>` now rerender with the correct size when the container change its width or height
- `<Sparkbar />` Bar radius is now proportional to the bar width
- Added `@juggle/resize-observer` library as a peer and dev dependency

## [0.11.3] - 2021-05-10

### Changed

- `<MultiSeriesBarChart/>`, `<BarChart />` and `<LineChart/>` yScale will allow data to overflow the highest tick if the highest value is less than half way to the next tick

## [0.11.2] - 2021-05-07

### Fixed

- yAxis line height is no longer inherited
- xAxis bar chart ticks are not shown when minimal labels are selected, or when they are disabled

## [0.11.1] - 2021-05-07

### Added

- `horizontalOverflow` and `horizontalMargin` to `gridOptions` for `<MultiSeriesBarChart/>`, `<BarChart />` and `<LineChart/>`, as well as `backgroundColor` to the `yAxisOptions`

### Fixed

- Bar chart xAxis label overlap when useMinimalLabels is set

### Changed

- Increased margin between x axis and labels from 8px to 24px

## [0.11.0] - 2021-05-06

### Added

- `outerMargin` prop to `<BarChart/>` and `<MultiSeriesBarChart/>`

### Changed

- renamed `barOptions.margin` to `innerMargin` for `<BarChart/>` and `<MultiSeriesBarChart/>`

### Fixed

- Line chart legend no longer shows square preview

## [0.10.2] - 2021-05-05

### Fixed

- Reverts dev dependency changes that broke deploy

## [0.10.1] - 2021-05-05

### Added

- Export `Color` and `GradientStop` types

### Fixed

- `<BarChart />` data type

## [0.10.0] - 2021-05-04

### Added

- `margin` prop to `barOptions` for `<MultiSeriesBarChart/>`
- Allow individual bar colors for `<BarChart />`
- Add gradient color options for `<MultiSeriesBarChart />`

### Removed

- `highLightColor` from `<MultiSeriesBarChart />` `barOptions` prop

## [0.9.4] - 2021-05-04

### Added

- Dark mode colors to Color type

## [0.9.3] - 2021-05-03

### Fixed

- Performance regression in `<LineChart/>`

### Added

- Check window is defined before accessing window methods
- Added new dark mode colors

## [0.9.2] - 2021-04-29

### Added

- Allow gradients to be use for `<LineChart/>` and `<BarChart />`

### Changed

- `showArea` for `<LineChart/>` series prop replaced by `areaColor`

## [0.9.1] - 2021-04-27

### Added

- `<Sparkbar />` component
- Annotations prop to `<BarChart />`

## [0.9.0] - 2021-04-26

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

## [0.8.1] - 2021-04-20

### Added

- `dotted` lineStyle to `LineChart`
- `emptyStateText` and empty state handling to `<BarChart />`
- `isAnimated` prop to `LineChart`, `BarChart` and `MultiSeriesBarChart`

## [0.8.0] - 2021-04-14

### Added

- `background`, `border`, `border-radius`, and `padding` to each `TooltipContent` styles
- Added `emptyStateText` and empty state handling to `<LineChart />`

### Removed

- `background`, `border`, `border-radius`, and `padding` from `TooltipContainer` styles

## [0.7.3] - 2021-04-07

### Added

- Storybook

## [0.7.2] - 2021-03-25

### Fixed

- Remove unneccessary focus outline on elements

## [0.7.1] - 2021-03-24

### Added

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

- Removed the accessibilityLabel from [`<StackedAreaChart/>`](https://github.com/Shopify/polaris-viz/blob/main/src/)

### Added

- `skipLinkText` prop to [`<StackedAreaChart/>`](https://github.com/Shopify/polaris-viz/blob/main/src/)

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

## [0.0.18] - 2020-10-09

### Fixed

- Made axes and label colors consistent

## [0.0.17] - 2020-10-02

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
