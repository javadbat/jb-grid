import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';
import  'jb-grid'
import type {JBPaginationWebComponent} from 'jb-grid'
export type Props = {
  index?:number,
  max?:number,
  min?:number
}
export function Pagination(props:Props){
  const {index, max, min} = props;
  return(<jb-pagination pageIndex={index} max={max} min={min}></jb-pagination>)
}

type JBPaginationAttributes = DetailedHTMLProps<HTMLAttributes<JBPaginationWebComponent>, JBPaginationWebComponent> & {
  pageIndex?:number
  max?:number
  min?:number
}
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-pagination': JBPaginationAttributes;
    }
  }
}