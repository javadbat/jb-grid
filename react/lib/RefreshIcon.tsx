import React from 'react';
import 'jb-grid';
import type { JBRefreshIconAttributes, JBRefreshIconWebComponent } from './module-declaration.js';

export type RefreshIconProps = Omit<JBRefreshIconAttributes, "ref">

export const JBRefreshIcon = React.forwardRef<JBRefreshIconWebComponent | null, RefreshIconProps>((props, ref) => {
  return <jb-refresh-icon ref={ref} {...props}></jb-refresh-icon>;
});

JBRefreshIcon.displayName = "JBRefreshIcon";
