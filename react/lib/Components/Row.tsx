import React, { type ForwardedRef } from 'react';
import type {JBRowAttributes} from './module-declaration.js';
import type { JBCellWebComponent, RowTemplate } from 'jb-grid';

type RowProps = JBRowAttributes & {
  ref?:ForwardedRef<JBCellWebComponent | null>,
  rowTemplate:RowTemplate,
  isOpen?:boolean
}
export function JBRow(props:RowProps) {
  const { children, ...otherProps} = props;
  return (
    <jb-row {...otherProps}>{children}</jb-row>
  );
}
