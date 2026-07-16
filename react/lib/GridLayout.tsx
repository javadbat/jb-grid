import React from "react";
import "jb-grid";
import type { JBGridLayoutAttributes, JBGridLayoutWebComponent } from "./module-declaration.js";

export type GridLayoutProps = Omit<JBGridLayoutAttributes, "ref">;

export const JBGridLayout = React.forwardRef<JBGridLayoutWebComponent | null, GridLayoutProps>((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <jb-grid-layout ref={ref} {...otherProps}>
      {children}
    </jb-grid-layout>
  );
});

JBGridLayout.displayName = "JBGridLayout";
