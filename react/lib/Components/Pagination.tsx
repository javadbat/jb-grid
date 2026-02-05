import React, { type DetailedHTMLProps, type FormEventHandler, type HTMLAttributes } from 'react';
import  'jb-grid'
import type {JBPaginationWebComponent} from 'jb-grid'
export type Props = {
  pageIndex?:number,
  max?:number,
  min?:number,
  onChange?:FormEventHandler<JBPaginationWebComponent>
  showPersianNumber?:boolean,
}
export function JBPagination(props:Props){
  const {pageIndex, max, min, onChange,showPersianNumber} = props;
  return(<jb-pagination pageIndex={pageIndex} max={max} min={min} onChange={onChange} showPersianNumber={showPersianNumber}></jb-pagination>)
}

type JBPaginationAttributes = DetailedHTMLProps<HTMLAttributes<JBPaginationWebComponent>, JBPaginationWebComponent> & {
  pageIndex?:number
  max?:number
  min?:number,
  showPersianNumber?:boolean,
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-pagination': JBPaginationAttributes;
    }
  }
}