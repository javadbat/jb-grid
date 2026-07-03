import React from 'react';
import 'jb-grid';
import type { JBTableHeaderAttributes } from './module-declaration.js';

type TableHeaderTemplate = Array<{name: string, size?: string | number}>
type JBTableHeaderWebComponent = HTMLElement & {
  headerTemplate: TableHeaderTemplate
}

export type TableHeaderProps = Omit<JBTableHeaderAttributes, "headerTemplate" | "ref"> & {
  headerTemplate?: TableHeaderTemplate
}

export const JBTableHeader = React.forwardRef<JBTableHeaderWebComponent | null, TableHeaderProps>((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <jb-table-header ref={ref} {...otherProps}>{children}</jb-table-header>
  );
});

JBTableHeader.displayName = "JBTableHeader";
