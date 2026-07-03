import React from 'react';
import 'jb-grid';
import type {JBRowAttributes} from './module-declaration.js';
import type { JBRowWebComponent, RowTemplate } from 'jb-grid';

export type RowProps = Omit<JBRowAttributes, "ref" | "rowTemplate" | "isOpen"> & {
  rowTemplate?:RowTemplate,
  isOpen?:boolean
}
export const JBRow = React.forwardRef<JBRowWebComponent | null, RowProps>((props, ref) => {
  const { children, ...otherProps} = props;
  return (
    <jb-row ref={ref} {...otherProps}>{children}</jb-row>
  );
});

JBRow.displayName = "JBRow";
