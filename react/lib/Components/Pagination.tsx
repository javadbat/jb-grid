import React, { type DetailedHTMLProps, type FormEventHandler, type HTMLAttributes } from 'react';
import  'jb-grid'
import type {JBPaginationWebComponent} from 'jb-grid'
import type { JBElementStandardProps } from 'jb-core/react';
import type { JBPaginationDirectAttributeProps } from './types';
import  './module-declaration.js';

export function JBPagination(props:Props){
  const {pageIndex, max, min, onChange,showPersianNumber, ...otherProps } = props;
  return(<jb-pagination pageIndex={pageIndex} max={max} min={min} onChange={onChange} showPersianNumber={showPersianNumber} {...otherProps}></jb-pagination>)
}


export type Props = JBElementStandardProps<JBPaginationWebComponent, keyof JBPaginationDirectAttributeProps> & JBPaginationDirectAttributeProps