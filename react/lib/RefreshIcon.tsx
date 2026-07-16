import React from 'react';
import 'jb-icon/refresh';
import type { JBRefreshIconAttributes, JBRefreshIconWebComponent } from './module-declaration.js';

export type RefreshIconProps = Omit<JBRefreshIconAttributes, "ref">

export const JBRefreshIcon = React.forwardRef<JBRefreshIconWebComponent | null, RefreshIconProps>((props, ref) => {
  return <jb-icon-refresh ref={ref} {...props}></jb-icon-refresh>;
});

JBRefreshIcon.displayName = "JBRefreshIcon";
