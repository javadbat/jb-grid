import React from 'react';
import 'jb-icons/refresh';
import type { JBIconRefreshAttributes } from 'jb-icons/react';
import type { JBIconRefreshWebComponent } from 'jb-icons/refresh';

export type RefreshIconProps = Omit<JBIconRefreshAttributes, "ref">

export const JBRefreshIcon = React.forwardRef<JBIconRefreshWebComponent | null, RefreshIconProps>((props, ref) => {
  return <jb-icon-refresh ref={ref} {...props}></jb-icon-refresh>;
});

JBRefreshIcon.displayName = "JBRefreshIcon";
