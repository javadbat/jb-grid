import React, { type PropsWithChildren }  from 'react';
import type {JBExpandToggleAttributes} from './module-declaration.js';

type ToggleProps = JBExpandToggleAttributes 
export function JBExpandToggle(props:ToggleProps) {
  const { children, ...otherProps} = props;
  return (
    <jb-expand-toggle {...otherProps}>{children}</jb-expand-toggle>
  );
}
