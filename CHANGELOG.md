# Changelog

## [0.6.0] - 2026-07-31

### Changed

- Moved internal icons to `jb-icons`.
- Updated the column-header sort indicator to use the long `jb-icon-arrow-tailed` variant.
- use jb-button instead of normal button
- add `--jb-pagination-sections-gap` css variable.

## [0.6.0] - 2026-07-14

### Added

- add `enableSortingRemoval` to column header to support sort removal in multi sort tables

## [0.5.0] - 2026-07-14

### Changed

- Pagination indexes and row expand toggles now use native buttons with keyboard focus, disabled states, and current-page tab-stop management.
- Renamed `--jb-grid-page-active-color` to `--jb-grid-page-color-active`.
- Moved React grid CSS variable defaults into `react/lib/variables.css`.
- Added web-component row and pagination CSS variable defaults in `variables.css` files.

### Fixed

- Cells now clip horizontal overflow so long content stays within its grid column.
