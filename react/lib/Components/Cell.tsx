import React, { type ForwardedRef } from 'react';
import type {JBCellAttributes} from './module-declaration.js';
import type { JBCellWebComponent } from 'jb-grid';

export type CellProps = JBCellAttributes & {
  ref?:ForwardedRef<JBCellWebComponent | null>,
  name:string,
  label?:string,
}
export function JBCell(props:CellProps) {
  const { children, ...otherProps} = props;
  return (
    <jb-cell slot="cell" {...otherProps}>{children}</jb-cell>
  );
}
