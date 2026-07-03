export type JBPaginationInfoElements = {
  pageSizeSelect: HTMLSelectElement,
  pageSizeSection: HTMLElement,
  startItemIndex: HTMLSpanElement,
  endItemIndex: HTMLSpanElement,
  fromLabel: HTMLSpanElement,
  totalItemsCount: HTMLSpanElement,
}

export type JBPaginationInfoPageSizeChangeEventDetail = {
  pageSize: number
}
