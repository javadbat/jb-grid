# Changelog

## Unreleased

### Changed

- Pagination indexes and row expand toggles now use native buttons with keyboard focus, disabled states, and current-page tab-stop management.
- Renamed `--jb-grid-page-active-color` to `--jb-grid-page-color-active`.
- Moved React grid CSS variable defaults into `react/lib/variables.css`.
- Added web-component row and pagination CSS variable defaults in `variables.css` files.

### Fixed

- Cells now clip horizontal overflow so long content stays within its grid column.
