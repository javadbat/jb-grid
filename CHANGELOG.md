# Changelog

## [0.7.3] - 2026-08-28

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.35.0`.
- Updated component color defaults to use the shared semantic content and surface tokens.

### Fixed

- preserve scroll space for content and header

## [0.7.2] - 2026-07-31

### Fixed

- fix toggle button spin problem base on new icon.

## [0.7.1] - 2026-07-31

### Fixed

- fix icons types reference

## [0.7.0] - 2026-07-31

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
