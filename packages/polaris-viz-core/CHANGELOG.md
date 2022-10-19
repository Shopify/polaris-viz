# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

- `LineSeries` `strokeDasharray` value for `solid` lines is now `none` vs `unset`, avoiding a failure on Android

## [7.5.1] - 2022-10-18

- No updates. Transitive dependency bump.

## [7.5.0] - 2022-10-18

### Changed

- Bumped the following packages: `d3-array@^3.2.0`, `d3-color@^3.1.0`, `d3-path@^3.0.1`, `d3-scale@^4.0.2` & `d3-shape@^3.1.0`.

## [7.4.5] - 2022-10-12

- No updates. Transitive dependency bump.

## [7.4.4] - 2022-10-06

- No updates. Transitive dependency bump.

## [7.4.3] - 2022-10-06

- No updates. Transitive dependency bump.

## [7.4.2] - 2022-10-04

- No updates. Transitive dependency bump.

## [7.4.1] - 2022-10-04

- No updates. Transitive dependency bump.

## [7.4.0] - 2022-10-03

- No updates. Transitive dependency bump.

## [7.3.2] - 2022-09-26

- No updates. Transitive dependency bump.

## [7.3.1] - 2022-09-19

- No updates. Transitive dependency bump.

## [7.3.0] - 2022-08-31

- No updates. Transitive dependency bump.

## [7.2.0] - 2022-08-31

- No updates. Transitive dependency bump.

## [7.1.0] - 2022-08-31

- No updates. Transitive dependency bump.

## [7.0.0] - 2022-08-12

- No updates. Transitive dependency bump.

## [6.6.1] - 2022-08-10

### Removed

- `SparkBarSeries` now does not support displaying dataSeries with `isComparison: true` as dashed lines. Use the new `TargetLine` prop instead

### Changed

- Removed `dataOffsetLeft` and `dataOffsetRight` props from `SparkBarSeries` and unified them under the `TargetLine` prop.

## [6.6.0] - 2022-08-05

- No updates. Transitive dependency bump.

## [6.5.0] - 2022-08-03

- No updates. Transitive dependency bump.

## [6.4.0] - 2022-08-03

- No updates. Transitive dependency bump.

## [6.3.0] - 2022-07-29

- No updates. Transitive dependency bump.

## [6.2.0] - 2022-07-27

- No updates. Transitive dependency bump.

## [6.1.0] - 2022-07-21

- No updates. Transitive dependency bump.

## [6.0.3] - 2022-07-20

- No updates. Transitive dependency bump.

## [6.0.2] - 2022-07-20

- No updates. Transitive dependency bump.

## [6.0.1] - 2022-07-18

- No updates. Transitive dependency bump.

## [6.0.0] - 2022-07-18

### Added

- Introduces `useAriaLabel` hook.

## [5.0.0] - 2022-07-07

- No updates. Transitive dependency bump.

## [4.1.1] - 2022-07-06

- No updates. Transitive dependency bump.

## [4.1.0] - 2022-07-06

- No updates. Transitive dependency bump.

## [4.0.0] - 2022-06-23

- No updates. Transitive dependency bump.

## [3.0.0] - 2022-06-20

### Added

- Introduces `useUniqueId` and `useComponentDidMount` hooks

## [2.1.0] - 2022-06-17

### Added

- introduces a new `createCSSConicGradient` utility function

### Fixed

- LineSeries line being cropped on the top
- LineSeries loading animation origin not using correct position on the bottom of the chart

## [2.0.0] - 2022-06-09

- No updates. Transitive dependency bump.

## [1.11.1] - 2022-06-02

- No updates. Transitive dependency bump.

## [1.11.0] - 2022-06-02

- No updates. Transitive dependency bump.

## [1.10.3] - 2022-05-27

- No updates. Transitive dependency bump.

## [1.10.2] - 2022-05-26

- No updates. Transitive dependency bump.

## [1.10.1] - 2022-05-26

### Changed

- Updated react-spring to v9.4.5

## [1.10.0] - 2022-05-25

### Added

- `ChartProps` and `WithRequired` types
- `DEFAULT_CHART_PROPS` constant

## [1.9.3] - 2022-05-25

- No updates. Transitive dependency bump.

## [1.9.2] - 2022-05-24

- No updates. Transitive dependency bump.

## [1.9.0] - 2022-05-24

- No updates. Transitive dependency bump.

## [1.8.0] - 2022-05-19

- No updates. Transitive dependency bump.

## [1.7.1] - 2022-05-18

- No updates. Transitive dependency bump.

## [1.7.0] - 2022-05-18

- No updates. Transitive dependency bump.

## [1.6.0] - 2022-05-17

- No updates. Transitive dependency bump.

## [1.5.0] - 2022-05-04

### Added

- Added `legend.backgroundColor` to the Theme definition
- Added `type` to `LineSeriesProps`.
- Moved `getColorVisionStylesForActiveIndex()`, `getColorVisionEventAttrs()`, `getAverageColor()`, `changeGradientOpacity()` and `changeColorOpacity()` from `polaris-viz` to `polaris-viz-core`.
- Fixed missing `themes` prop in ThemeDefinitions storybook documentation

## [1.4.0] - 2022-04-20

- No updates. Transitive dependency bump.

## [1.3.1] - 2022-04-18

- No updates. Transitive dependency bump.

## [1.3.0] - 2022-04-18

- No updates. Transitive dependency bump.

## [1.2.1] - 2022-04-13

- No updates. Transitive dependency bump.

## [1.2.0] - 2022-04-13

### Added

- paddingStringToObject utility

## [1.1.0] - 2022-03-28

- No updates. Transitive dependency bump.

## [1.0.5] - 2022-03-23

### Changed

- Downgraded `@react-spring/animated` and `@react-spring/core` dependency to version `9.2.6`

## [1.0.4] - 2022-03-14

- No updates. Transitive dependency bump.

## [1.0.3] - 2022-03-14

### Added

- `RoundedBorder` and `Direction` to types

## [1.0.2] - 2022-03-14

- No updates. Transitive dependency bump.

## [1.0.1] - 2022-03-11

- No updates. Transitive dependency bump.

## [1.0.0] - 2022-03-11

### Added

- Initial release
