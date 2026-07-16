import React, { useEffect, useImperativeHandle, useRef } from "react";
import "jb-grid";
import type { JBViewportAttributes, JBViewportWebComponent } from "./module-declaration.js";

export type ViewportProps = Omit<JBViewportAttributes, "fullscreen" | "ref"> & {
  fullscreen?: boolean;
};

export const JBViewport = React.forwardRef<JBViewportWebComponent | null, ViewportProps>((props, ref) => {
  const { children, fullscreen, ...otherProps } = props;
  const element = useRef<JBViewportWebComponent | null>(null);

  useImperativeHandle(ref, () => element.current as JBViewportWebComponent, []);

  useEffect(() => {
    if (element.current) {
      element.current.fullscreen = fullscreen === true;
    }
  }, [fullscreen]);

  return (
    <jb-viewport ref={element} {...otherProps}>
      {children}
    </jb-viewport>
  );
});

JBViewport.displayName = "JBViewport";
