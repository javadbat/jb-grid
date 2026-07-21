export type JBColumnHeaderSort = "asc" | "desc";

export type JBColumnHeaderElements = {
  wrapper: HTMLButtonElement
}

export type JBColumnHeaderSortEventDetail = {
  name: string,
  sort: JBColumnHeaderSort | null,
}
