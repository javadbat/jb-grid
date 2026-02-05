export type JBPaginationElements = {
  nav:{
    wrapper:HTMLDivElement,
    first:HTMLButtonElement,
    prev:HTMLButtonElement,
    next:HTMLButtonElement,
    last:HTMLButtonElement,
  },
   index:{
    wrapper:HTMLDivElement,
    list:PageIndexDom[],
   }
}

export type PageIndexDom = HTMLDivElement & {pageIndex:number,isEmpty:boolean};