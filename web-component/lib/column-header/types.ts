import type { JBIconArrowTailedWebComponent } from "jb-icons/arrow-tailed";

export type JBColumnHeaderSort = "asc" | "desc";

export type JBColumnHeaderElements = {
  wrapper: HTMLButtonElement,
  sortIcon: JBIconArrowTailedWebComponent,
}

export type JBColumnHeaderSortEventDetail = {
  name: string,
  sort: JBColumnHeaderSort | null,
}
