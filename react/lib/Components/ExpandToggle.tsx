import React  from 'react';
import type {JBExpandToggleAttributes} from './module-declaration.js';

export type ToggleProps = JBExpandToggleAttributes 
export function JBExpandToggle(props:ToggleProps) {
  const { children, ...otherProps} = props;
  return (
    <jb-expand-toggle {...otherProps}>{children}</jb-expand-toggle>
  );
}
