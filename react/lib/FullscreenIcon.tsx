import React, { useEffect, useImperativeHandle, useRef } from "react";
import "jb-icons/expand";
import type { JBIconExpandWebComponent } from "jb-icons/expand";
type JBFullscreenIconState = "enter" | "exit";
type JBFullscreenIconWebComponent = JBIconExpandWebComponent;


export const JBFullscreenIcon = React.forwardRef<JBFullscreenIconWebComponent | null, {state:JBFullscreenIconState}>((props, ref) => {
  const { state, ...otherProps } = props;
  const element = useRef<JBFullscreenIconWebComponent | null>(null);
  useImperativeHandle(ref, () => element.current as JBFullscreenIconWebComponent, []);

  useEffect(() => {
    if (element.current) {
      element.current.isExpanded = state === "exit";
    }
  }, [state]);

  return <jb-icon-expand ref={element} {...otherProps}></jb-icon-expand>;
});

JBFullscreenIcon.displayName = "JBFullscreenIcon";
