import React  from 'react';
import 'jb-grid';
import type {JBExpandToggleAttributes} from './module-declaration.js';
import type { JBExpandToggleWebComponent } from 'jb-grid';

export type ToggleProps = Omit<JBExpandToggleAttributes, "ref">
export const JBExpandToggle = React.forwardRef<JBExpandToggleWebComponent | null, ToggleProps>((props, ref) => {
  const { children, ...otherProps} = props;
  return (
    <jb-expand-toggle ref={ref} {...otherProps}>{children}</jb-expand-toggle>
  );
});

JBExpandToggle.displayName = "JBExpandToggle";
