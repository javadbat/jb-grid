import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { JBPaginationWebComponent } from "jb-grid";
import type { JBPaginationDirectAttributeProps } from "./types";
import type {JBCellWebComponent, JBRowWebComponent, JBExpandToggleWebComponent} from 'jb-grid'
export type JBGridLayoutWebComponent = HTMLElement
type JBGridLoadingWebComponent = HTMLElement
type JBGridErrorWebComponent = HTMLElement
export type JBViewportWebComponent = HTMLElement & {
  fullscreen: boolean
}
type TableHeaderTemplate = Array<{name: string, size?: string | number}>
type JBTableHeaderWebComponent = HTMLElement & {
  headerTemplate: TableHeaderTemplate
}
type JBColumnHeaderSort = "asc" | "desc";
type JBColumnHeaderWebComponent = HTMLElement & {
  name: string,
  sortable: boolean,
  sort: JBColumnHeaderSort | null
}
type JBPaginationInfoWebComponent = HTMLElement & {
  pageSize: number,
  pageSizes: number[],
  startItemIndex: number,
  endItemIndex: number,
  totalItemsCount: number,
  pageItemCountTitle: string,
  fromLabel: string,
  currentAvailableItemTitle: string,
  showPersianNumber: boolean | undefined
}
export type JBRefreshIconWebComponent = HTMLElement & {
  play: () => void,
  pause: () => void,
  stop: () => void
}
type JBFullscreenIconState = "enter" | "exit";
type JBFullscreenIconWebComponent = HTMLElement & {
  state: JBFullscreenIconState
}
type JBPaginationAttributes = DetailedHTMLProps<HTMLAttributes<JBPaginationWebComponent>, JBPaginationWebComponent> & JBPaginationDirectAttributeProps
export type JBPaginationInfoAttributes = DetailedHTMLProps<HTMLAttributes<JBPaginationInfoWebComponent>, JBPaginationInfoWebComponent>
export type JBRefreshIconAttributes = DetailedHTMLProps<HTMLAttributes<JBRefreshIconWebComponent>, JBRefreshIconWebComponent>
export type JBFullscreenIconAttributes = DetailedHTMLProps<HTMLAttributes<JBFullscreenIconWebComponent>, JBFullscreenIconWebComponent> & {
  state?: JBFullscreenIconState
}
export type JBRowAttributes = DetailedHTMLProps<HTMLAttributes<JBRowWebComponent>, JBRowWebComponent>
export type JBTableHeaderAttributes = DetailedHTMLProps<HTMLAttributes<JBTableHeaderWebComponent>, JBTableHeaderWebComponent> & {
  headerTemplate?: TableHeaderTemplate
}
export type JBColumnHeaderAttributes = DetailedHTMLProps<HTMLAttributes<JBColumnHeaderWebComponent>, JBColumnHeaderWebComponent> & {
  name: string,
  sortable?: boolean,
  sort?: JBColumnHeaderSort
}
export type JBCellAttributes = DetailedHTMLProps<HTMLAttributes<JBCellWebComponent>, JBCellWebComponent> & {
  ellipsis?: boolean | number
}
export type JBExpandToggleAttributes = DetailedHTMLProps<HTMLAttributes<JBExpandToggleWebComponent>, JBExpandToggleWebComponent>
export type JBGridLayoutAttributes = DetailedHTMLProps<HTMLAttributes<JBGridLayoutWebComponent>, JBGridLayoutWebComponent>
export type JBGridLoadingAttributes = DetailedHTMLProps<HTMLAttributes<JBGridLoadingWebComponent>, JBGridLoadingWebComponent>
export type JBGridErrorAttributes = DetailedHTMLProps<HTMLAttributes<JBGridErrorWebComponent>, JBGridErrorWebComponent> & {
  message?: string,
  "refresh-button-title"?: string
}
export type JBViewportAttributes = DetailedHTMLProps<HTMLAttributes<JBViewportWebComponent>, JBViewportWebComponent> & {
  fullscreen?: boolean
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-pagination': JBPaginationAttributes;
      'jb-pagination-info': JBPaginationInfoAttributes;
      'jb-refresh-icon': JBRefreshIconAttributes;
      'jb-fullscreen-icon': JBFullscreenIconAttributes;
      'jb-row': JBRowAttributes;
      'jb-table-header': JBTableHeaderAttributes;
      'jb-col-header': JBColumnHeaderAttributes;
      'jb-cell': JBCellAttributes;
      'jb-expand-toggle': JBExpandToggleAttributes;
      'jb-grid-layout': JBGridLayoutAttributes;
      'jb-grid-loading': JBGridLoadingAttributes;
      'jb-grid-error': JBGridErrorAttributes;
      'jb-viewport': JBViewportAttributes;
    }
  }
}
