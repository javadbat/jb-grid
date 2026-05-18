import type { JBPaginationWebComponent } from "jb-grid"
import type { FormEventHandler } from "react"

export type JBPaginationDirectAttributeProps = {
  pageIndex?:number,
  max?:number,
  min?:number,
  onChange?:FormEventHandler<JBPaginationWebComponent>
  showPersianNumber?:boolean,
}