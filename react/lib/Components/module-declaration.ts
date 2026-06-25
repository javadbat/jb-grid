import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { JBPaginationWebComponent } from "jb-grid";
import type { JBPaginationDirectAttributeProps } from "./types";
import type {JBCellWebComponent, JBRowWebComponent, JBExpandToggleWebComponent} from 'jb-grid'
type JBPaginationAttributes = DetailedHTMLProps<HTMLAttributes<JBPaginationWebComponent>, JBPaginationWebComponent> & JBPaginationDirectAttributeProps
export type JBRowAttributes = DetailedHTMLProps<HTMLAttributes<JBRowWebComponent>, JBRowWebComponent>
export type JBCellAttributes = DetailedHTMLProps<HTMLAttributes<JBCellWebComponent>, JBCellWebComponent> & {
  ellipsis?: boolean | number
}
export type JBExpandToggleAttributes = DetailedHTMLProps<HTMLAttributes<JBExpandToggleWebComponent>, JBExpandToggleWebComponent>

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-pagination': JBPaginationAttributes;
      'jb-row': JBRowAttributes;
      'jb-cell': JBCellAttributes;
      'jb-expand-toggle': JBExpandToggleAttributes;
    }
  }
}
