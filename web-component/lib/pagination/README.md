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
| --jb-pagination-index-width | Width of each page index button. |
