# jb-pagination

`jb-pagination` is the pagination web component used by `jb-grid` web-component helpers.

## Usage
```html
<jb-pagination></jb-pagination>
```

```js
import 'jb-grid/web-component';

const pagination = document.querySelector('jb-pagination');
pagination.pageIndex = 5;
pagination.min = 1;
pagination.max = 10;
```

## CSS Variables
| CSS variable name | description |
| --- | --- |
| --jb-pagination-arrow-button-fill-color | Fill color of pagination arrow buttons. |
| --jb-pagination-arrow-button-fill-color-disabled | Fill color of disabled pagination arrow buttons. |
| --jb-pagination-index-width | Width of each page index button. |
| --jb-pagination-page-index-color | Color of page index buttons. |
| --jb-pagination-page-index-color-current | Color of the current page index button. |
