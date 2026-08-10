import type { JBButtonWebComponent } from "jb-button";

export type JBPaginationElements = {
  nav:{
    wrapper:HTMLDivElement,
    first:JBButtonWebComponent,
    prev:JBButtonWebComponent,
    next:JBButtonWebComponent,
    last:JBButtonWebComponent,
  },
   index:{
    wrapper:HTMLDivElement,
    list:PageIndexDom[],
   }
}

export type PageIndexDom = HTMLButtonElement & {pageIndex:number,isEmpty:boolean};
