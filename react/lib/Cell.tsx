import React from 'react';
import 'jb-grid';
import type {JBCellAttributes} from './module-declaration.js';
import type { JBCellWebComponent } from 'jb-grid';

export type CellProps = Omit<JBCellAttributes, "ref" | "name"> & {
  name:string,
  label?:string,
}
export const JBCell = React.forwardRef<JBCellWebComponent | null, CellProps>((props, ref) => {
  const { children, ...otherProps} = props;
  return (
    <jb-cell ref={ref} slot="cell" {...otherProps}>{children}</jb-cell>
  );
});

JBCell.displayName = "JBCell";
