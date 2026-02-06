import React, { type DetailedHTMLProps, type FormEventHandler, type HTMLAttributes } from 'react';
import  'jb-grid'
import type {JBPaginationWebComponent} from 'jb-grid'
import type { JBElementStandardProps } from 'jb-core/react';
export type Props = JBElementStandardProps & {
  pageIndex?:number,
  max?:number,
  min?:number,
  onChange?:FormEventHandler<JBPaginationWebComponent>
  showPersianNumber?:boolean,
}
export function JBPagination(props:Props){
  const {pageIndex, max, min, onChange,showPersianNumber, ...otherProps } = props;
  return(<jb-pagination pageIndex={pageIndex} max={max} min={min} onChange={onChange} showPersianNumber={showPersianNumber} {...otherProps}></jb-pagination>)
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