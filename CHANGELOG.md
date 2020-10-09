# Changelog

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
