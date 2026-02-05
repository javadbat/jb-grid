# jb-grid

> currently this component only available in react in full mode and web-component is only support parts of the data grid like pagination.

## using with JS frameworks

to use this component in **react** see [`jb-grid/react`](https://github.com/javadbat/jb-grid/tree/main/react);

## Pagination
for pagination we use `jb-pagination` web-component
```html
<jb-pagination />
```
`jb-pagination` have some config into it here is how to config it:

```javascript
import `jb-pagination`;
//change current page index
document.querySelector(`jb-pagination`).pageIndex = 5;
//max page number default is infinite
document.querySelector(`jb-pagination`).max = 10;
//min page number default is 1
document.querySelector(`jb-pagination`).min = 0;

```
